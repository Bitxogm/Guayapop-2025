
/**
 * ENTRY POINT: Application orchestrator
 * - Initializes controllers
 * - Listens to custom events
 * - Coordinates everything (like in Twitter project)
 */

import { loadAds } from './controllers/adsController.js';
import { loaderController } from './controllers/loader.controller.js';

console.log('🚀 Application starting...');

//  Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM ready, initializing...');
  
  //  Get DOM containers
  const adsSection = document.getElementById('ads-cards');          // Event bus (section)
  const loaderContainer = document.getElementById('loader-container'); // Loader injection point
  
  // Verify elements exist
  if (!adsSection) {
    console.error('❌ Section #ads-cards not found');
    return;
  }
  
  if (!loaderContainer) {
    console.error('❌ Container #loader-container not found');
    return;
  }
  
  //  Initialize loader controller
  const { showLoader, hideLoader } = loaderController(loaderContainer);
  
  //  Listen to custom events
  
  // Event: Start fetching ads
  adsSection.addEventListener('start-fetching-ads', () => {
    console.log('📡 EVENT: start-fetching-ads → Showing loader');
    showLoader();
  });
  
  // Event: Finish fetching ads
  adsSection.addEventListener('finish-fetching-ads', () => {
    console.log('📡 EVENT: finish-fetching-ads → Hiding loader');
    hideLoader();
  });
  
  // Ads empty ( for future use)
  adsSection.addEventListener('ads-empty', () => {
    console.log('📡 EVENT: ads-empty');
    // Future: Show toast notification
  });
  
  // Event: Ads error ( for future use)
  adsSection.addEventListener('ads-error', () => {
    console.log('📡 EVENT: ads-error');
    //  Show error toast
  });
  
  // : Start the application
  console.log('🎬 Starting ads controller...');
  loadAds();
});