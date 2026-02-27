/**
 * E2E tests for the Admin Cakes management page (/admin/cakes)
 *
 * Covers:
 * - Page renders with correct heading and cake count
 * - Cake table with expected columns
 * - Add New Cake modal (open, fill, save)
 * - Edit Cake modal (open, update, save)
 * - Delete Cake confirmation
 * - Validation: save is disabled when required fields are empty
 */
describe("Admin Cakes Management (/admin/cakes)", () => {
  beforeEach(() => {
    cy.adminLogin();
    cy.visit("/admin/cakes");
  });

  // ── Page rendering ─────────────────────────────────────────────────────────────

  it("shows the 'Manage Cakes' heading", () => {
    cy.contains("h1", /manage cakes/i).should("be.visible");
  });

  it("shows the cake count in the subheading", () => {
    cy.contains(/\d+ cakes in catalog/i).should("be.visible");
  });

  it("shows the '+ Add New Cake' button", () => {
    cy.contains("button", /\+ add new cake/i).should("be.visible");
  });

  // ── Table columns ─────────────────────────────────────────────────────────────

  it("renders Image, Name, Category, Base Price, Rating and Actions columns", () => {
    cy.contains(/^image$/i).should("exist");
    cy.contains(/^name$/i).should("exist");
    cy.contains(/^category$/i).should("exist");
    cy.contains(/base price/i).should("exist");
    cy.contains(/rating/i).should("exist");
    cy.contains(/actions/i).should("exist");
  });

  it("shows at least one cake row in the table", () => {
    cy.contains("Strawberry Dream Cake").should("exist");
  });

  it("shows category badges in the table", () => {
    cy.contains(/birthday cakes|wedding cakes|chocolate cakes/i).should("exist");
  });

  it("shows Edit and Delete action buttons in each row", () => {
    cy.contains("button", /edit/i).should("exist");
    cy.contains("button", /delete/i).should("exist");
  });

  // ── Add New Cake ──────────────────────────────────────────────────────────────

  it("opens the Add New Cake modal when the button is clicked", () => {
    cy.contains("button", /\+ add new cake/i).click();
    cy.contains("h2", /add new cake/i).should("be.visible");
  });

  it("closes the modal when Cancel is clicked", () => {
    cy.contains("button", /\+ add new cake/i).click();
    cy.contains("button", /cancel/i).click();
    cy.contains("h2", /add new cake/i).should("not.exist");
  });

  it("disables the Add Cake button when required fields are empty", () => {
    cy.contains("button", /\+ add new cake/i).click();
    cy.contains("button", /^add cake$/i).should("be.disabled");
  });

  it("successfully adds a new cake and shows it in the table", () => {
    cy.contains("button", /\+ add new cake/i).click();
    cy.get('input[placeholder*="Chocolate Truffle" i]').type("Test Lemon Cake");
    cy.get('input[placeholder*="https://" i]').type("https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80");
    cy.get('input[placeholder*="700" i]').type("850");
    cy.contains("button", /^add cake$/i).click();
    cy.contains("Test Lemon Cake").should("be.visible");
  });

  // ── Edit Cake ─────────────────────────────────────────────────────────────────

  it("opens the Edit Cake modal pre-filled with existing cake data", () => {
    cy.contains("tr", "Strawberry Dream Cake").within(() => {
      cy.contains("button", /edit/i).click();
    });
    cy.contains("h2", /edit cake/i).should("be.visible");
    cy.get('input[placeholder*="Chocolate Truffle" i]').should("have.value", "Strawberry Dream Cake");
  });

  it("saves an edited cake and updates the table", () => {
    cy.contains("tr", "Strawberry Dream Cake").within(() => {
      cy.contains("button", /edit/i).click();
    });
    cy.get('input[placeholder*="Chocolate Truffle" i]')
      .clear()
      .type("Strawberry Dream Cake Updated");
    cy.contains("button", /save changes/i).click();
    cy.contains("Strawberry Dream Cake Updated").should("be.visible");
  });

  // ── Delete Cake ───────────────────────────────────────────────────────────────

  it("removes a cake from the table after confirming delete", () => {
    // First add a temporary cake to delete
    cy.contains("button", /\+ add new cake/i).click();
    cy.get('input[placeholder*="Chocolate Truffle" i]').type("Delete Me Cake");
    cy.get('input[placeholder*="https://" i]').type("https://example.com/cake.jpg");
    cy.get('input[placeholder*="700" i]').type("500");
    cy.contains("button", /^add cake$/i).click();

    // Now delete it
    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(true);
    });
    cy.contains("tr", "Delete Me Cake").within(() => {
      cy.contains("button", /delete/i).click();
    });
    cy.contains("Delete Me Cake").should("not.exist");
  });
});
