import { getStoredCompaniesForDataType } from "@e2e/utils/GeneralApiUtils";
import { getKeycloakToken } from "@e2e/utils/Auth";
import { DataTypeEnum } from "@clients/backend";
import { reader_name, reader_pw } from "@e2e/utils/Cypress";

describe("As a user, I expect the back button to work properly", () => {
  it("company eu taxonomy page should be present and contain back button", function () {
    cy.ensureLoggedIn();
    cy.visitAndCheckAppMount("/companies");
    getKeycloakToken(reader_name, reader_pw).then((token) => {
      cy.browserThen(getStoredCompaniesForDataType(token, DataTypeEnum.EutaxonomyFinancials)).then(
        (storedCompanies) => {
          cy.visitAndCheckAppMount(
            `/companies/${storedCompanies[0].companyId}/frameworks/${DataTypeEnum.EutaxonomyFinancials}`,
          );
          cy.get("[data-test='frameworkDataTableTitle']").should("exist");
          cy.contains("span", "BACK").click();
          cy.url().then((url) => url.endsWith("/companies"));
        },
      );
    });
  });
});