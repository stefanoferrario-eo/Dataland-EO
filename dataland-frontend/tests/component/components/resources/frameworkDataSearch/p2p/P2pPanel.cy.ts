import P2pPanel from "@/components/resources/frameworkDataSearch/p2p/P2pPanel.vue";
import { type FixtureData, getPreparedFixture } from "@sharedUtils/Fixtures";
import { minimalKeycloakMock } from "@ct/testUtils/Keycloak";
import {
  type CompanyAssociatedDataPathwaysToParisData,
  type DataAndMetaInformationPathwaysToParisData,
  type DataMetaInformation,
  DataTypeEnum,
  P2pSector,
  type PathwaysToParisData,
  QaStatus,
} from "@clients/backend";
import { toggleRowGroup } from "@sharedUtils/components/ToggleRowFunction";

describe("Component test for P2pPanel", () => {
  let preparedFixtures: Array<FixtureData<PathwaysToParisData>>;
  const companyId = "mock-company-id";

  before(function () {
    cy.fixture("CompanyInformationWithP2pPreparedFixtures").then(function (jsonContent) {
      preparedFixtures = jsonContent as Array<FixtureData<PathwaysToParisData>>;
    });
  });

  it("Should display the correct categories in the sector field", () => {
    const pseudoP2pData = {
      general: { general: { dataDate: "2023-01-01", sectors: [P2pSector.Ammonia] } },
    } as PathwaysToParisData;

    cy.intercept("/api/data/p2p/mock-data-id", {
      companyId: companyId,
      reportingPeriod: "2023",
      data: pseudoP2pData,
    } as CompanyAssociatedDataPathwaysToParisData);
    cy.mountWithDialog(
      P2pPanel,
      {
        keycloak: minimalKeycloakMock({}),
      },
      {
        companyId: companyId,
        singleDataMetaInfoToDisplay: {
          dataId: "mock-data-id",
          reportingPeriod: "2023",
        } as DataMetaInformation,
      },
    );
    cy.get("span[data-test='2023__general_sectors'] a").should("exist").click();
    cy.get("td:contains('Ammonia')").should("exist");
  });

  it("Check P2p view page for company with one P2p data set", () => {
    const preparedFixture = getPreparedFixture("one-p2p-data-set-with-three-sectors", preparedFixtures);
    const p2pData = preparedFixture.t;

    cy.intercept("/api/data/p2p/mock-data-id", {
      companyId: "mock-company-id",
      reportingPeriod: preparedFixture.reportingPeriod,
      data: p2pData,
    } as CompanyAssociatedDataPathwaysToParisData);
    cy.mountWithPlugins(P2pPanel, {
      keycloak: minimalKeycloakMock({}),
      global: {
        stubs: {
          transition: false,
        },
      },
      data() {
        return {
          companyId: "mock-company-id",
          singleDataMetaInfoToDisplay: {
            dataId: "mock-data-id",
            reportingPeriod: preparedFixture.reportingPeriod,
          } as DataMetaInformation,
        };
      },
    });

    cy.get(`span.p-column-title`).should("contain.text", p2pData.general.general.dataDate.substring(0, 4));
    cy.get("tbody").find(`span:contains(${p2pData.general.general.dataDate})`).should("exist");

    toggleRowGroup("_general");
    cy.get(`span[data-test=General]`).click();
    cy.get("tbody").find(`span:contains(${p2pData.general.general.dataDate})`).should("not.exist");
    cy.get(`span[data-test=General]`).click();

    cy.get("tbody").find(`span:contains(${p2pData.general.general.dataDate})`).should("not.exist");

    toggleRowGroup("_general");
    cy.get("table.p-datatable-table").find(`span:contains(${p2pData.general.general.dataDate})`).should("exist");

    cy.get(`span[data-test=Ammonia]`).click();

    cy.get("span[data-test=ccsTechnologyAdoptionInPercent]").should("not.exist");
    toggleRowGroup("decarbonisation");
    cy.get("span[data-test=ccsTechnologyAdoptionInPercent]").should("exist");

    cy.get(`span[data-test="Livestock farming"]`).click();
    toggleRowGroup("animalFeed");
    cy.get("span[data-test=Report-Download-Policy]").find("i[data-test=download-icon]").should("be.visible");

    cy.get(`span[data-test=Cement]`).click();
    toggleRowGroup("material");
    cy.get("span[data-test=preCalcinedClayUsageInPercent]").should("exist");

    cy.get("em[title='Pre-calcined clay usage']").trigger("mouseenter", "center");
    cy.get(".p-tooltip").should("be.visible").should("contain.text", "Share of pre-calcined");
    cy.get("em[title='Pre-calcined clay usage']").trigger("mouseleave");
  });

  /**
   * This functions imitates an api response of the /data/p2p/companies/mock-company-id endpoint
   * to include 6 active p2p datasets from different years to test the simultaneous display of multiple P2P
   * datasets (constructed datasets range from 2023 to 2028)
   * @param baseDataset the p2p dataset used as a basis for constructing the 6 mocked ones
   * @returns a mocked api response
   */
  function constructCompanyApiResponseForP2pForSixYears(
    baseDataset: PathwaysToParisData,
  ): DataAndMetaInformationPathwaysToParisData[] {
    const p2pDatasets: DataAndMetaInformationPathwaysToParisData[] = [];
    for (let i = 0; i < 6; i++) {
      const reportingYear = 2023 + i;
      const reportingDate = `${reportingYear}-01-01`;
      const p2pData = structuredClone(baseDataset);
      p2pData.general.general.dataDate = reportingDate;
      const metaData: DataMetaInformation = {
        dataId: `dataset-${i}`,
        reportingPeriod: reportingYear.toString(),
        qaStatus: QaStatus.Accepted,
        currentlyActive: true,
        dataType: DataTypeEnum.P2p,
        companyId: "mock-company-id",
        uploadTime: 0,
        uploaderUserId: "mock-uploader-id",
      };

      p2pDatasets.push({
        metaInfo: metaData,
        data: p2pData,
      });
    }
    return p2pDatasets;
  }

  it("Check P2p view page for company with six P2p data sets reported in different years ", () => {
    const preparedFixture = getPreparedFixture("six-p2p-data-sets-in-different-years", preparedFixtures);
    const mockedData = constructCompanyApiResponseForP2pForSixYears(preparedFixture.t);
    cy.intercept("/api/data/p2p/companies/mock-company-id", mockedData);

    cy.mountWithPlugins(P2pPanel, {
      keycloak: minimalKeycloakMock({}),
      data() {
        return {
          companyId: "mock-company-id",
        };
      },
    });
    cy.get("table").find(`tr:contains("Data Date")`).find("span").eq(6).get("span").contains("2023");

    for (let indexOfColumn = 1; indexOfColumn <= 6; indexOfColumn++) {
      cy.get(`span.p-column-title`)
        .eq(indexOfColumn)
        .should("contain.text", (2029 - indexOfColumn).toString());
    }
  });
});
