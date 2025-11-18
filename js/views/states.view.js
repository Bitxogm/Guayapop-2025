
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


export const buildEmptyState = () => {
  return `
    <div class="col-12">
      <div class="alert alert-info text-center p-5">
        <h3>📭 No Ads Yet</h3>
        <p class="text-muted mb-3">
          There are no published ads yet.<br>
          Be the first to publish!
        </p>
        <a href="create-ad.html" class="btn btn-primary">
          ➕ Publish First Ad
        </a>
      </div>
    </div>
  `;
};