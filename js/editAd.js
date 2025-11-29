//** Edit Ad Page - Entry point */

/**
 * ENTRY POINT: Edit Ad
 * - Check authentication
 * - Get ad ID from URL
 * - Initialize controllers
 * - Listen to custom events
 * - Show toasts and loader
 */

import { editAdController } from './controllers/editAd.controller.js';
import { sessionController } from './controllers/session.controller.js';
import { loaderController } from './controllers/loader.controller.js';
import { toastController } from './controllers/toast.controller.js';
import { constants } from './utils/constants.js';

// Check authentication BEFORE anything else
const token = localStorage.getItem(constants.tokenKey);
if (!token) {
  alert('You must be logged in to edit ads');
  window.location.href = 'login.html';
  throw new Error('User is not authenticated');
}

// Get ad ID from URL params
const urlParams = new URLSearchParams(window.location.search);
const adId = urlParams.get('id');

if (!adId) {
  window.location.href = 'index.html';
  throw new Error('Ad ID is required');
}

// Initialize page when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {

  // Initialize session controller (navbar)
  const sessionContainer = document.getElementById('session-container');
  if (sessionContainer) {
    sessionController(sessionContainer);
  }

  // Get DOM elements
  const editAdSection = document.getElementById('edit-ad-section');
  const loaderContainer = document.getElementById('loader-container');
  const toastContainer = document.getElementById('notifications');

  // Verify elements exist
  if (!editAdSection || !loaderContainer || !toastContainer) {
    return;
  }

  // Initialize controllers
  const { showLoader, hideLoader } = loaderController(loaderContainer);
  const { showToast } = toastController(toastContainer);

  // Event listeners - FETCH events
  editAdSection.addEventListener('start-fetching-ad', (event) => {
    showToast(event.detail.message, event.detail.type);
    showLoader();
  });

  editAdSection.addEventListener('finish-fetching-ad', () => {
    hideLoader();
  });

  editAdSection.addEventListener('fetch-ad-success', (event) => {  
  showToast(event.detail.message, event.detail.type);
});

  editAdSection.addEventListener('ad-not-found', (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  // Event listeners - UPDATE events
  editAdSection.addEventListener('start-updating-ad', (event) => {
    showToast(event.detail.message, event.detail.type);
    showLoader();
  });

  editAdSection.addEventListener('finish-updating-ad', () => {
    hideLoader();
  });

  editAdSection.addEventListener('update-ad-success', (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  editAdSection.addEventListener('update-ad-error', (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  // Initialize edit ad controller
  await editAdController(adId);
});