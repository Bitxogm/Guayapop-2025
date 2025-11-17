
import { getAds } from '../models/adsModel.js';
import { buildAdCard, buildAdsList } from '../views/adsView.js';


export const loadAds = async () => {
  console.log('🎮 CONTROLLER: Starting loadAds...');
  
  const adsContainer = document.getElementById('ads-container');
  
  if (!adsContainer) {
    console.error('❌ CONTROLLER: Container #ads-container not found');
    return; 
  }

  try {
    
    console.log('🎮 CONTROLLER: Calling Model to fetch ads...');
    const ads = await getAds();
    console.log(`🎮 CONTROLLER: Received ${ads.length} ads from Model`);
    
    console.log('🎮 CONTROLLER: Calling View to build HTML...');
    
    // Build each card (using .map())
    const cardsHTMLArray = ads.map(ad => buildAdCard(ad));
    
    //  Join all cards into one string
    const allCardsHTML = cardsHTMLArray.join('');
    
    // Wrap all cards in container
    const completeHTML = buildAdsList(allCardsHTML);
    
    console.log('🎮 CONTROLLER: HTML built successfully');
    
    //  Insert ads into the dom
    adsContainer.innerHTML = completeHTML;
    console.log('✅ CONTROLLER: Ads displayed on screen!');
    
  } catch (error) {
    // Error handling
    console.error('❌ CONTROLLER: Error loading ads:', error.message);
    
    // Show error message 
    adsContainer.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger">
          <strong>Error:</strong> Could not load ads. ${error.message}
        </div>
      </div>
    `;
  }
};