// js/controllers/ads.controller.js

import { getAds } from '../models/adsModel.js';
import { buildAdCard } from '../views/ads.view.js';
import { buildEmptyState } from '../views/states.view.js';
import { constants } from '/../utils/constants.js';

export const adsController = async () => {
  console.log('🎮 CONTROLLER: Starting loadAds...');

  const adsContainer = document.getElementById('ads-container');
  const adsSection = document.getElementById('ads-cards');

  if (!adsContainer || !adsSection) {
    console.error('❌ CONTROLLER: Required elements not found');
    return;
  }

  const token = localStorage.getItem(constants.tokenKey);
  const isAuthenticated = !!token;

  let ads = [];

  try {
    // Dispatch start event
    const startEvent = new CustomEvent('start-fetching-ads', {
      detail: { message: 'Fetching ads...', type: 'info' }
    });
    adsSection.dispatchEvent(startEvent);

    ads = await getAds();

  } catch (error) {
    console.error('❌ CONTROLLER: Error fetching ads:', error);
    
    const errorEvent = new CustomEvent('ads-error', {
      detail: { message: error.message, type: 'error' }
    });
    adsSection.dispatchEvent(errorEvent);
    
    adsContainer.innerHTML = '';

  } finally {
    const finishEvent = new CustomEvent('finish-fetching-ads');
    adsSection.dispatchEvent(finishEvent);
  }

  // Empty state
  if (ads.length === 0) {
    console.log('📭 CONTROLLER: No ads found');
    adsContainer.innerHTML = buildEmptyState(isAuthenticated);
    return;
  }

  // Success state
  console.log(`✅ CONTROLLER: Building ${ads.length} ad cards...`);

  adsContainer.innerHTML = '';

  const gridRow = document.createElement('div');
  gridRow.classList.add('row');

  ads.forEach((ad) => {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('col-md-4', 'mb-4');
    
    cardWrapper.innerHTML = buildAdCard(ad);
    
    // Add click event listener
    cardWrapper.addEventListener('click', () => {
      console.log(`🖱️ Card clicked, navigating to ad detail: ${ad.id}`);
      // Get the ad ID from the card data
      window.location.href = `ad-detail.html?id=${ad.id}`;
    });
    
    // ❌ QUITAMOS ESTO:
    // cardWrapper.style.cursor = 'pointer';
    
    gridRow.appendChild(cardWrapper);
  });

  adsContainer.appendChild(gridRow);
  
  console.log('✅ CONTROLLER: Ads rendered successfully');
};