/**
 * E2E tests for the Cakes listing page (/cakes)
 *
 * Covers:
 * - Page loads with heading
 * - All cakes rendered in the grid
 * - Category filter buttons present
 * - Filtering by category works correctly
 * - Navigating to a cake detail page
 */
describe("Cakes Listing Page (/cakes)", () => {
  beforeEach(() => {
    cy.visit("/cakes");
  });

  it("shows the page heading 'All Cakes'", () => {
    cy.contains("h1", /all cakes/i).should("be.visible");
  });

  it("shows the subheading text", () => {
    cy.contains(/handcrafted with love/i).should("be.visible");
  });

  it("renders multiple cake cards", () => {
    cy.get("img[alt]").should("have.length.at.least", 5);
  });

  // ── Category filters ─────────────────────────────────────────────────────────

  it("renders the 'All' filter button", () => {
    cy.contains("button", /^all$/i).should("be.visible");
  });

  it("renders category filter buttons", () => {
    cy.contains("button", /birthday cakes/i).should("exist");
    cy.contains("button", /wedding cakes/i).should("exist");
    cy.contains("button", /chocolate cakes/i).should("exist");
    cy.contains("button", /cupcakes/i).should("exist");
  });

  it("filters cakes when a category button is clicked", () => {
    // First get total cake count
    cy.get("img[alt]").its("length").then((total) => {
      cy.contains("button", /birthday cakes/i).click();
      // After filtering, there should still be cakes but potentially fewer
      cy.get("img[alt]").should("have.length.at.least", 1);
      cy.get("img[alt]").should("have.length.at.most", total);
    });
  });

  it("resets to all cakes when 'All' is clicked after filtering", () => {
    cy.contains("button", /birthday cakes/i).click();
    cy.contains("button", /^all$/i).click();
    cy.get("img[alt]").should("have.length.at.least", 5);
  });

  it("shows 'No cakes found' message for an empty filter", () => {
    // Directly visit with a non-existent category
    cy.visit("/cakes?category=NonExistentCategory");
    cy.contains(/no cakes found/i).should("be.visible");
  });

  // ── Category via URL query param ──────────────────────────────────────────────

  it("pre-selects the correct category from the URL query param", () => {
    cy.visit("/cakes?category=Cupcakes");
    // The Cupcakes button should be in active (selected) state
    cy.contains("button", /cupcakes/i).should("have.class", "bg-primary");
    cy.get("img[alt]").should("have.length.at.least", 1);
  });

  // ── Navigation to cake detail ─────────────────────────────────────────────────

  it("navigates to the cake detail page when a cake card is clicked", () => {
    cy.get("a[href^='/cake/']").first().click();
    cy.url().should("match", /\/cake\/\d+/);
  });
});
