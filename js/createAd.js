//** Create Ad Page 


import { createAdController } from './controllers/createAd.controller.js';
import { sessionController } from './controllers/session.controller.js';
import { toastController } from './controllers/toast.controller.js';
import { loaderController } from './controllers/loader.controller.js';
import { constants } from './utils/constants.js'; 

/**
 * ENTRY POINT: Create Ad
 * - Check authentication
 * - Initialize controllers
 * - Listen to custom events
 * - Show toasts and loader
 */

//* Check authentication 
const token = localStorage.getItem(constants.tokenKey);

if (!token) {
  window.location.href = 'index.html';
  throw new Error('User is not authenticated');
}

document.addEventListener('DOMContentLoaded', () => {
  
  //* Initialize session controller (navbar)
  const sessionContainer = document.getElementById('session-container');
  if (sessionContainer) {
    sessionController(sessionContainer);
  }
  
  //* Select elements from DOM
  const createAdForm = document.querySelector('form');
  const toastContainer = document.getElementById('notifications');
  const loaderContainer = document.getElementById('loader-container');
  
  //* Verify elements exist
  if (!createAdForm || !toastContainer || !loaderContainer) {
    return;
  }
  
  //* Initialize controllers
  const { showToast } = toastController(toastContainer);
  const { showLoader, hideLoader } = loaderController(loaderContainer);
  
  //* Event listeners - START (loader + toast)
  createAdForm.addEventListener('start-create-ad', (event) => {
    showToast(event.detail.message, event.detail.type);  
    showLoader();
  });
  
  //* Event listeners - FINISH (hide loader)
  createAdForm.addEventListener('finish-create-ad', () => {
    hideLoader();
  });
  
  //* Event listeners - ERROR (toast)
  createAdForm.addEventListener('create-ad-error', (event) => {
    showToast(event.detail.message, event.detail.type);
  });
  
  //* Event listeners - VALIDATION ERROR (toast)
  createAdForm.addEventListener('create-ad-validation-error', (event) => {
    showToast(event.detail.message, event.detail.type);
  });
  
  //* Event listeners - SUCCESS (toast)
  createAdForm.addEventListener('create-ad-success', (event) => {
    showToast(event.detail.message, event.detail.type);
  });
  
  //* Initialize controller
  createAdController(createAdForm);
});