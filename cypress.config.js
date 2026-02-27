const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    // Increase default command timeout for animated pages
    defaultCommandTimeout: 8000,
    // Retry on CI
    retries: {
      runMode: 2,
      openMode: 0,
    },
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    video: false,
    screenshotsFolder: "cypress/screenshots",
    // Ignore uncaught exceptions from framer-motion / Next.js HMR
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
