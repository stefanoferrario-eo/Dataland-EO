import { describeIf } from "@e2e/support/TestUtility";
import {
  checkIfLinkedReportsAreDownloadable,
  fillAndValidateEuTaxonomyForFinancialsUploadForm,
  gotoEditForm,
  uploadCompanyViaApiAndEuTaxonomyDataForFinancialsViaForm,
} from "@e2e/utils/EuTaxonomyFinancialsUpload";
import {
  type EuTaxonomyDataForFinancials,
  type CompanyAssociatedDataEuTaxonomyDataForFinancials,
} from "@clients/backend";
import { type FixtureData, getPreparedFixture } from "@sharedUtils/Fixtures";
import { uploader_name, uploader_pw } from "@e2e/utils/Cypress";
import { uploadDocuments } from "@sharedUtils/components/UploadDocuments";
import { assertDefined } from "@/utils/TypeScriptUtils";
import { TEST_PDF_FILE_NAME } from "@sharedUtils/ConstantsForPdfs";

describeIf(
  "As a user, I want to add and link documents to the EU Taxonomy form",

  {
    executionEnvironments: ["developmentLocal", "ci", "developmentCd"],
  },
  function () {
    beforeEach(() => {
      cy.ensureLoggedIn(uploader_name, uploader_pw);
    });

    let testData: FixtureData<EuTaxonomyDataForFinancials>;

    before(function () {
      cy.fixture("CompanyInformationWithEuTaxonomyDataForFinancialsPreparedFixtures").then(function (jsonContent) {
        const preparedFixtures = jsonContent as Array<FixtureData<EuTaxonomyDataForFinancials>>;
        testData = getPreparedFixture("company-for-all-types", preparedFixtures);
      });
    });

    it("Check if the file upload info remove button works as expected", () => {
      testData.companyInformation.companyName = "financials-upload-form-remove-document-button";
      let areBothDocumentsStillUploaded = true;
      uploadCompanyViaApiAndEuTaxonomyDataForFinancialsViaForm(
        testData.companyInformation,
        testData.t,
        () => undefined,
        fillAndValidateEuTaxonomyForFinancialsUploadForm,
        () => {
          uploadDocuments.selectFile(TEST_PDF_FILE_NAME);
          uploadDocuments.validateReportToUploadHasContainerInTheFileSelector(TEST_PDF_FILE_NAME);
          uploadDocuments.validateReportToUploadHasContainerWithInfoForm(TEST_PDF_FILE_NAME);
          uploadDocuments.removeReportFromSelectionForUpload(TEST_PDF_FILE_NAME);

          uploadDocuments.validateNoReportsAreAlreadyUploadedOrSelectedForUpload();

          uploadDocuments.selectFile(TEST_PDF_FILE_NAME);
          uploadDocuments.validateReportToUploadHasContainerInTheFileSelector(TEST_PDF_FILE_NAME);
          uploadDocuments.validateReportToUploadHasContainerWithInfoForm(TEST_PDF_FILE_NAME);

          uploadDocuments.selectFile(`${TEST_PDF_FILE_NAME}2`);
          uploadDocuments.validateReportToUploadHasContainerInTheFileSelector(`${TEST_PDF_FILE_NAME}2`);
          uploadDocuments.validateReportToUploadHasContainerWithInfoForm(`${TEST_PDF_FILE_NAME}2`);

          uploadDocuments.fillAllFormsOfReportsSelectedForUpload(2);
          cy.get(`[data-test="assetManagementKpis"]`)
            .find(`[data-test="banksAndIssuersInPercent"]`)
            .find('select[name="report"]')
            .select(2);

          cy.get(`[data-test="assetManagementKpis"]`)
            .find(`[data-test="investmentNonNfrdInPercent"]`)
            .find('select[name="report"]')
            .select(3);
        },
        (request) => {
          const data = assertDefined((request.body as CompanyAssociatedDataEuTaxonomyDataForFinancials).data);
          expect(TEST_PDF_FILE_NAME in assertDefined(data.referencedReports)).to.equal(areBothDocumentsStillUploaded);
          expect(`${TEST_PDF_FILE_NAME}2` in assertDefined(data.referencedReports)).to.equal(true);
        },
        (companyId) => {
          checkIfLinkedReportsAreDownloadable(companyId);
          gotoEditForm(companyId, true);

          uploadDocuments.selectMultipleFilesAtOnce([TEST_PDF_FILE_NAME, `${TEST_PDF_FILE_NAME}2`]);
          cy.get(".p-dialog.p-component").should("exist").get('[data-pc-section="closebutton"]').click();
          cy.get(".p-dialog.p-component").should("not.exist");

          uploadDocuments.removeAlreadyUploadedReport(TEST_PDF_FILE_NAME).then(() => {
            areBothDocumentsStillUploaded = false;
          });
          const postRequestAlias = "postData";
          cy.intercept(
            {
              method: "POST",
              url: `**/api/data/**`,
              times: 1,
            },
            (request) => {
              const data = assertDefined((request.body as CompanyAssociatedDataEuTaxonomyDataForFinancials).data);
              expect(TEST_PDF_FILE_NAME in assertDefined(data.referencedReports)).to.equal(
                areBothDocumentsStillUploaded,
              );
              expect(`${TEST_PDF_FILE_NAME}2` in assertDefined(data.referencedReports)).to.equal(true);
            },
          ).as(postRequestAlias);
          cy.get('button[data-test="submitButton"]').click();
          cy.wait(`@${postRequestAlias}`, { timeout: Cypress.env("short_timeout_in_ms") as number }).then(
            (interception) => {
              expect(interception.response?.statusCode).to.eq(200);
            },
          );
          gotoEditForm(companyId, false);
        },
      );
    });
  },
);
