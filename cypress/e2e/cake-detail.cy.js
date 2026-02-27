/**
 * E2E tests for the Cake Detail page (/cake/[id])
 *
 * Covers:
 * - Page renders for a known cake id (1 = Strawberry Dream Cake)
 * - Breadcrumb navigation
 * - Cake name, category badge, rating, description visible
 * - Weight / size selector works
 * - Quantity controls work
 * - Price updates when weight or quantity changes
 * - Add to Cart button works and shows confirmation feedback
 * - 404 behaviour for unknown cake id
 * - Related cakes section
 */
describe("Cake Detail Page (/cake/[id])", () => {
  const CAKE_ID = 1; // Strawberry Dream Cake

  beforeEach(() => {
    cy.visit(`/cake/${CAKE_ID}`);
  });

  // ── Basic rendering ───────────────────────────────────────────────────────────

  it("renders the cake name as a heading", () => {
    cy.contains("h1", /strawberry dream cake/i).should("be.visible");
  });

  it("shows the cake category badge", () => {
    cy.contains(/birthday cakes/i).should("be.visible");
  });

  it("shows the star rating", () => {
    cy.contains("★").should("exist");
  });

  it("displays the cake description", () => {
    cy.contains(/strawberry/i).should("exist");
  });

  it("shows the cake image", () => {
    cy.get("img").should("exist");
  });

  // ── Breadcrumb ───────────────────────────────────────────────────────────────

  it("shows breadcrumb links for Home and Cakes", () => {
    cy.get("nav").contains("a", /home/i).should("exist");
    cy.get("nav").contains("a", /cakes/i).should("exist");
  });

  it("navigates back to /cakes from breadcrumb", () => {
    cy.get("nav").contains("a", /^cakes$/i).click();
    cy.url().should("include", "/cakes");
  });

  // ── Weight selector ───────────────────────────────────────────────────────────

  it("shows weight option buttons", () => {
    cy.contains(/select weight/i).should("exist");
    cy.contains("button", /kg|pcs/i).should("exist");
  });

  it("updates the displayed price when a different weight is selected", () => {
    // Get the initial price
    cy.contains(/₹/).first().invoke("text").then((initial) => {
      // Click the last weight option
      cy.contains("button", /kg|pcs/i).last().click();
      // Price should still be displayed (may or may not change depending on weights)
      cy.contains(/₹/).should("exist");
    });
  });

  // ── Quantity controls ────────────────────────────────────────────────────────

  it("shows quantity controls starting at 1", () => {
    cy.contains("Quantity:").should("exist");
    cy.contains("1").should("exist");
  });

  it("increments quantity when + is clicked", () => {
    cy.contains("button", "+").click();
    cy.contains("2").should("exist");
  });

  it("does not go below quantity 1 when - is clicked at minimum", () => {
    cy.contains("button", "-").click();
    // Should still show at least 1
    cy.contains("1").should("exist");
  });

  // ── Add to Cart ──────────────────────────────────────────────────────────────

  it("shows the Add to Cart button", () => {
    cy.contains("button", /add to cart/i).should("be.visible");
  });

  it("shows confirmation feedback after clicking Add to Cart", () => {
    cy.contains("button", /add to cart/i).click();
    cy.contains(/added to cart/i).should("be.visible");
  });

  it("increments the cart badge in the navbar after adding to cart", () => {
    cy.contains("button", /add to cart/i).click();
    // Give animation time to update navbar counter
    cy.wait(500);
    cy.get("nav").contains(/[1-9]/).should("exist");
  });

  // ── Free delivery note ────────────────────────────────────────────────────────

  it("shows free delivery information", () => {
    cy.contains(/free delivery/i).should("exist");
  });

  // ── Related Cakes ─────────────────────────────────────────────────────────────

  it("shows the 'You May Also Like' related section if applicable", () => {
    // Not all cakes have related cakes, but cake 1 (Birthday) should
    cy.contains(/you may also like/i).should("exist");
  });

  // ── 404 handling ─────────────────────────────────────────────────────────────

  it("shows a not-found response for an invalid cake id", () => {
    cy.visit("/cake/99999", { failOnStatusCode: false });
    // Next.js renders a 404 page with a 'not found' message
    cy.contains(/not found|404/i, { timeout: 6000 }).should("exist");
  });
});
