/**
 * ENTRY POINT: Application orchestrator
 * - Initializes controllers
 * - Listens to custom events
 * - Coordinates everything together
 */

import { loadAds } from './controllers/ads.controller.js';
import { loaderController } from './controllers/loader.controller.js';
import { toastController } from './controllers/toast.controller.js';

console.log('🚀 Application starting...');

//  Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM ready, initializing...');

  //  Get DOM containers
  const adsSection = document.getElementById('ads-cards');          // Event bus (section)
  const loaderContainer = document.getElementById('loader-container'); // Loader injection point
  const toastContainer = document.getElementById('toast-container');   // Toast injection point

  // Verify elements exist
  if (!adsSection) {
    console.error('❌ Section #ads-cards not found');
    return;
  }

  if (!loaderContainer) {
    console.error('❌ Container #loader-container not found');
    return;
  }

  if (!toastContainer) {
    console.error('❌ Container #toast-container not found');
    return;
  }

  // Initialize controllers
  const { showLoader, hideLoader } = loaderController(loaderContainer);
  const { showToast } = toastController(toastContainer);

  // ✅ Listen to custom events

  // Event: Start fetching ads
  adsSection.addEventListener('start-fetching-ads', () => {
    showLoader();
  });

  // Event: Finish fetching ads
  adsSection.addEventListener('finish-fetching-ads', () => {
    hideLoader();
  });

  // Event: Ads empty (for future use)
  adsSection.addEventListener('ads-empty', (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  // Event: Ads error → Show error toast
  adsSection.addEventListener('ads-error', (event) => {

    //  Show toast with message and type from event detail
    showToast(event.detail.message, event.detail.type);
  });

  // Start the application
  console.log('🎬 Starting ads controller...');
  loadAds();
});