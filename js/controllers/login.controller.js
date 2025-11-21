//* ============================================
//* login.controller.js
//* ============================================

/**
 * CONTROLLER: Login
 * Handles form validation and user authentication
 */

import { constants } from "../utils/constants.js";
import { loginUser } from "../models/loginModel.js";

export const loginController = (loginForm) => {  

  // Event listener for form submission
  loginForm.addEventListener("submit", async (event) => {
    // preventDefault form submission behavior
    event.preventDefault();

    // Initialize an array to store errors
    const errors = [];

    // Get email and password values
    const email = loginForm.querySelector("#email").value;
    const password = loginForm.querySelector("#password").value;

    // Select email field and define regex for validation
    const emailRegExp = new RegExp(constants.mailRegExp);

    // Validate email format
    if (!emailRegExp.test(email)) {  
      const errorEvent = new CustomEvent("login-validation-error", {
        detail: {
          message: "Invalid email format.",
          type: "error"
        }
      });
      errors.push(errorEvent);
    }

    // If there are validation errors, dispatch them and exit
    if (errors.length > 0) {
      errors.forEach(errorEvent => {
        loginForm.dispatchEvent(errorEvent);
      });
      return;
    }

    // Call loginUser from the model if no validation errors
    try {
      // Dispatch START loader event
      const startEvent = new CustomEvent("start-login");
      loginForm.dispatchEvent(startEvent);

      const token = await loginUser(email, password);

      // Store token in localStorage
      localStorage.setItem(constants.tokenKey, token);
      console.log('✅ Token stored in localStorage', token);

      // If login is successful, dispatch success event
      const successEvent = new CustomEvent("login-success", {
        detail: {
          message: "Login successful! Redirecting...",
          type: "success"
        }
      });
      loginForm.dispatchEvent(successEvent);

      // Redirect after a delay
      setTimeout(() => {
        console.log('🔄 Redirecting to home...');
        window.location.href = "/";
      }, 3000);

    } catch (error) {
      // If an error occurs, dispatch validation error event
      const errorEvent = new CustomEvent("login-validation-error", {
        detail: {
          message: error.message,
          type: "error"
        }
      });
      loginForm.dispatchEvent(errorEvent);
  
    } finally {
      // Dispatch END loader event
      const finishEvent = new CustomEvent("finish-login");  
      loginForm.dispatchEvent(finishEvent);
    }
  });

};