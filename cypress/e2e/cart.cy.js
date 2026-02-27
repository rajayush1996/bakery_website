/**
 * E2E tests for the Cart page (/cart)
 *
 * Covers:
 * - Empty cart state
 * - Cart populated after adding a cake
 * - Quantity increment / decrement
 * - Remove item from cart
 * - Order summary (subtotal, delivery, total)
 * - Free delivery threshold message
 * - Proceed to Checkout link
 * - Continue Shopping link
 */
describe("Cart Page (/cart)", () => {
  // ── Empty cart ────────────────────────────────────────────────────────────────

  it("shows an empty cart message when no items have been added", () => {
    cy.visit("/cart");
    cy.contains(/your cart is empty/i).should("be.visible");
    cy.contains("a", /browse cakes/i).should("be.visible");
  });

  it("navigates to /cakes from the empty cart 'Browse Cakes' button", () => {
    cy.visit("/cart");
    cy.contains("a", /browse cakes/i).click();
    cy.url().should("include", "/cakes");
  });

  // ── Populated cart ────────────────────────────────────────────────────────────

  describe("with a cake in the cart", () => {
    beforeEach(() => {
      // Add cake id=1 to cart via the detail page, then go to cart
      cy.addCakeToCart(1);
      cy.visit("/cart");
    });

    it("shows the cart heading with item count", () => {
      cy.contains(/shopping cart/i).should("be.visible");
      cy.contains(/\d+ item/i).should("be.visible");
    });

    it("displays the cake name in the cart", () => {
      cy.contains(/strawberry dream cake/i).should("be.visible");
    });

    it("shows the cake price in the cart", () => {
      cy.contains(/₹/).should("exist");
    });

    it("shows the Order Summary section", () => {
      cy.contains(/order summary/i).should("be.visible");
      cy.contains(/subtotal/i).should("be.visible");
      cy.contains(/delivery/i).should("be.visible");
      cy.contains(/total/i).should("be.visible");
    });

    it("increments item quantity via the + button", () => {
      cy.contains("button", "+").click();
      cy.contains("2").should("be.visible");
    });

    it("decrements item quantity via the – button", () => {
      cy.contains("button", "+").click(); // go to 2
      cy.contains("button", "-").click(); // back to 1
      cy.contains("1").should("be.visible");
    });

    it("removes item from cart when the × remove button is clicked", () => {
      cy.get('button[aria-label="Remove"]').click();
      cy.contains(/your cart is empty/i).should("be.visible");
    });

    it("has the 'Proceed to Checkout' button linking to /checkout", () => {
      cy.contains("a", /proceed to checkout/i).should("have.attr", "href", "/checkout");
    });

    it("has a 'Continue Shopping' link back to /cakes", () => {
      cy.contains("a", /continue shopping/i).should("have.attr", "href", "/cakes");
    });
  });

  // ── Free delivery threshold ───────────────────────────────────────────────────

  describe("free delivery messaging", () => {
    it("shows FREE delivery when subtotal is >= ₹500", () => {
      // Add cake 1 (1 kg = ₹650) to cart — subtotal will be ≥ ₹500
      cy.addCakeToCart(1);
      cy.visit("/cart");
      cy.contains(/free/i).should("exist");
    });

    it("shows a 'add more for free delivery' hint when subtotal is < ₹500", () => {
      // Cake 1 at 0.5 kg = ₹450, which is < ₹500
      cy.visit("/cake/1");
      // Select 0.5 kg weight
      cy.contains("button", "0.5 kg").click();
      cy.contains("button", /add to cart/i).click();
      cy.visit("/cart");
      cy.contains(/add ₹\d+ more for free delivery/i).should("be.visible");
    });
  });
});
