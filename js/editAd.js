//** Edit Ad Page - Entry point */


import { editAdController } from './controllers/editAd.controller.js';
import { sessionController } from './controllers/session.controller.js';
import { loaderController } from './controllers/loader.controller.js';
import { toastController } from './controllers/toast.controller.js';

console.log('🚀 Edit Ad page starting...');

//* Get ad ID from URL params

const urlParams = new URLSearchParams(window.location.search);
const adId = urlParams.get('id');

if (!adId) {
  console.error('❌ No ad ID in URL');
  console.log('🔄 Redirecting to home...');
  window.location.href = 'index.html';
  throw new Error('Ad ID is required');
}

console.log(`✅ Ad ID from URL: ${adId}`);

//* Initialize page when DOM is ready

document.addEventListener('DOMContentLoaded', async () => {
  console.log('✅ DOM ready, initializing edit-ad page...');

  //* Initialize session controller (navbar)
  const sessionContainer = document.getElementById('session-container');
  if (sessionContainer) {
    sessionController(sessionContainer);
  }

  //* Get DOM elements
  const editAdSection = document.getElementById('edit-ad-section');
  const loaderContainer = document.getElementById('loader-container');
  const toastContainer = document.getElementById('notifications');

  //* Verify elements exist
  if (!editAdSection || !loaderContainer || !toastContainer) {
    console.error('❌ Required elements not found');
    return;
  }

  //* Initialize controllers
  const { showLoader, hideLoader } = loaderController(loaderContainer);
  const { showToast } = toastController(toastContainer);

  //* Event listeners - FETCH events

  editAdSection.addEventListener('start-fetching-ad', (event) => {
    console.log('📡 EVENT: start-fetching-ad');
    showToast(event.detail.message, event.detail.type);
    showLoader();
  });

  editAdSection.addEventListener('finish-fetching-ad', () => {
    console.log('📡 EVENT: finish-fetching-ad');
    hideLoader();
  });

  addEventListener('ad-not-found', (event) => {
    console.log('📡 EVENT: ad-not-found');
    showToast(event.detail.message, event.detail.type);
  });

  //* Event listeners - UPDATE events

  editAdSection.addEventListener('start-updating-ad', (event) => {
    console.log('📡 EVENT: start-updating-ad');
    showToast(event.detail.message, event.detail.type);
    showLoader();
  });

  editAdSection.addEventListener('finish-updating-ad', () => {
    console.log('📡 EVENT: finish-updating-ad');
    hideLoader();
  });

  editAdSection.addEventListener('update-ad-success', (event) => {
    console.log('📡 EVENT: update-ad-success');
    showToast(event.detail.message, event.detail.type);
  });

  editAdSection.addEventListener('update-ad-error', (event) => {
    console.log('📡 EVENT: update-ad-error');
    showToast(event.detail.message, event.detail.type);
  });

  //* Initialize edit ad controller

  console.log('🎮 Calling editAdController...');
  await editAdController(adId);

  console.log('✅ Edit-ad page initialized');
});