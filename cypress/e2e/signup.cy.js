/**
 * E2E tests for the Sign Up page (/signup)
 *
 * Covers:
 * - Page renders correctly
 * - All form fields visible
 * - Inline validation errors for empty / invalid fields
 * - Successful signup redirects to /
 */
describe("Sign Up Page (/signup)", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  // ── Rendering ─────────────────────────────────────────────────────────────────

  it("renders the Create Account heading", () => {
    cy.contains("h1", /create account/i).should("be.visible");
  });

  it("shows the bakery brand emoji", () => {
    cy.contains("🎂").should("exist");
  });

  it("renders Full Name, Email, Phone, and Password fields", () => {
    cy.get('input[type="text"]').should("exist");
    cy.get('input[type="email"]').should("exist");
    cy.get('input[type="tel"]').should("exist");
    cy.get('input[type="password"]').should("exist");
  });

  it("renders the Create Account submit button", () => {
    cy.contains("button", /create account/i).should("be.visible");
  });

  it("has a Sign In link pointing to /login", () => {
    cy.contains("a", /sign in/i).should("have.attr", "href", "/login");
  });

  // ── Validation errors ──────────────────────────────────────────────────────────

  it("shows validation error when form is submitted empty", () => {
    cy.contains("button", /create account/i).click();
    cy.contains(/name is required/i).should("be.visible");
  });

  it("shows email validation error for invalid email", () => {
    cy.get('input[type="text"]').first().type("Test User");
    cy.get('input[type="email"]').type("not-an-email");
    cy.contains("button", /create account/i).click();
    cy.contains(/valid email required/i).should("be.visible");
  });

  it("shows phone validation error for non-10-digit phone", () => {
    cy.get('input[type="text"]').first().type("Test User");
    cy.get('input[type="email"]').type("test@example.com");
    cy.get('input[type="tel"]').type("12345");
    cy.contains("button", /create account/i).click();
    cy.contains(/10-digit/i).should("be.visible");
  });

  it("shows password length validation error for short password", () => {
    cy.get('input[type="text"]').first().type("Test User");
    cy.get('input[type="email"]').type("test@example.com");
    cy.get('input[type="tel"]').type("9876543210");
    cy.get('input[type="password"]').type("123");
    cy.contains("button", /create account/i).click();
    cy.contains(/at least 6 characters/i).should("be.visible");
  });

  // ── Successful signup ──────────────────────────────────────────────────────────

  it("redirects to / on successful signup", () => {
    cy.get('input[type="text"]').first().type("New User");
    cy.get('input[type="email"]').type("newuser@example.com");
    cy.get('input[type="tel"]').type("9876543210");
    cy.get('input[type="password"]').type("password123");
    cy.contains("button", /create account/i).click();
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });
});
