//** Ad Detail Page */

/**
 * ENTRY POINT: Ad Detail
 * - Get ad ID from URL params
 * - Initialize controllers
 * - Listen to custom events
 * - Show toasts and loader
 */

import { adDetailController } from './controllers/adDetail.controller.js';
import { sessionController } from './controllers/session.controller.js';
import { loaderController } from './controllers/loader.controller.js';
import { toastController } from './controllers/toast.controller.js';

// Get ad ID from URL params
const urlParams = new URLSearchParams(window.location.search);
const adId = urlParams.get('id');

if (!adId) {
  window.location.href = 'index.html';
  throw new Error('Ad ID is required');
}

// Initialize page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {

  // Initialize session controller (navbar)
  const sessionContainer = document.getElementById('session-container');
  if (sessionContainer) {
    sessionController(sessionContainer);
  }

  // Get DOM elements
  const adDetailContainer = document.getElementById('ad-detail-container');
  const adDetailSection = document.getElementById('ad-detail');
  const loaderContainer = document.getElementById('loader-container');
  const toastContainer = document.getElementById('notifications');

  // Verify elements exist
  if (!adDetailContainer || !adDetailSection || !loaderContainer || !toastContainer) {
    return;
  }

  // Initialize controllers
  const { showLoader, hideLoader } = loaderController(loaderContainer);
  const { showToast } = toastController(toastContainer);

  // Event listeners for loader events
  adDetailSection.addEventListener('start-fetching-ad-detail', (event) => {
    showToast(event.detail.message, event.detail.type);
    showLoader();
  });

  adDetailSection.addEventListener('finish-fetching-ad-detail', () => {
    hideLoader();
  });

  adDetailSection.addEventListener('ad-detail-success', (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  // Event listeners for error events
  adDetailSection.addEventListener('ad-detail-error', (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  // Event listeners for empty/404 events
  adDetailSection.addEventListener('ad-not-found', (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  // DELETE events
  adDetailSection.addEventListener('start-deleting-ad', (event) => {
    showToast(event.detail.message, event.detail.type);
    showLoader();
  });

  adDetailSection.addEventListener('finish-deleting-ad', () => {
    hideLoader();
  });

  adDetailSection.addEventListener('delete-ad-error', (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  adDetailSection.addEventListener('delete-ad-success', (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  // Initialize ad detail controller
  adDetailController(adDetailContainer, adId);
});