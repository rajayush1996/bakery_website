// Import custom commands
import "./commands";

// Suppress uncaught exceptions from Next.js hydration and framer-motion
// that are not related to the tests themselves.
Cypress.on("uncaught:exception", (err) => {
  // Ignore Next.js HMR, framer-motion, and React reconciler noise
  if (
    err.message.includes("ResizeObserver") ||
    err.message.includes("Minified React") ||
    err.message.includes("hydrat")
  ) {
    return false;
  }
  // Return false to prevent Cypress failing the test on other
  // uncaught exceptions that come from third-party scripts.
  return false;
});
