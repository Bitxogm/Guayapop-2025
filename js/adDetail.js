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

console.log('🚀 Ad Detail page starting...');

//* ============================================
//* Get ad ID from URL params
//* ============================================
const urlParams = new URLSearchParams(window.location.search);
const adId = urlParams.get('id');

if (!adId) {
  console.error('❌ No ad ID in URL');
  console.log('🔄 Redirecting to home...');
  window.location.href = 'index.html';
  throw new Error('Ad ID is required');
}

console.log(`✅ Ad ID from URL: ${adId}`);

//* ============================================
//* Initialize page when DOM is ready
//* ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM ready, initializing ad-detail page...');

  //* Initialize session controller (navbar)
  const sessionContainer = document.getElementById('session-container');
  if (sessionContainer) {
    sessionController(sessionContainer);
  }

  //* Get DOM elements
  const adDetailContainer = document.getElementById('ad-detail-container');
  const adDetailSection = document.getElementById('ad-detail');
  const loaderContainer = document.getElementById('loader-container');
  const toastContainer = document.getElementById('notifications');

  //* Verify elements exist
  if (!adDetailContainer) {
    console.error('❌ Ad detail container not found');
    return;
  }

  if (!adDetailSection) {
    console.error('❌ Ad detail section not found');
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

  //* Initialize controllers
  const { showLoader, hideLoader } = loaderController(loaderContainer);
  const { showToast } = toastController(toastContainer);

  //* Event listeners for loader events
  adDetailSection.addEventListener('start-fetching-ad-detail', (event) => {
    console.log('📡 EVENT: start-fetching-ad-detail → Showing loader');
    showToast(event.detail.message, event.detail.type);
    showLoader();
  });

  adDetailSection.addEventListener('finish-fetching-ad-detail', () => {
    console.log('📡 EVENT: finish-fetching-ad-detail → Hiding loader');
    hideLoader();
  });

  //* Event listeners for error events
  adDetailSection.addEventListener('ad-detail-error', (event) => {
    console.log('📡 EVENT: ad-detail-error');
    showToast(event.detail.message, event.detail.type);
  });

  //* Event listeners for empty/404 events
  adDetailSection.addEventListener('ad-not-found', (event) => {
    console.log('📡 EVENT: ad-not-found');
    showToast(event.detail.message, event.detail.type);
  });

  //* DELETE events
  adDetailSection.addEventListener('start-deleting-ad', (event) => {
    console.log('📡 EVENT: start-deleting-ad');
    showToast(event.detail.message, event.detail.type);
    showLoader();
  });

  adDetailSection.addEventListener('finish-deleting-ad', () => {
    console.log('📡 EVENT: finish-deleting-ad');
    hideLoader();
  });

  adDetailSection.addEventListener('delete-ad-error', (event) => {
    console.log('📡 EVENT: delete-ad-error');
    showToast(event.detail.message, event.detail.type);
  });

  //* Initialize ad detail controller
  console.log('🎮 Calling adDetailController...');
  adDetailController(adDetailContainer, adId);

  console.log('✅ Ad-detail page initialized');
});