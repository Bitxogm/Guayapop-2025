import { buildToast } from "../views/toast.view.js";

/**
 * Toast notification controller
 * @param {HTMLElement} toastContainer - Container where toasts will be rendered
 * @returns {Object} Object with showToast function
 */

export function toastController(toastContainer) {

  /**
   * Shows a toast notification
   * @param {string} message - Message to display
   * @param {string} type - Toast type (success, error, info, warning)
   */
  const showToast = (message, type = "success") => {
    // Create toast element
    const newToast = document.createElement("div");
    newToast.innerHTML = buildToast(message, type);

    // Add close button listener
    newToast.querySelector("button").addEventListener("click", () => {
      newToast.remove();
    });

    // Append toast to container
    toastContainer.appendChild(newToast);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      newToast.remove();
    }, 3000);
  }

  return {
    showToast
  }
}