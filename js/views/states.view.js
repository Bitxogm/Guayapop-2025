/**
 * VIEW: Functions that BUILD HTML for different states
 */

/**
 * Builds HTML for empty state (no ads found)
 * @param {boolean} isAuthenticated - Whether user is logged in
 * @param {string} username - Username of logged user (optional)
 * @returns {String} - HTML string for empty state
 */
export const buildEmptyState = (isAuthenticated, username = null) => {
  
  //* Welcome message (if authenticated)
  const welcomeMessage = username 
    ? `<p class="text-muted mb-4">Welcome back, <strong>${username.split('@')[0]}</strong>!</p>`
    : '<p class="text-muted mb-4">Be the first to publish an ad</p>';
  
  //* Call to action button
  const createButton = isAuthenticated
    ? `<a href="create-ad.html" class="btn btn-primary">
         ➕ Create your first ad
       </a>`
    : `<a href="login.html" class="btn btn-primary">
         🔐 Login to create ads
       </a>`;

  return `
    <div class="text-center py-5">
      <div class="mb-4">
        <span style="font-size: 4rem;">📦</span>
      </div>
      <h3 class="mb-3">No ads available yet</h3>
      ${welcomeMessage}
      ${createButton}
    </div>
  `;
};

/**
 * Builds HTML for error state with retry option
 * @param {String} errorMessage - Error message to display
 * @returns {String} - HTML string for error state
 */
export const buildErrorState = (errorMessage) => {
  return `
    <div class="text-center py-5">
      <div class="mb-4">
        <span style="font-size: 4rem;">⚠️</span>
      </div>
      <h3 class="mb-3">Oops! Something went wrong</h3>
      <p class="text-muted mb-4">${errorMessage}</p>
      <button onclick="location.reload()" class="btn btn-primary">
        🔄 Try again
      </button>
    </div>
  `;
};