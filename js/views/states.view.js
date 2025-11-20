
//** States View */

/**
 * Builds error state HTML with retry button
 * @param {string} message - Error message to display
 * @returns {String} HTML for error state
 */
export const buildErrorState = (message) => {
  return `
    <div class="col-12">
      <div class="alert alert-danger text-center p-5">
        <h3>❌ Error</h3>
        <p class="mb-3">${message}</p>
        <button id="retry-btn" class="btn btn-primary">
          🔄 Retry
        </button>
      </div>
    </div>
  `;
};

/**
 * Builds empty state HTML with conditional button
 * @param {boolean} isAuthenticated - Whether user is logged in
 * @returns {String} HTML for empty state
 */
export const buildEmptyState = (isAuthenticated = false) => {
  // Button and message depend on authentication status
  const buttonHTML = isAuthenticated
    ? `<a href="create-ad.html" class="btn btn-primary">
         ➕ Publish First Ad
       </a>`
    : `<a href="login.html" class="btn btn-primary">
         🔐 Login to Publish
       </a>`;
  
  const messageText = isAuthenticated
    ? 'Be the first to publish!'
    : 'Login to publish an ad!';

  return `
    <div class="col-12">
      <div class="alert alert-info text-center p-5">
        <h3>📭 No Ads Yet</h3>
        <p class="text-muted mb-3">
          There are no published ads yet.<br>
          ${messageText}
        </p>
        ${buttonHTML}
      </div>
    </div>
  `;
};