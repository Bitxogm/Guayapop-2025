//* ============================================
//* session.view.js
//* ============================================

/**
 * VIEW: Session
 * Builds navbar buttons HTML based on authentication state
 */

/**
 * Build navbar buttons for authenticated user
 * @returns {string} HTML for logged-in state (Create Ad + Logout)
 */
export const buildAuthenticatedUserSession = () => {
  return `
    <a id="create-ad-button" class="btn btn-success btn-sm" href="create-ad.html">
      ➕ Create Ad
    </a>
    <button id="closeSession" class="btn btn-outline-danger btn-sm">
      🚪 Logout
    </button>
  `;
};

/**
 * Build navbar buttons for unauthenticated user
 * @returns {string} HTML for logged-out state (Login + Sign Up)
 */
export const buildUnauthenticatedUserSession = () => {
  return `
    <a id="login-button" class="btn btn-outline-primary btn-sm" href="login.html">
      Login
    </a>
    <a id="signup-button" class="btn btn-primary btn-sm" href="signup.html">
      Sign Up
    </a>
  `;
};