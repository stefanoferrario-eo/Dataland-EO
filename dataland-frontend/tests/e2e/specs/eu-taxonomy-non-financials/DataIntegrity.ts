import { describeIf } from "@e2e/support/TestUtility";
import { admin_name, admin_pw } from "@e2e/utils/Cypress";
import { getKeycloakToken } from "@e2e/utils/Auth";
import { generateDummyCompanyInformation, uploadCompanyViaApi } from "@e2e/utils/CompanyUpload";
import { type FixtureData, getPreparedFixture } from "@sharedUtils/Fixtures";
import { DataTypeEnum, type EuTaxonomyDataForNonFinancials } from "@clients/backend";
import { uploadEuTaxonomyDataForNonFinancialsViaForm } from "@e2e/utils/EuTaxonomyNonFinancialsUpload";
import { uploadFrameworkData } from "@e2e/utils/FrameworkUpload";

describeIf(
  "As a user, I expect Eu Taxonomy Data for non-financials that I upload for a company to be displayed correctly",
  {
    executionEnvironments: ["developmentLocal", "ci", "developmentCd"],
  },
  function (): void {
    beforeEach(() => {
      cy.ensureLoggedIn(admin_name, admin_pw);
    });

    let preparedFixtures: Array<FixtureData<EuTaxonomyDataForNonFinancials>>;

    before(function () {
      cy.fixture("CompanyInformationWithEuTaxonomyDataForNonFinancialsPreparedFixtures").then(function (jsonContent) {
        preparedFixtures = jsonContent as Array<FixtureData<EuTaxonomyDataForNonFinancials>>;
      });
    });

    /**
     * Rounds a number to two decimal places.
     * @param inputNumber The number which should be rounded
     * @returns the rounded number
     */
    function roundNumberToTwoDecimalPlaces(inputNumber: number): number {
      return Math.round(inputNumber * 100) / 100;
    }

    /**
     * This function uploads fixture data of one company and the associated data via API. Afterwards the result is
     * checked using the provided verifier.
     * @param fixtureData the company and its associated data
     * @param euTaxonomyPageVerifier the verify method for the EU Taxonomy Page
     */
    function uploadCompanyAndEuTaxonomyDataForNonFinancialsViaApiAndRunVerifier(
      fixtureData: FixtureData<EuTaxonomyDataForNonFinancials>,
      euTaxonomyPageVerifier: () => void,
    ): void {
      getKeycloakToken(admin_name, admin_pw).then((token: string) => {
        return uploadCompanyViaApi(
          token,
          generateDummyCompanyInformation(fixtureData.companyInformation.companyName),
        ).then((storedCompany) => {
          return uploadFrameworkData(
            DataTypeEnum.EutaxonomyNonFinancials,
            token,
            storedCompany.companyId,
            fixtureData.reportingPeriod,
            fixtureData.t,
          ).then(() => {
            cy.intercept(`**/api/data/${DataTypeEnum.EutaxonomyNonFinancials}/*`).as("retrieveTaxonomyData");
            cy.visitAndCheckAppMount(
              `/companies/${storedCompany.companyId}/frameworks/${DataTypeEnum.EutaxonomyNonFinancials}`,
            );
            cy.wait("@retrieveTaxonomyData", { timeout: Cypress.env("long_timeout_in_ms") as number }).then(() => {
              euTaxonomyPageVerifier();
            });
          });
        });
      });
    }

    it("Create a EU Taxonomy Dataset via Api with total(€) and eligible(%) numbers", () => {
      const preparedFixture = getPreparedFixture("only-eligible-and-total-numbers", preparedFixtures);
      uploadCompanyAndEuTaxonomyDataForNonFinancialsViaApiAndRunVerifier(preparedFixture, () => {
        cy.get("body").should("contain", `With a total of`);
        cy.get("body")
          .should("contain", "Eligible Revenue")
          .should(
            "contain",
            `${roundNumberToTwoDecimalPlaces(100 * preparedFixture.t.revenue!.eligibleData!.valueAsPercentage!)}%`,
          );
        cy.get(".font-medium.text-3xl").should("contain", "€");
      });
    });

    it("Create a EU Taxonomy Dataset via Api with only eligible(%) numbers", () => {
      const preparedFixture = getPreparedFixture("only-eligible-numbers", preparedFixtures);
      uploadCompanyAndEuTaxonomyDataForNonFinancialsViaApiAndRunVerifier(preparedFixture, () => {
        cy.get("body")
          .should("contain", "Eligible OpEx")
          .should(
            "contain",
            `${roundNumberToTwoDecimalPlaces(100 * preparedFixture.t.revenue!.eligibleData!.valueAsPercentage!)}%`,
          );
        cy.get("body").should("contain", "Eligible Revenue").should("not.contain", `With a total of`);
        cy.get(".font-medium.text-3xl").should("not.contain", "€");
      });
    });

    it("Create a EU Taxonomy Dataset via Api without referenced reports and ensure that the reports banner is not displayed", () => {
      const preparedFixture = getPreparedFixture("company_without_reports", preparedFixtures);
      uploadCompanyAndEuTaxonomyDataForNonFinancialsViaApiAndRunVerifier(preparedFixture, () => {
        cy.get("div[data-test='reportsBanner']").should("not.exist");
      });
    });

    it(
      "Upload EU Taxonomy Dataset via form with no values for revenue and assure that it can be viewed on the framework " +
        "data view page with an appropriate message shown for the missing revenue data",
      () => {
        const companyName = "Missing field company";
        const missingDataMessage = "No data has been reported";
        getKeycloakToken(admin_name, admin_pw).then((token) => {
          return uploadCompanyViaApi(token, generateDummyCompanyInformation(companyName)).then((storedCompany) => {
            uploadEuTaxonomyDataForNonFinancialsViaForm(storedCompany.companyId, true);
            cy.intercept(`/api/data/${DataTypeEnum.EutaxonomyNonFinancials}/*`).as("retrieveTaxonomyData");
            cy.visitAndCheckAppMount(
              `/companies/${storedCompany.companyId}/frameworks/${DataTypeEnum.EutaxonomyNonFinancials}`,
            );
            cy.wait("@retrieveTaxonomyData", { timeout: Cypress.env("long_timeout_in_ms") as number }).then(() => {
              cy.get("h1[class='mb-0']").contains(companyName);
              cy.get("body").should("contain", "Eligible Revenue").should("contain", missingDataMessage);
            });
          });
        });
      },
    );
  },
);
