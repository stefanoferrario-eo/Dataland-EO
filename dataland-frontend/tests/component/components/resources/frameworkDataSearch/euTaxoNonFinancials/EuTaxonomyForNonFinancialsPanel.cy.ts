import EuTaxonomyForNonFinancialsPanel from "@/components/resources/frameworkDataSearch/euTaxonomy/EuTaxonomyForNonFinancialsPanel.vue";
import { minimalKeycloakMock } from "@ct/testUtils/Keycloak";
import { type DataAndMetaInformationEuTaxonomyDataForNonFinancials, DataTypeEnum } from "@clients/backend";
import { EnvironmentalObjective } from "@/api-models/EnvironmentalObjective";
import { assertDefined } from "@/utils/TypeScriptUtils";

describe("Component test for the NewEUTaxonomy Page", () => {
  let mockedBackendDataForTest: Array<DataAndMetaInformationEuTaxonomyDataForNonFinancials>;

  before(function () {
    cy.fixture("EuTaxonomyForNonFinancialsMocks.json").then(
      (mockedBackendResponse: DataAndMetaInformationEuTaxonomyDataForNonFinancials[]) => {
        mockedBackendDataForTest = mockedBackendResponse;
      },
    );
  });

  it("Check if the panel fetches, converts and displays data correctly", () => {
    const mockCompanyId = "mock-company-Id";
    cy.intercept(
      `/api/data/${DataTypeEnum.EutaxonomyNonFinancials}/companies/${mockCompanyId}`,
      mockedBackendDataForTest,
    );
    cy.mountWithPlugins(EuTaxonomyForNonFinancialsPanel, {
      keycloak: minimalKeycloakMock({}),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      props: {
        companyId: "mock-company-Id",
      },
    }).then(() => {
      const capexOfDatasetAlpha = assertDefined(mockedBackendDataForTest[0].data.capex);
      const capexOfDatasetBeta = assertDefined(mockedBackendDataForTest[1].data.capex);
      const capexOfDatasetGamma = assertDefined(mockedBackendDataForTest[2].data.capex);

      const betaTotalAlignedCapexPercentage = capexOfDatasetBeta.totalAlignedShare?.relativeShareInPercent?.toFixed(2);

      const gammaTotalAlignedCapexAbsoluteShareString =
        Math.round(assertDefined(capexOfDatasetGamma.totalAlignedShare?.absoluteShare?.amount)).toString() +
        ` ${assertDefined(capexOfDatasetGamma.totalAlignedShare?.absoluteShare?.currency)}`;

      const alphaContributionToClimateChangeMitigation = assertDefined(
        capexOfDatasetAlpha.substantialContributionCriteria,
      )
        [EnvironmentalObjective.ClimateMitigation].toFixed(2)
        .toString();

      const gammaContributionToClimateChangeMitigation = assertDefined(
        capexOfDatasetGamma.substantialContributionCriteria,
      )
        [EnvironmentalObjective.ClimateMitigation].toFixed(2)
        .toString();

      cy.get(`[data-test='CapEx']`).click();
      cy.contains("span", "Total Aligned CapEx").click();

      cy.contains("td", "Percentage").siblings("td").find("span").should("contain", betaTotalAlignedCapexPercentage);

      cy.contains("td", "Absolute share")
        .siblings("td")
        .find("span")
        .should("contain", gammaTotalAlignedCapexAbsoluteShareString);

      cy.contains("td", "Substantial Contribution to Climate Change Mitigation")
        .siblings("td")
        .find("span")
        .should("contain", alphaContributionToClimateChangeMitigation)
        .should("contain", gammaContributionToClimateChangeMitigation);
    });
  });
});
