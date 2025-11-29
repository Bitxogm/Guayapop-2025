//* session.view.js

/**
 * Build navbar for authenticated user with greeting
 * @param {string} username - User's email
 * @returns {string} HTML for logged-in state
 */
export const buildAuthenticatedUserSession = (username) => {
  const shortName = username ? username.split('@')[0] : 'User';
  
  return `
    <span class="text-success me-5 fw-normal fs-4">👋🏻 Hello, ${shortName}!</span>
    <a id="create-ad-button" class="btn btn-success btn-sm me-2" href="create-ad.html">
      ➕ Create Ad
    </a>
    <button id="closeSession" class="btn btn-outline-danger btn-sm">
      🚪 Logout
    </button>
  `;
};

/**
 * Build navbar for unauthenticated user
 * @returns {string} HTML for logged-out state
 */
export const buildUnauthenticatedUserSession = () => {
  return `
    <a id="login-button" class="btn btn-outline-primary btn-sm me-2" href="login.html">
      🔐 Login
    </a>
    <a id="signup-button" class="btn btn-primary btn-sm" href="signup.html">
      📝 Sign Up
    </a>
  `;
};