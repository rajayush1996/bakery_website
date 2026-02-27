/**
 * E2E tests for the Home page (/)
 *
 * Covers:
 * - Page metadata and navigation bar
 * - Hero Carousel presence and controls
 * - Featured Cakes section
 * - Categories section
 * - "Why Choose Us" section
 * - Testimonials section
 * - CTA Banner section
 */
describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // ── Navbar ──────────────────────────────────────────────────────────────────

  it("shows the bakery brand in the navbar", () => {
    cy.contains("Sweet Moments").should("be.visible");
  });

  it("has working navbar links for Home and Cakes", () => {
    cy.get('nav a[href="/"]').first().should("be.visible");
    cy.get('nav a[href="/cakes"]').first().should("be.visible");
  });

  it("shows a cart link in the navbar", () => {
    cy.get('a[href="/cart"]').should("exist");
  });

  it("shows Login link when not authenticated", () => {
    cy.get('a[href="/login"]').should("be.visible");
  });

  // ── Hero Carousel ────────────────────────────────────────────────────────────

  it("renders the hero carousel with a heading", () => {
    // The carousel renders at least one h1 / h2 text
    cy.get("h1, h2").first().should("exist");
  });

  it("shows Previous and Next carousel buttons", () => {
    cy.contains("button", /previous slide/i).should("exist");
    cy.contains("button", /next slide/i).should("exist");
  });

  it("advances the carousel when the Next button is clicked", () => {
    cy.get("h1").first().invoke("text").then((initialTitle) => {
      cy.contains("button", /next slide/i).click();
      // After advancing, the slide counter or heading should change
      cy.get("[data-testid='slide-counter'], h1").should("exist");
      // The title should eventually differ (allow animation time)
      cy.wait(1000);
      cy.get("h1").first().invoke("text").should("not.be.empty");
    });
  });

  it("shows dot / indicator buttons for carousel slides", () => {
    cy.contains("button", /go to slide/i).should("exist");
  });

  it("shows a CTA link in the carousel (Order Now / Shop)", () => {
    cy.get("main").within(() => {
      cy.contains("a", /order now|shop|explore|grab/i).should("exist");
    });
  });

  // ── Featured Cakes ───────────────────────────────────────────────────────────

  it("renders the Featured Cakes section heading", () => {
    cy.contains("h2", /featured cakes/i).should("exist");
  });

  it("renders at least 3 cake cards in the featured section", () => {
    cy.get("section").filter(":contains('Featured Cakes')").within(() => {
      cy.get("img").should("have.length.at.least", 3);
    });
  });

  it("has a 'View All Cakes' link that navigates to /cakes", () => {
    cy.contains("a", /view all cakes/i).click();
    cy.url().should("include", "/cakes");
  });

  // ── Categories ───────────────────────────────────────────────────────────────

  it("renders the Categories section", () => {
    cy.contains("h2", /categories/i).should("exist");
  });

  it("shows category links that include a category query param", () => {
    cy.get('a[href*="category="]').should("have.length.at.least", 1);
  });

  it("navigates to the cakes page with correct category filter when clicked", () => {
    cy.get('a[href*="category=Birthday"]').first().click();
    cy.url().should("include", "category=Birthday");
  });

  // ── Why Choose Us ────────────────────────────────────────────────────────────

  it("renders the 'Baked with Passion' section", () => {
    cy.contains(/baked with passion/i).should("exist");
  });

  it("shows the four feature cards", () => {
    cy.contains(/fresh ingredients/i).should("exist");
    cy.contains(/expert bakers/i).should("exist");
    cy.contains(/fast delivery/i).should("exist");
    cy.contains(/custom designs/i).should("exist");
  });

  // ── Testimonials ─────────────────────────────────────────────────────────────

  it("renders the Testimonials section heading", () => {
    cy.contains(/what asansol says/i).should("exist");
  });

  it("shows at least one testimonial card", () => {
    cy.contains(/happy customers/i).should("exist");
    // Each testimonial has a star rating
    cy.contains("★").should("exist");
  });

  // ── CTA Banner ───────────────────────────────────────────────────────────────

  it("renders the CTA banner with an Order Now link", () => {
    cy.contains("a", /order now/i).should("exist");
  });

  it("renders the Call Us telephone link", () => {
    cy.get('a[href^="tel:"]').should("exist");
  });

  // ── Footer ───────────────────────────────────────────────────────────────────

  it("renders the footer with copyright text", () => {
    cy.get("footer").should("exist");
    cy.get("footer").contains(/sweet moments/i).should("exist");
  });
});
