/**
 * Construye el HTML de los controles de paginación
 * @param {number} currentPage - Página actual
 * @param {number} totalPages - Total de páginas
 * @returns {string} HTML de la paginación
 */
export function buildPagination(currentPage, totalPages) {
  // Si solo hay 1 página o menos, no mostrar paginación
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