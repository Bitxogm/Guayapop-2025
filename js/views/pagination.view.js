/**
 * Build HTML for pagination
 * @param {number} currentPage - currentPage
 * @param {number} totalPages - Total pages
 * @returns {string} HTML pagination
 */
export function buildPagination(currentPage, totalPages) {
  if (totalPages <= 1) {
    return '';
  }

  const prevDisabled = currentPage === 1 ? 'disabled' : '';
  const nextDisabled = currentPage === totalPages ? 'disabled' : '';

  return `
    <nav aria-label="Pagination" class="d-flex justify-content-center align-items-center mt-4 gap-3">
      <button 
        class="btn btn-outline-primary" 
        id="prev-page-btn"
        ${prevDisabled}
        ${prevDisabled ? 'style="cursor: not-allowed; opacity: 0.5;"' : ''}
      >
        <i class="bi bi-chevron-left"></i> Previous
      </button>
      
      <span class="badge bg-primary fs-6 px-3 py-2">
        Page ${currentPage} of ${totalPages}
      </span>
      
      <button 
        class="btn btn-outline-primary" 
        id="next-page-btn"
        ${nextDisabled}
        ${nextDisabled ? 'style="cursor: not-allowed; opacity: 0.5;"' : ''}
      >
        Next <i class="bi bi-chevron-right"></i>
      </button>
    </nav>
  `;
}