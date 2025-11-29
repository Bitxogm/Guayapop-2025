//* login.js 

/**
 * ENTRY POINT: Login page
 * - Initialize controllers
 * - Listen to custom events
 * - Show toasts and loader
 */

import { loginController } from "./controllers/login.controller.js";
import { toastController } from "./controllers/toast.controller.js";
import { loaderController } from "./controllers/loader.controller.js";

// Used to wait for DOM to be ready , for preventDefault errors
document.addEventListener('DOMContentLoaded', () => {
  
  // Select elements from DOM
  const loginForm = document.querySelector("form");
  const toastContainer = document.getElementById("notifications");
  const loaderContainer = document.getElementById("loader-container");

  // Verify elements exist
  if (!loginForm || !toastContainer || !loaderContainer) {
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
  loginController(loginForm);
});