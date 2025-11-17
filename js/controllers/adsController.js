// js/controllers/adsController.js

import { getAds } from '../models/adsModel.js';
import { buildAdCard, buildAdsList } from '../views/adsView.js';
import { buildErrorState, buildEmptyState } from '../views/statesView.js';


export const loadAds = async () => {
  console.log('🎮 CONTROLLER: Starting loadAds...');
  
  //  Get DOM references
  const adsContainer = document.getElementById('ads-container'); // Where cards go
  const adsSection = document.getElementById('ads-cards');       // Event bus
  
  // Verify elements exist
  if (!adsContainer) {
    console.error('❌ CONTROLLER: Container #ads-container not found');
    return;
  }
  
  if (!adsSection) {
    console.error('❌ CONTROLLER: Section #ads-cards not found');
    return;
  }

  try {
 
    console.log('🔄 CONTROLLER: STATE = LOADING');
    
    // Dispatch event: START fetching
    const startEvent = new CustomEvent('start-fetching-ads');
    adsSection.dispatchEvent(startEvent);  // ✅ Dispatch on EVENT BUS
    
    // Clear container while loading
    adsContainer.innerHTML = '';
    
  
    console.log('🎮 CONTROLLER: Calling Model...');
    const ads = await getAds();
    console.log(`🎮 CONTROLLER: Received ${ads.length} ads`);
    

    if (ads.length === 0) {
      console.log('📭 CONTROLLER: STATE = EMPTY (no ads)');
      adsContainer.innerHTML = buildEmptyState();
      
      // Optional: Dispatch empty event
      const emptyEvent = new CustomEvent('ads-empty');
      adsSection.dispatchEvent(emptyEvent);
      
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
    
    // Show error message
    adsContainer.innerHTML = buildErrorState(error.message);
    
    // Dispatch error event
    const errorEvent = new CustomEvent('ads-error', {
      detail: { message: error.message }
    });
    adsSection.dispatchEvent(errorEvent);
    
    
    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        console.log('🔄 CONTROLLER: User clicked RETRY');
        loadAds();
      });
    }
    
  } finally {
   
    console.log('🏁 CONTROLLER: Dispatching finish event');
    const finishEvent = new CustomEvent('finish-fetching-ads');
    adsSection.dispatchEvent(finishEvent);
  }
};