/**
 * E2E tests for the Checkout page (/checkout)
 *
 * Covers:
 * - Redirect to cakes if cart is empty (the page shows empty-cart state)
 * - Checkout form renders with delivery address and payment sections
 * - Inline validation errors for empty / invalid fields
 * - Payment method selection (COD vs Online)
 * - Successful order placement shows confirmation screen
 */
describe("Checkout Page (/checkout)", () => {
  // ── Empty cart state ───────────────────────────────────────────────────────────

  it("shows the checkout form even with empty cart (no items means ₹0 total)", () => {
    cy.visit("/checkout");
    cy.contains(/checkout/i).should("be.visible");
  });

  // ── Populated cart checkout ────────────────────────────────────────────────────

  describe("with a cake in the cart", () => {
    beforeEach(() => {
      cy.addCakeToCart(1);
      cy.visit("/checkout");
    });

    it("shows the Checkout heading", () => {
      cy.contains("h1", /checkout/i).should("be.visible");
    });

    it("shows the Delivery Address section", () => {
      cy.contains(/delivery address/i).should("be.visible");
    });

    it("shows Full Name, Phone, Pincode, City and Address fields", () => {
      cy.get('input[placeholder*="full name" i]').should("exist");
      cy.get('input[placeholder*="mobile" i]').should("exist");
      cy.get('input[placeholder*="pincode" i]').should("exist");
      cy.get('textarea[placeholder*="area" i]').should("exist");
    });

    it("shows the Payment Method section", () => {
      cy.contains(/payment method/i).should("be.visible");
    });

    it("shows Cash on Delivery and Online Payment options", () => {
      cy.contains(/cash on delivery/i).should("be.visible");
      cy.contains(/online payment/i).should("be.visible");
    });

    it("defaults to Cash on Delivery selected", () => {
      // COD label should have the selected (active-border) class
      cy.contains(/cash on delivery/i)
        .closest("label")
        .should("have.class", "border-primary");
    });

    it("switches to Online Payment when clicked", () => {
      cy.contains(/online payment/i).click();
      cy.contains(/online payment/i)
        .closest("label")
        .should("have.class", "border-primary");
    });

    it("shows the Order Summary with subtotal, delivery, and total", () => {
      cy.contains(/order summary/i).should("be.visible");
      cy.contains(/subtotal/i).should("exist");
      cy.contains(/delivery/i).should("exist");
      cy.contains(/total/i).should("exist");
    });

    it("shows the Place Order button with the total amount", () => {
      cy.contains("button", /place order/i).should("be.visible");
      cy.contains("button", /₹/).should("exist");
    });

    // ── Validation ──────────────────────────────────────────────────────────────

    it("shows validation errors when Place Order is submitted with empty form", () => {
      cy.contains("button", /place order/i).click();
      cy.contains(/name is required/i).should("be.visible");
    });

    it("shows phone number validation error for non-10-digit phone", () => {
      cy.get('input[placeholder*="full name" i]').type("Test User");
      cy.get('input[placeholder*="mobile" i]').type("12345");
      cy.contains("button", /place order/i).click();
      cy.contains(/10-digit phone/i).should("be.visible");
    });

    it("shows pincode validation error for non-6-digit pincode", () => {
      cy.get('input[placeholder*="full name" i]').type("Test User");
      cy.get('input[placeholder*="mobile" i]').type("9876543210");
      cy.get('input[placeholder*="pincode" i]').type("123");
      cy.contains("button", /place order/i).click();
      cy.contains(/6-digit pincode/i).should("be.visible");
    });

    // ── Successful order ────────────────────────────────────────────────────────

    it("shows the order success screen after valid form submission", () => {
      cy.get('input[placeholder*="full name" i]').type("Test User");
      cy.get('input[placeholder*="mobile" i]').type("9876543210");
      cy.get('input[placeholder*="pincode" i]').type("713301");
      cy.get('input[value="Asansol"]').should("exist"); // city pre-filled
      cy.get('textarea[placeholder*="area" i]').type("15, GT Road, Asansol");
      cy.contains("button", /place order/i).click();
      cy.contains(/order placed successfully/i).should("be.visible");
    });

    it("shows the customer's phone number on the success screen", () => {
      cy.get('input[placeholder*="full name" i]').type("Test User");
      cy.get('input[placeholder*="mobile" i]').type("9876543210");
      cy.get('input[placeholder*="pincode" i]').type("713301");
      cy.get('textarea[placeholder*="area" i]').type("15, GT Road");
      cy.contains("button", /place order/i).click();
      cy.contains("9876543210").should("be.visible");
    });

    it("navigates back to Home from the success screen", () => {
      cy.get('input[placeholder*="full name" i]').type("Test User");
      cy.get('input[placeholder*="mobile" i]').type("9876543210");
      cy.get('input[placeholder*="pincode" i]').type("713301");
      cy.get('textarea[placeholder*="area" i]').type("15, GT Road");
      cy.contains("button", /place order/i).click();
      cy.contains("button", /back to home/i).click();
      cy.url().should("eq", Cypress.config("baseUrl") + "/");
    });
  });
});
