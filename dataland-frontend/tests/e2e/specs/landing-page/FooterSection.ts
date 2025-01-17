import { describeIf } from "@e2e/support/TestUtility";
import { getStoredCompaniesForDataType } from "@e2e/utils/GeneralApiUtils";
import { getKeycloakToken } from "@e2e/utils/Auth";
import { reader_name, reader_pw } from "@e2e/utils/Cypress";
import { checkFooter } from "@sharedUtils/ElementChecks";
import { ARRAY_OF_FRAMEWORKS_WITH_VIEW_PAGE } from "@/utils/Constants";

describeIf(
  "As a user, I expect the footer section to be present and contain relevant legal links",
  {
    executionEnvironments: ["developmentLocal", "ci", "developmentCd"],
  },
  () => {
    describe("Checks that the footer section is present on many pages", () => {
      beforeEach(() => {
        cy.ensureLoggedIn();
      });

      const pagesToCheck = ["/companies", `/preview`];

      pagesToCheck.forEach((page) => {
        it(`Checks that the footer is present on ${page}`, () => {
          cy.visitAndCheckAppMount(page);
          checkFooter();
        });
      });

      ARRAY_OF_FRAMEWORKS_WITH_VIEW_PAGE.forEach((framework) => {
        it(`Checks that the footer is present on ${framework}`, () => {
          getKeycloakToken(reader_name, reader_pw).then((token) => {
            cy.browserThen(getStoredCompaniesForDataType(token, framework)).then((storedCompanies) => {
              const companyId = storedCompanies[0].companyId;
              cy.visitAndCheckAppMount(`/companies/${companyId}/frameworks/${framework}`);
              checkFooter();
            });
          });
        });
      });
    });
  },
);
