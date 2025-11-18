import { sigunupController } from "./controllers/signup.controller.js";
import { toastController } from "./controllers/toast.controller.js";

// Select  elements from DOM
const signupForm = document.querySelector("form");
const toastContainer = document.getElementById("notifications");

const {showToast} = toastController(toastContainer);

signupForm.addEventListener("signup-validation-error", (event) => {
  showToast(event.detail.message, event.detail.type);
});

signupForm.addEventListener("signup-success", (event) => {
  showToast(event.detail.message, event.detail.type);
});

// Initialize controller

sigunupController(signupForm);