// ***********************************************
// Custom Cypress commands for Sweet Moments Bakery
// ***********************************************

/**
 * Log in as admin (admin@bakery.com / admin123).
 * After this command the browser is on /admin.
 */
Cypress.Commands.add("adminLogin", () => {
  cy.visit("/login");
  cy.get('input[type="email"]').type("admin@bakery.com");
  cy.get('input[type="password"]').type("admin123");
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/admin");
});

/**
 * Log in as a regular customer.
 * After this command the browser is on /.
 * @param {string} [email]
 * @param {string} [password]
 */
Cypress.Commands.add("customerLogin", (email = "customer@example.com", password = "customer123") => {
  cy.visit("/login");
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should("eq", Cypress.config("baseUrl") + "/");
});

/**
 * Visit a cake detail page (by cake id) and add it to the cart.
 * @param {number} cakeId
 */
Cypress.Commands.add("addCakeToCart", (cakeId = 1) => {
  cy.visit(`/cake/${cakeId}`);
  cy.contains("button", /add to cart/i).click();
  cy.contains(/added to cart/i).should("be.visible");
});
