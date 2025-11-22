//* ============================================
//* index.js - Entry Point for Home Page
//* ============================================

/**
 * ENTRY POINT: Home page (ads listing)
 * - Initialize session controller (build navbar buttons dynamically)
 * - Initialize ads controller
 * - Handle loader and toasts
 */

import { adsController } from "./controllers/ads.controller.js";
import { loaderController } from "./controllers/loader.controller.js";
import { toastController } from "./controllers/toast.controller.js";
import { sessionController } from "./controllers/session.controller.js";

console.log('🚀 Index page starting...');

document.addEventListener('DOMContentLoaded', async () => {
  console.log('✅ DOM ready, initializing index page...');
  
  // ✅ Initialize session controller (builds navbar buttons dynamically)
  const sessionContainer = document.getElementById('session-container');
  if (sessionContainer) {
    sessionController(sessionContainer);
  } else {
    console.error('❌ Session container not found');
  }
  
  // Get DOM elements
  const adsSection = document.getElementById("ads-cards");
  const loaderContainer = document.getElementById("loader-container");
  
  // Try both possible IDs for toast container
  let toastContainer = document.getElementById("notifications");
  if (!toastContainer) {
    toastContainer = document.getElementById("toast-container");
  }
  
  // Verify elements exist
  if (!adsSection) {
    console.error('❌ Ads section #ads-cards not found');
    return;
  }
  
  if (!loaderContainer) {
    console.error('❌ Loader container not found');
    return;
  }
  
  if (!toastContainer) {
    console.error('❌ Toast container not found');
    return;
  }
  
  // Initialize controllers
  const { showLoader, hideLoader } = loaderController(loaderContainer);
  const { showToast } = toastController(toastContainer);
  
  // Event listeners  
  // Listen to loader events
  adsSection.addEventListener("start-fetching-ads", (event) => {
    console.log('📡 EVENT: start-fetching-ads → Showing loader');
    showToast(event.detail.message, event.detail.type); 
    showLoader();
  });
  
  adsSection.addEventListener("finish-fetching-ads", () => {
    console.log('📡 EVENT: finish-fetching-ads → Hiding loader');
    hideLoader();
  });
  
  // Listen to error events
  adsSection.addEventListener("ads-error", (event) => {
    console.log('📡 EVENT: ads-error');
    showToast(event.detail.message, event.detail.type);
  });
  
  // Listen to empty state events
  // adsSection.addEventListener("ads-empty", (event) => {
  //   console.log('📡 EVENT: ads-empty');
  //   showToast(event.detail.message, event.detail.type);
  // });
  
  // Initialize ads controller
  console.log('🎮 Calling adsController...');
  await adsController();
  
  console.log('✅ Index page initialized');
});