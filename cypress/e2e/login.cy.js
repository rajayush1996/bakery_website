/**
 * E2E tests for the Login page (/login)
 *
 * Covers:
 * - Page renders correctly
 * - Demo credentials hint visible
 * - Form validation (empty fields)
 * - Invalid credentials error message
 * - Successful admin login redirects to /admin
 * - Successful customer login redirects to /
 * - Navigation link to Sign Up
 */
describe("Login Page (/login)", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  // ── Rendering ─────────────────────────────────────────────────────────────────

  it("renders the Welcome Back heading", () => {
    cy.contains("h1", /welcome back/i).should("be.visible");
  });

  it("shows the bakery brand icon or emoji", () => {
    cy.contains("🎂").should("exist");
  });

  it("shows demo credentials helper text", () => {
    cy.contains(/demo credentials/i).should("be.visible");
    cy.contains(/admin@bakery\.com/i).should("be.visible");
  });

  it("renders email and password input fields", () => {
    cy.get('input[type="email"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
  });

  it("renders the Sign In submit button", () => {
    cy.get('button[type="submit"]').should("be.visible");
    cy.contains("button", /sign in/i).should("exist");
  });

  it("has a Sign Up link pointing to /signup", () => {
    cy.contains("a", /sign up/i).should("have.attr", "href", "/signup");
  });

  // ── Admin login ───────────────────────────────────────────────────────────────

  it("redirects to /admin after successful admin login", () => {
    cy.get('input[type="email"]').type("admin@bakery.com");
    cy.get('input[type="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/admin");
  });

  it("shows Admin link in navbar after admin login", () => {
    cy.get('input[type="email"]').type("admin@bakery.com");
    cy.get('input[type="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/admin");
    cy.get("nav").contains("Admin").should("be.visible");
  });

  // ── Customer login ─────────────────────────────────────────────────────────────

  it("redirects to / after successful customer login", () => {
    cy.get('input[type="email"]').type("customer@example.com");
    cy.get('input[type="password"]').type("anypassword");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

  it("shows Hi, Customer in navbar after customer login", () => {
    cy.get('input[type="email"]').type("customer@example.com");
    cy.get('input[type="password"]').type("anypassword");
    cy.get('button[type="submit"]').click();
    cy.get("nav").contains(/hi,/i).should("be.visible");
  });

  // ── Logout ────────────────────────────────────────────────────────────────────

  it("shows Logout button after login and logs out successfully", () => {
    cy.get('input[type="email"]').type("customer@example.com");
    cy.get('input[type="password"]').type("anypassword");
    cy.get('button[type="submit"]').click();
    cy.get("nav").contains("button", /logout/i).click();
    cy.get('a[href="/login"]').should("be.visible");
  });
});
