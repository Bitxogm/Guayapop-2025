export const buildAdDetailCard = (ad, isOwner = false) => {

  const placeHolderImage = 'https://placehold.co/800x400?text=No+Image';
  
  const image = ad.image ?? placeHolderImage;
  const badgeClass = ad.type === 'sell' ? 'bg-success' : 'bg-warning';
  const badgeText = ad.type === 'sell' ? '💰 Selling' : '🛒 Buying';
  const tagsHTML = ad.tags && ad.tags.length > 0 
    ? ad.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('') 
    : '';
  
  //* Owner info (if expanded)
  const ownerHTML = ad.user 
    ? `<p class="mb-1">👤 Published by: <strong>${ad.user.username}</strong></p>`
    : '';
  
  const actionButtonsHTML = isOwner 
    ? `<button id="edit-ad-btn" class="btn btn-warning">
         ✏️ Edit Ad
       </button>
       <button id="delete-ad-btn" class="btn btn-danger">
         🗑️ Delete Ad
       </button>` 
    : '';
  
  const createdDate = ad.updatedAt 
    ? new Date(ad.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unknown';

  return `
    <div class="card shadow-sm">
      <img 
        src="${image}" 
        class="card-img-top" 
        alt="${ad.name}" 
        style="height: 400px; object-fit: cover;"
      >
      
      <div class="card-body">
        
        <div class="mb-3">
          <span class="badge ${badgeClass} me-2">
            ${badgeText}
          </span>
          ${tagsHTML}
        </div>
        
        <h1 class="card-title mb-3">${ad.name}</h1>
        <h2 class="text-primary mb-4">${ad.price}€</h2>
        
        <div class="mb-4">
          <h5 class="text-muted">Description</h5>
          <p class="card-text">${ad.description}</p>
        </div>
        
        <!-- Metadata with owner info -->
        <div class="text-muted small mb-3">
          ${ownerHTML}
          <p class="mb-1">📅 Published: ${createdDate}</p>
          <p class="mb-0">🆔 Ad ID: ${ad.id}</p>
        </div>
        
        <div class="d-flex gap-2">
          <a href="index.html" class="btn btn-outline-secondary">
            ← Back to Ads
          </a>
          ${actionButtonsHTML}
        </div>
        
      </div>
    </div>
  `;
};


