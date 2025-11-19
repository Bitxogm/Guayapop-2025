//* ============================================
//* login.js - Entry Point
//* ============================================

/**
 * ENTRY POINT: Login page
 * - Initialize controllers
 * - Listen to custom events
 * - Show toasts and loader
 */

import { loginController } from "./controllers/login.controller.js";
import { toastController } from "./controllers/toast.controller.js";
import { loaderController } from "./controllers/loader.controller.js";

console.log('🚀 Login page starting...');

// Used to wait for DOM to be ready , for preventDefault errors
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM ready, initializing login...');
  
  // Select elements from DOM
  const loginForm = document.querySelector("form");
  const toastContainer = document.getElementById("notifications");
  const loaderContainer = document.getElementById("loader-container");

  // Verify elements exist
  if (!loginForm) {
    console.error('❌ Form not found');
    return;
  }

  if (!toastContainer) {
    console.error('❌ Toast container not found');
    return;
  }

  if (!loaderContainer) {
    console.error('❌ Loader container not found');
    return;
  }

  // Initialize controllers
  const { showToast } = toastController(toastContainer);
  const { showLoader, hideLoader } = loaderController(loaderContainer);

  // Event listeners on LOGINFORM
  loginForm.addEventListener("start-login", () => {
    showLoader();
  });

  loginForm.addEventListener("finish-login", () => {
    hideLoader();
  });

  // Event listeners for error/success
  loginForm.addEventListener("login-validation-error", (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  loginForm.addEventListener("login-success", (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  // Initialize controller
  console.log('🎮 Initializing login controller...');
  loginController(loginForm);

  console.log('✅ Login page initialized');
});