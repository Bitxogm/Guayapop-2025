//* signup.js - Entry Point

/**
 * ENTRY POINT: Signup page
 * - Initialize controllers
 * - Listen to custom events
 * - Show toasts and loader
 */

import { signupController } from "./controllers/signup.controller.js";
import { toastController } from "./controllers/toast.controller.js";
import { loaderController } from "./controllers/loader.controller.js";

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

  // Select elements from DOM
  const signupForm = document.querySelector("form");
  const toastContainer = document.getElementById("notifications");
  const loaderContainer = document.getElementById("loader-container");

  // Verify elements exist
  if (!signupForm || !toastContainer || !loaderContainer) {
    return;
  }

  // Initialize controllers
  const { showToast } = toastController(toastContainer);
  const { showLoader, hideLoader } = loaderController(loaderContainer);

  // Event listeners - LOADER events
  signupForm.addEventListener("start-signup", () => {
    showLoader();
  });

  signupForm.addEventListener("finish-signup", () => {
    hideLoader();
  });

  // Event listeners - TOAST/ERROR events
  signupForm.addEventListener("signup-validation-error", (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  signupForm.addEventListener("signup-success", (event) => {
    showToast(event.detail.message, event.detail.type);
  });

  // Initialize controller
  signupController(signupForm);
});