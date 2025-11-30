/**
 * Builds HTML for a single ad card
 * @param {Object} ad - Ad object from backend
 * @param {number} ad.id - Ad ID
 * @param {string} ad.name - Ad name
 * @param {string} ad.description - Ad description
 * @param {number} ad.price - Ad price
 * @param {string} ad.type - Ad type ('sell' or 'buy')
 * @param {string} [ad.image] - Ad image URL (optional)
 * @param {string[]} [ad.tags] - Ad tags (optional)
 * @returns {string} HTML string for the ad card
 */
export const buildAdCard = (ad) => {
  // Default image if ad doesn't have photo
  const placeHolderImage = 'https://placehold.co/400x200?text=No+Image';
  const image = ad.image ?? placeHolderImage;
  
  // Badge color based on type
  const badgeClass = ad.type === 'sell' ? 'bg-success' : 'bg-warning';
  const badgeText = ad.type === 'sell' ? '💰 Selling' : '🛒 Buying';
  
  // Tags badges (optional)
  const tagsHTML = ad.tags && ad.tags.length > 0 
    ? ad.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('') 
    : '';
  
  // Return HTML string -
  return `
    <div class="card h-100 ad-card-clickable">
      <!-- Ad image -->
      <img src="${image}" class="card-img-top" alt="${ad.name}" style="height: 200px; object-fit: cover;">
      
      <!-- Card body -->
      <div class="card-body">
        <!-- Type badge -->
        <span class="badge ${badgeClass} mb-2">
          ${badgeText}
        </span>
        
        <!-- Tags badges -->
        ${tagsHTML ? `<div class="mb-2">${tagsHTML}</div>` : ''}
        
        <!-- Product name -->
        <h5 class="card-title">${ad.name}</h5>
        
        <!-- Description (truncated) -->
        <p class="card-text text-muted">
          ${ad.description.length > 100 ? ad.description.substring(0, 100) + '...' : ad.description}
        </p>
        
        <!-- Price -->
        <h4 class="text-primary">${ad.price}€</h4>
      </div>
    </div>
  `;
};