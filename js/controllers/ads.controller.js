// js/controllers/ads.controller.js

import { getAds } from '../models/adsModel.js';
import { buildAdCard, buildAdsList } from '../views/ads.view.js';
import { buildEmptyState } from '../views/states.view.js';


export const loadAds = async () => {
  console.log('🎮 CONTROLLER: Starting loadAds...');
  
  // Get DOM references
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
    //  STATE = LOADING
    console.log('🔄 CONTROLLER: STATE = LOADING');
    
    // Dispatch event: START fetching
    const startEvent = new CustomEvent('start-fetching-ads');
    adsSection.dispatchEvent(startEvent);  // ✅ Dispatch on EVENT BUS
    
    // Fetch data from Model
    console.log('🎮 CONTROLLER: Calling Model...');
    const ads = await getAds();
    console.log(`🎮 CONTROLLER: Received ${ads.length} ads`);
    
    //  STATE = EMPTY
    if (ads.length === 0) {
      console.log('📭 CONTROLLER: STATE = EMPTY (no ads)');
      adsContainer.innerHTML = buildEmptyState();
      
      //  Dispatch empty event
      const emptyEvent = new CustomEvent('ads-empty', {
        detail: {
          message: 'No ads yet',
          type: 'info'
        }
        });
      adsSection.dispatchEvent(emptyEvent);
      return;
    }
    
    //  STATE = SUCCESS
    console.log('✅ CONTROLLER: STATE = SUCCESS, building HTML...');
    
    // Build HTML using Views
    const cardsHTMLArray = ads.map(ad => buildAdCard(ad));
    const allCardsHTML = cardsHTMLArray.join('');
    const completeHTML = buildAdsList(allCardsHTML);
    
    // Insert into DOM
    adsContainer.innerHTML = completeHTML;
    console.log('✅ CONTROLLER: Ads displayed on screen!');
    
  } catch (error) {
    //  STATE = ERROR
    console.error('❌ CONTROLLER: STATE = ERROR');
    console.error('❌ CONTROLLER: Error details:', error.message);
    
    // Clear container on error
    adsContainer.innerHTML = '';
    
    //  Dispatch error event WITH 
    const errorEvent = new CustomEvent('ads-error', {
      detail: { 
        message: error.message,
        type: 'error'
      } 
    });
    adsSection.dispatchEvent(errorEvent);
    
  } finally {
    // Always dispatch finish event (hide loader)
    console.log('🏁 CONTROLLER: Dispatching finish event');
    const finishEvent = new CustomEvent('finish-fetching-ads');
    adsSection.dispatchEvent(finishEvent);
  }
};