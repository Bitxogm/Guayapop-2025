//** Create Ad Page */

/**
 * ENTRY POINT: Create
 * - Initialize controllers
 * - Listen to custom events
 * - Show toasts and loader
 */

import { createAdController } from './controllers/createAd.controller.js';
import { toastController } from './controllers/toast.controller.js';
import { loaderController } from './controllers/loader.controller.js';

// Select elements from DOM
const createAdForm = document.querySelector('form');
const toastContainer = document.getElementById('notifications');
const loaderContainer = document.getElementById('loader-container');

// Initialize controllers
const { showToast } = toastController(toastContainer);
const { showLoader, hideLoader } = loaderController(loaderContainer);

// Event listeners for custom events (loader events)
createAdForm.addEventListener('start-create-ad', () => {
  showLoader();
});

createAdForm.addEventListener('finish-create-ad', () =>  {
  hideLoader();
});

// Event listeners for custom events (toast/errors events)
createAdForm.addEventListener('create-ad-validation-error', (event) => {
  showToast(event.detail.message, event.detail.type);
});

createAdForm.addEventListener('create-ad-success', (event) => {
  showToast(event.detail.message, event.detail.type);
});

// Initialize controller
console.log('🎮 Calling createAdController...');

createAdController(createAdForm)