/**
 * E2E tests for the Admin Carousel Slides management page (/admin/carousel)
 *
 * Covers:
 * - Page renders with heading and slide count
 * - Tip banner is visible
 * - Table columns present
 * - All default slides listed
 * - Active toggle on a slide
 * - Reorder (move up / move down) buttons
 * - Preview modal opens and closes
 * - Add New Slide modal (open, fill, save)
 * - Edit slide modal (pre-filled data)
 * - Delete slide
 * - Inactive slides are not counted in the active count after toggling
 */
describe("Admin Carousel Management (/admin/carousel)", () => {
  beforeEach(() => {
    cy.adminLogin();
    cy.visit("/admin/carousel");
  });

  // ── Page rendering ─────────────────────────────────────────────────────────────

  it("shows the 'Carousel Slides' heading", () => {
    cy.contains("h1", /carousel slides/i).should("be.visible");
  });

  it("shows total slide count in the subheading", () => {
    cy.contains(/\d+ slides? total/i).should("be.visible");
  });

  it("shows active slide count in the subheading", () => {
    cy.contains(/\d+ active on homepage/i).should("be.visible");
  });

  it("shows the '+ Add New Slide' button", () => {
    cy.contains("button", /\+ add new slide/i).should("be.visible");
  });

  it("shows the informational tip banner", () => {
    cy.contains(/festival offer/i).should("exist");
    cy.contains(/promotion/i).should("exist");
  });

  // ── Table columns ─────────────────────────────────────────────────────────────

  it("renders the expected table columns", () => {
    cy.contains(/^preview$/i).should("exist");
    cy.contains(/title/i).should("exist");
    cy.contains(/type/i).should("exist");
    cy.contains(/badge/i).should("exist");
    cy.contains(/status/i).should("exist");
    cy.contains(/order/i).should("exist");
    cy.contains(/actions/i).should("exist");
  });

  it("shows the default slides in the table", () => {
    cy.contains("Freshly Baked with Love").should("exist");
    cy.contains("🎊 Diwali Special Collection").should("exist");
    cy.contains("Free Delivery on Orders").should("exist");
  });

  it("shows Edit and Delete buttons for each slide", () => {
    cy.contains("button", /edit/i).should("have.length.at.least", 1);
    cy.contains("button", /delete/i).should("have.length.at.least", 1);
  });

  // ── Active toggle ────────────────────────────────────────────────────────────

  it("shows active toggle buttons with correct title for active slides", () => {
    cy.contains("button", /active — click to hide/i).should("exist");
  });

  it("toggles a slide to inactive when the toggle is clicked", () => {
    // Get the initial active count text
    cy.contains(/(\d+) active on homepage/i).invoke("text").then((text) => {
      const initialCount = parseInt(text.match(/(\d+) active/)[1], 10);
      // Click the first active toggle to deactivate
      cy.contains("button", /active — click to hide/i).first().click();
      cy.contains(/(\d+) active on homepage/i)
        .invoke("text")
        .should((newText) => {
          const newCount = parseInt(newText.match(/(\d+) active/)[1], 10);
          expect(newCount).to.equal(initialCount - 1);
        });
    });
  });

  // ── Reorder ───────────────────────────────────────────────────────────────────

  it("has a disabled Move Up button (▲) for the first slide", () => {
    cy.get("table tbody tr").first().within(() => {
      cy.contains("button", "▲").should("be.disabled");
    });
  });

  it("has a disabled Move Down button (▼) for the last slide", () => {
    cy.get("table tbody tr").last().within(() => {
      cy.contains("button", "▼").should("be.disabled");
    });
  });

  it("moves a slide up when the ▲ button is clicked", () => {
    // Get text of the second row title before click
    cy.get("table tbody tr").eq(1).find("p").first().invoke("text").then((secondTitle) => {
      cy.get("table tbody tr").eq(1).within(() => {
        cy.contains("button", "▲").click();
      });
      // The title that was second should now be first
      cy.get("table tbody tr").first().find("p").first().should("have.text", secondTitle);
    });
  });

  // ── Preview modal ────────────────────────────────────────────────────────────

  it("opens a preview modal when the 👁 preview button is clicked", () => {
    cy.get("table tbody tr").first().within(() => {
      cy.contains("button", "👁").click();
    });
    // Preview modal shows the slide title
    cy.contains("h2", /freshly baked with love/i).should("be.visible");
  });

  it("closes the preview modal when the × button is clicked", () => {
    cy.get("table tbody tr").first().within(() => {
      cy.contains("button", "👁").click();
    });
    cy.contains("button", "×").click();
    cy.contains("h2", /freshly baked with love/i).should("not.exist");
  });

  // ── Add New Slide ─────────────────────────────────────────────────────────────

  it("opens the Add New Slide modal when the button is clicked", () => {
    cy.contains("button", /\+ add new slide/i).click();
    cy.contains("h2", /add new carousel slide/i).should("be.visible");
  });

  it("shows Slide Type selector with Product, Festival Offer, Promotion options", () => {
    cy.contains("button", /\+ add new slide/i).click();
    cy.contains("button", /product/i).should("be.visible");
    cy.contains("button", /festival offer/i).should("be.visible");
    cy.contains("button", /promotion/i).should("be.visible");
  });

  it("shows all form fields in the Add Slide modal", () => {
    cy.contains("button", /\+ add new slide/i).click();
    cy.contains(/image url/i).should("exist");
    cy.contains(/title/i).should("exist");
    cy.contains(/subtitle/i).should("exist");
    cy.contains(/description/i).should("exist");
    cy.contains(/button text/i).should("exist");
    cy.contains(/badge text/i).should("exist");
    cy.contains(/discount/i).should("exist");
  });

  it("disables the Add Slide button when required fields are empty", () => {
    cy.contains("button", /\+ add new slide/i).click();
    cy.contains("button", /^add slide$/i).should("be.disabled");
  });

  it("enables Add Slide button when Title and Image URL are filled", () => {
    cy.contains("button", /\+ add new slide/i).click();
    cy.get('input[placeholder*="unsplash" i]').type("https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=80");
    cy.get('input[placeholder*="Diwali" i]').type("New Year Special");
    cy.contains("button", /^add slide$/i).should("not.be.disabled");
  });

  it("adds a new slide and shows it in the table", () => {
    cy.contains("button", /\+ add new slide/i).click();
    cy.get('input[placeholder*="unsplash" i]').type("https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=80");
    cy.get('input[placeholder*="Diwali" i]').type("New Year Celebration Cake");
    cy.get('input[placeholder*="celebrate" i]').type("Ring in the New Year");
    cy.get('input[placeholder*="Shop Now" i]').clear().type("Order Now");
    cy.get('input[placeholder*="Up to 25" i]').type("30% OFF");
    cy.contains("button", /^add slide$/i).click();
    cy.contains("New Year Celebration Cake").should("be.visible");
  });

  it("closes the modal when Cancel is clicked", () => {
    cy.contains("button", /\+ add new slide/i).click();
    cy.contains("button", /cancel/i).click();
    cy.contains("h2", /add new carousel slide/i).should("not.exist");
  });

  // ── Edit Slide ────────────────────────────────────────────────────────────────

  it("opens the Edit Slide modal with pre-filled data", () => {
    cy.get("table tbody tr").first().within(() => {
      cy.contains("button", /edit/i).click();
    });
    cy.contains("h2", /edit carousel slide/i).should("be.visible");
    cy.get('input[placeholder*="Diwali" i]').should("not.have.value", "");
  });

  it("saves edited slide data and updates the table", () => {
    cy.get("table tbody tr").first().within(() => {
      cy.contains("button", /edit/i).click();
    });
    cy.get('input[placeholder*="Diwali" i]').clear().type("Updated Slide Title");
    cy.contains("button", /save changes/i).click();
    cy.contains("Updated Slide Title").should("be.visible");
  });

  // ── Delete Slide ──────────────────────────────────────────────────────────────

  it("removes a slide from the table after delete is confirmed", () => {
    // Add a throwaway slide first
    cy.contains("button", /\+ add new slide/i).click();
    cy.get('input[placeholder*="unsplash" i]').type("https://example.com/img.jpg");
    cy.get('input[placeholder*="Diwali" i]').type("Slide To Delete");
    cy.contains("button", /^add slide$/i).click();
    cy.contains("Slide To Delete").should("exist");

    // Stub confirm dialog
    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(true);
    });
    cy.contains("tr", "Slide To Delete").within(() => {
      cy.contains("button", /delete/i).click();
    });
    cy.contains("Slide To Delete").should("not.exist");
  });

  // ── Badge colour selection ────────────────────────────────────────────────────

  it("shows badge colour options in the Add Slide modal", () => {
    cy.contains("button", /\+ add new slide/i).click();
    cy.contains(/badge colour/i).should("exist");
    cy.contains("button", /amber/i).should("exist");
    cy.contains("button", /green/i).should("exist");
    cy.contains("button", /red/i).should("exist");
  });

  it("selects a badge colour when clicked", () => {
    cy.contains("button", /\+ add new slide/i).click();
    cy.contains("button", /amber/i).click();
    cy.contains("button", /amber/i).should("have.class", "ring-2");
  });
});
