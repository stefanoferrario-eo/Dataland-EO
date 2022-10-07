import { getCompanyAndDataIds } from "@e2e/utils/ApiUtils";
import { DataTypeEnum } from "@clients/backend";
import { getKeycloakToken } from "@e2e/utils/Auth";

describe("As a user, I expect the footer section to be present and contain relevant legal links", () => {
  it("Checks that the footer section works properly", () => {
    cy.visitAndCheckAppMount("/");
    cy.get('img[alt="Dataland logo"]').should("be.visible").should("have.attr", "src").should("include", "vision");
    cy.get("body").should("contain.text", "Legal");
    cy.get("body").should("contain.text", "Copyright © 2022 Dataland");
    cy.get('a span[title="imprint"]')
      .should("contain.text", "Imprint")
      .click({ force: true })
      .url()
      .should("include", "/imprint");
    cy.get("h2").contains("Imprint");
    cy.get("[title=back_button").click({ force: true });
    cy.get('a p[title="data privacy"]')
      .should("contain.text", "Data Privacy")
      .click({ force: true })
      .url()
      .should("include", "/dataprivacy");
    cy.get("h2").contains("Data Privacy");
  });

  describe("Checks that the footer section is present on many pages", () => {
    beforeEach(() => {
      cy.ensureLoggedIn();
    });

    const pagesToCheck = [
      "/companies",
      "/companies/upload",
      "/companies-only-search",
      "/samples/eutaxonomy-non-financials",
    ];

    function assertFooterPresence() {
      cy.get('a p[title="data privacy"]').should("contain.text", "Data Privacy");
    }

    pagesToCheck.forEach((page) => {
      it(`Checks that the footer is present on ${page}`, () => {
        cy.visitAndCheckAppMount(page);
        assertFooterPresence();
      });
    });

    const frameworksToCheck = Object.values(DataTypeEnum);
    frameworksToCheck.forEach((framework) => {
      it(`Checks that the footer is present on ${framework}`, () => {
        getKeycloakToken("data_reader", Cypress.env("KEYCLOAK_READER_PASSWORD")).then((token) => {
          cy.browserThen(getCompanyAndDataIds(token, DataTypeEnum.EutaxonomyNonFinancials)).then(
            (datasetNonFinancial) => {
              const companyId = datasetNonFinancial[0].companyId;
              cy.visitAndCheckAppMount(`/companies/${companyId}/frameworks/${framework}`);
              assertFooterPresence();
            }
          );
        });
      });
    });
  });
});
