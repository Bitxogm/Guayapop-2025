
//* index.js - Entry Point for Home Page

/**
 * ENTRY POINT: Home page (ads listing)
 * - Initialize session controller (build navbar buttons dynamically)
 * - Initialize ads controller
 * - Handle loader and toasts
 */

import { adsController, handleSearch, showAllAds, filterByTag, clearFilter } from "./controllers/ads.controller.js";
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
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
  const showAllButton = document.getElementById('show-all-button');
  const filterButtons = document.querySelectorAll('.filter-tag-btn');
  const clearFilterButton = document.getElementById('clear-filter-btn');

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

  adsSection.addEventListener('finish-load-ads', (event) => {
    console.log('📡 EVENT: finish-load-ads ');
    showToast(event.detail.message, event.detail.type);
  });

  adsSection.addEventListener('ads-empty', (event) => {
    console.log('📡 EVENT: ads-empty');
    showToast(event.detail.message, event.detail.type);
  })

  // Listen to error events
  adsSection.addEventListener("ads-error", (event) => {
    console.log('📡 EVENT: ads-error');
    showToast(event.detail.message, event.detail.type);
  });

  // Search functionality
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      console.log('🔍 Search button clicked');
      handleSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        console.log('🔍 Enter pressed in search');
        handleSearch();
      }
    });
  }

  if (showAllButton) {
    showAllButton.addEventListener('click', () => {
      console.log('🔄 Show all ads clicked');
      showAllAds();
    });
  }

  // Filter by tag buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tag = button.dataset.tag;
      console.log('🏷️ Filter button clicked:', tag);
      filterByTag(tag);
    });
  });

// Çlear filter button
  if (clearFilterButton) {
    clearFilterButton.addEventListener('click', () => {
      console.log('🗑️ Clear filter clicked');
      clearFilter();
    });
  }




  // Initialize ads controller
  console.log('🎮 Calling adsController...');
  await adsController();

  console.log('✅ Index page initialized');
});