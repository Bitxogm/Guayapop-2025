
import { getAds } from '../models/adsModel.js';
import { buildAdCard, buildAdsList } from '../views/adsView.js';
import { buildErrorState, buildEmptyState } from '../views/statesView.js';


export const loadAds = async () => {
  console.log('🎮 CONTROLLER: Starting loadAds...');
  
  const adsContainer = document.getElementById('ads-container');
  const loader = document.querySelector('.loader');
  
  if (!adsContainer) {
    console.error('❌ CONTROLLER: Container #ads-container not found');
    return;
  }
  
  if (!loader) {
    console.error('❌ CONTROLLER: Loader not found');
    return;
  }

  try {
 
    console.log('🔄 CONTROLLER: STATE = LOADING');
    
    // Show spinner
    loader.classList.remove('hidden');
    
    // Clear container
    adsContainer.innerHTML = '';
    
  
    console.log('🎮 CONTROLLER: Calling Model...');
    const ads = await getAds();
    console.log(`🎮 CONTROLLER: Received ${ads.length} ads`);
    
   
    loader.classList.add('hidden');
    
  
    if (ads.length === 0) {
      console.log('📭 CONTROLLER: STATE = EMPTY (no ads)');
      adsContainer.innerHTML = buildEmptyState();
      return;  
    }
    

    console.log('✅ CONTROLLER: STATE = SUCCESS, building HTML...');
    
    // Build HTML using Views
    const cardsHTMLArray = ads.map(ad => buildAdCard(ad));
    const allCardsHTML = cardsHTMLArray.join('');
    const completeHTML = buildAdsList(allCardsHTML);
    
    // Insert into DOM
    adsContainer.innerHTML = completeHTML;
    console.log('✅ CONTROLLER: Ads displayed on screen!');
    
  } catch (error) {
   
    console.error('❌ CONTROLLER: STATE = ERROR');
    console.error('❌ CONTROLLER: Error details:', error.message);
    
    // Hide spinner
    loader.classList.add('hidden');
    
    // Show error message
    adsContainer.innerHTML = buildErrorState(error.message);
    
    // Add event listener to retry button
    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        console.log('🔄 CONTROLLER: User clicked RETRY');
        loadAds();  // Try again
      });
    }
  }
};