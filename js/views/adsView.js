
/**
 * VIEW: Functions that BUILD HTML (only return strings)
 * - DO NOT manipulate DOM
 * - DO NOT fetch data
 * - Only construct HTML with template literals
 */

/**
 * Builds HTML for ONE ad card
 * @param {Object} ad - Ad object from backend
 * @returns {String} - HTML string for the card
 */
export const buildAdCard = (ad) => {
  // Default image if ad doesn't have photo
  const imageUrl = ad.foto || 'https://via.placeholder.com/400x200?text=No+Image';
  
  // Badge color based on type
  const badgeClass = ad.tipo === 'venta' ? 'bg-success' : 'bg-warning';
  const badgeText = ad.tipo === 'venta' ? '💰 Selling' : '🛒 Buying';
  
  // Return HTML string (template literal)
  return `
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <!-- Ad image -->
        <img src="${imageUrl}" class="card-img-top" alt="${ad.nombre}" style="height: 200px; object-fit: cover;">
        
        <!-- Card body -->
        <div class="card-body">
          <!-- Type badge -->
          <span class="badge ${badgeClass} mb-2">
            ${badgeText}
          </span>
          
          <!-- Product name -->
          <h5 class="card-title">${ad.nombre}</h5>
          
          <!-- Description (truncated) -->
          <p class="card-text text-muted">
            ${ad.descripcion.substring(0, 100)}...
          </p>
          
          <!-- Price -->
          <h4 class="text-primary">${ad.precio}€</h4>
        </div>
      </div>
    </div>
  `;
};

/**
 * Builds HTML for the complete ads list (grid container)
 * @param {String} cardsHTML - All cards HTML joined together
 * @returns {String} - HTML string with grid wrapper
 */
export const buildAdsList = (cardsHTML) => {
  return `
    <div class="row">
      ${cardsHTML}
    </div>
  `;
};