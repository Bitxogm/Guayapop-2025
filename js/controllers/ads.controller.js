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
    
    // Dispatch event: START fetching
    const startEvent = new CustomEvent('start-fetching-ads');
    adsSection.dispatchEvent(startEvent);  
    
    // Fetch data from Model
    const ads = await getAds();
    
    //  STATE = EMPTY
    if (ads.length === 0) {
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
    
    // Build HTML using Views
    const cardsHTMLArray = ads.map(ad => buildAdCard(ad));
    const allCardsHTML = cardsHTMLArray.join('');
    const completeHTML = buildAdsList(allCardsHTML);
    
    // Insert into DOM
    adsContainer.innerHTML = completeHTML;
    
  } catch (error) {
    //  STATE = ERROR
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
    const finishEvent = new CustomEvent('finish-fetching-ads');
    adsSection.dispatchEvent(finishEvent);
  }
};