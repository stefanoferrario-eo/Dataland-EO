import ApiKeyCard from "@/components/general/apiKey/ApiKeyCard.vue";

describe("Component test for ApiKeyCard", () => {
  it("Should contain text 'The API Key expired' when Api Key is expired", () => {
    cy.mountWithPlugins(ApiKeyCard, {
      data() {
        return {
          viewDeleteConfirmation: false,
          userRoles: ["ROLE_USER", "ROLE_ADMIN"],
          expiryDateInMilliseconds: 1,
        };
      },
    });
    cy.get("div#existingApiKeyCard").should("exist").should("contain.text", "The API Key expired");
    cy.get("div#existingApiKeyCard span").should("have.class", "text-red-700");
  });
  it("Should contain text 'The API Key has no defined expiry date' when Api Key has no defined expiry date", () => {
    cy.mountWithPlugins(ApiKeyCard, {
      data() {
        return {
          viewDeleteConfirmation: false,
          userRoles: ["ROLE_USER", "ROLE_ADMIN"],
          expiryDateInMilliseconds: null,
        };
      },
    });
    cy.get("div#existingApiKeyCard").should("exist").should("contain.text", "The API Key has no defined expiry date");
  });
});
