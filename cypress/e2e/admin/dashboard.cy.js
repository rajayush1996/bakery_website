/**
 * E2E tests for the Admin Dashboard (/admin)
 *
 * Covers:
 * - Redirect to / when not logged in
 * - Admin login and dashboard renders
 * - Metric cards (Total Orders, Revenue, Cakes, Pending)
 * - Monthly Sales chart visible
 * - Order Status summary visible
 * - Recent Orders table visible
 * - Sidebar navigation links
 */
describe("Admin Dashboard (/admin)", () => {
  // ── Auth guard ────────────────────────────────────────────────────────────────

  it("redirects non-admin users away from /admin", () => {
    cy.visit("/admin");
    // Should not stay on /admin — will be redirected to /
    cy.url().should("not.include", "/admin");
  });

  // ── Authenticated admin ────────────────────────────────────────────────────────

  describe("as admin", () => {
    beforeEach(() => {
      cy.adminLogin();
    });

    it("shows the Dashboard heading", () => {
      cy.contains("h1", /dashboard/i).should("be.visible");
    });

    it("shows the welcome message", () => {
      cy.contains(/welcome back, admin/i).should("be.visible");
    });

    // ── Metric cards ──────────────────────────────────────────────────────────────

    it("shows the Total Orders metric card", () => {
      cy.contains(/total orders/i).should("be.visible");
    });

    it("shows the Total Revenue metric card", () => {
      cy.contains(/total revenue/i).should("be.visible");
      cy.contains(/₹/).should("exist");
    });

    it("shows the Total Cakes metric card", () => {
      cy.contains(/total cakes/i).should("be.visible");
    });

    it("shows the Pending Orders metric card", () => {
      cy.contains(/pending orders/i).should("be.visible");
    });

    // ── Charts ────────────────────────────────────────────────────────────────────

    it("shows the Monthly Sales chart section", () => {
      cy.contains(/monthly sales/i).should("be.visible");
    });

    it("shows the Order Status summary", () => {
      cy.contains(/order status/i).should("be.visible");
      cy.contains(/pending/i).should("exist");
      cy.contains(/delivered/i).should("exist");
    });

    // ── Recent Orders table ───────────────────────────────────────────────────────

    it("shows the Recent Orders table", () => {
      cy.contains(/recent orders/i).should("be.visible");
    });

    it("shows Order ID column in the orders table", () => {
      cy.contains(/order id/i).should("exist");
    });

    it("shows at least one order row in the table", () => {
      cy.contains(/ORD-/).should("exist");
    });

    // ── Sidebar navigation ────────────────────────────────────────────────────────

    it("shows the Admin Panel label in the sidebar", () => {
      cy.contains(/admin panel/i).should("be.visible");
    });

    it("shows all sidebar nav links", () => {
      cy.contains("a", /dashboard/i).should("be.visible");
      cy.contains("a", /manage cakes/i).should("be.visible");
      cy.contains("a", /carousel slides/i).should("be.visible");
      cy.contains("a", /orders/i).should("be.visible");
    });

    it("navigates to Manage Cakes from sidebar", () => {
      cy.contains("a", /manage cakes/i).click();
      cy.url().should("include", "/admin/cakes");
    });

    it("navigates to Carousel Slides from sidebar", () => {
      cy.contains("a", /carousel slides/i).click();
      cy.url().should("include", "/admin/carousel");
    });

    it("navigates to Orders from sidebar", () => {
      cy.contains("a", /orders/i).click();
      cy.url().should("include", "/admin/orders");
    });

    it("navigates to View Store from sidebar", () => {
      cy.contains("a", /view store/i).click();
      cy.url().should("eq", Cypress.config("baseUrl") + "/");
    });

    it("logs out from the sidebar Logout button", () => {
      cy.get("aside").contains("button", /logout/i).click();
      cy.url().should("eq", Cypress.config("baseUrl") + "/");
      cy.get('a[href="/login"]').should("be.visible");
    });
  });
});
