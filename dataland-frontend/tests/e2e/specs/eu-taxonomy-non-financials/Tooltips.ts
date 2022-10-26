import { getCompanyAndDataIds } from "@e2e/utils/ApiUtils";
import { getKeycloakToken } from "@e2e/utils/Auth";
import { DataTypeEnum, EuTaxonomyDataForNonFinancials } from "@clients/backend";
import { reader_name, reader_pw } from "@e2e/utils/Cypress";
import { FixtureData } from "@e2e/fixtures/FixtureUtils";

let companiesWithEuTaxonomyDataForNonFinancials: Array<FixtureData<EuTaxonomyDataForNonFinancials>>;

before(function () {
  cy.fixture("CompanyInformationWithEuTaxonomyDataForNonFinancials").then(function (jsonContent) {
    companiesWithEuTaxonomyDataForNonFinancials = jsonContent as Array<FixtureData<EuTaxonomyDataForNonFinancials>>;
  });
});

function getCompanyWithReportingObligationAndAssurance(): FixtureData<EuTaxonomyDataForNonFinancials> {
  return companiesWithEuTaxonomyDataForNonFinancials.filter((it) => {
    return it.t.reportingObligation !== undefined && it.t.assurance !== undefined;
  })[0];
}

describe("As a user, I expect informative tooltips to be shown on the EuTaxonomy result page", () => {
  it("tooltips are present and contain text as expected", function () {
    const NFRDText = "Non financial disclosure directive";
    const AssuranceText = "Level of Assurance specifies the confidence level";
    cy.intercept("**/api/companies/*").as("retrieveCompany");
    cy.ensureLoggedIn();
    getKeycloakToken(reader_name, reader_pw).then((token) => {
      cy.browserThen(getCompanyAndDataIds(token, DataTypeEnum.EutaxonomyNonFinancials)).then((datasetNonFinancial) => {
        const testCompany = getCompanyWithReportingObligationAndAssurance();
        const companyId = datasetNonFinancial.filter((it) => {
          return it.companyInformation.companyName === testCompany.companyInformation.companyName;
        })[0].companyId;
        cy.visitAndCheckAppMount(`/companies/${companyId}/frameworks/eutaxonomy-non-financials`);
        cy.wait("@retrieveCompany", { timeout: 5 * 1000 }).then(() => {
          cy.get(".p-card-content .text-left strong").contains("NFRD required");
          cy.get('.material-icons[title="NFRD required"]').trigger("mouseenter", "center");
          cy.get(".p-tooltip").should("be.visible").contains(NFRDText);
          cy.get('.material-icons[title="NFRD required"]').trigger("mouseleave");
          cy.get(".p-tooltip").should("not.exist");
          cy.get(".p-card-content .text-left strong").contains("Level of Assurance");
          cy.get('.material-icons[title="Level of Assurance"]').trigger("mouseenter", "center");
          cy.get(".p-tooltip").should("be.visible").contains(AssuranceText);
        });
      });
    });
  });
});