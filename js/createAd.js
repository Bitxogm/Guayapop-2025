//** Create Ad Page */

import { createAdController } from './controllers/createAd.controller.js';
import { sessionController } from './controllers/session.controller.js';
import { toastController } from './controllers/toast.controller.js';
import { loaderController } from './controllers/loader.controller.js';
import { constants } from '../utils/constants.js'; 

console.log('🚀 Create Ad page starting...');

//* PROTECTION: Check authentication FIRST
const token = localStorage.getItem(constants.tokenKey);

if (!token) {
  console.log('⚠️ USER NOT AUTHENTICATED');
  console.log('🔄 Redirecting to home...');
  window.location.href = 'index.html';
  throw new Error('Authentication required');
}

console.log('✅ User authenticated, loading create-ad page');

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM ready, initializing create-ad page...');
  
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
    console.error('❌ Required elements not found');
    return;
  }
  
  //* Initialize controllers
  const { showToast } = toastController(toastContainer);
  const { showLoader, hideLoader } = loaderController(loaderContainer);
  
  //* Event listeners for loader events
  createAdForm.addEventListener('start-create-ad', () => {
    console.log('📡 EVENT: start-create-ad');
    showLoader();
  });
  
  createAdForm.addEventListener('finish-create-ad', () => {
    console.log('📡 EVENT: finish-create-ad');
    hideLoader();
  });
  
  //* Event listeners for toast/error events
  createAdForm.addEventListener('create-ad-validation-error', (event) => {
    console.log('📡 EVENT: create-ad-validation-error');
    showToast(event.detail.message, event.detail.type);
  });
  
  createAdForm.addEventListener('create-ad-success', (event) => {
    console.log('📡 EVENT: create-ad-success');
    showToast(event.detail.message, event.detail.type);
  });
  
  //* Initialize controller
  console.log('🎮 Calling createAdController...');
  createAdController(createAdForm);
  
  console.log('✅ Create-ad page initialized');
});