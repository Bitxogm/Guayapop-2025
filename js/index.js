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

document.addEventListener('DOMContentLoaded', async () => {

  // Initialize session controller (builds navbar buttons dynamically)
  const sessionContainer = document.getElementById('session-container');
  if (sessionContainer) {
    sessionController(sessionContainer);
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

  // Verify elements exist
  if (!adsSection || !loaderContainer || !toastContainer) {
    return;
  }

  // Initialize controllers
  const { showLoader, hideLoader } = loaderController(loaderContainer);
  const { showToast } = toastController(toastContainer);

  // Event listeners - FETCH events
  adsSection.addEventListener("start-fetching-ads", (event) => {
    showToast(event.detail.message, event.detail.type);
    showLoader();
  });

  adsSection.addEventListener("finish-fetching-ads", () => {
    hideLoader();
  });

  adsSection.addEventListener('finish-load-ads', (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  adsSection.addEventListener('ads-empty', (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  // Event listeners - ERROR events
  adsSection.addEventListener("ads-error", (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  // Event listeners - SEARCH functionality
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      handleSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    });
  }

  if (showAllButton) {
    showAllButton.addEventListener('click', () => {
      showAllAds();
    });
  }

  // Event listeners - FILTER by tag
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tag = button.dataset.tag;
      filterByTag(tag);
    });
  });

  // Event listeners - CLEAR filter
  if (clearFilterButton) {
    clearFilterButton.addEventListener('click', () => {
      clearFilter();
    });
  }

  // Initialize ads controller
  await adsController();
});