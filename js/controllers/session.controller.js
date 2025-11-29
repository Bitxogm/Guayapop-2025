//** Session Controller */

import { constants } from '../utils/constants.js';
import { buildToast } from '../views/toast.view.js';
import { buildAuthenticatedUserSession, buildUnauthenticatedUserSession } from '../views/session.view.js';

/**
 * Session Controller - Manages navbar state
 * @param {HTMLElement} sessionContainer - Container where navbar will be rendered
 */
export const sessionController = (sessionContainer) => {

  // Check if user is authenticated
  const token = localStorage.getItem(constants.tokenKey);
  const isAuthenticated = !!token;

  // Clear container
  sessionContainer.innerHTML = '';

  if (isAuthenticated) {
    // Get username from localStorage
    const username = localStorage.getItem('username') || 'user@example.com';
    sessionContainer.innerHTML = buildAuthenticatedUserSession(username);

    // Add logout functionality
    const logoutBtn = document.getElementById('closeSession');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', handleLogout);
    }

  } else {
    // Build guest nav
    sessionContainer.innerHTML = buildUnauthenticatedUserSession();
  }
};

/**
 * Handles user logout
 */
async function handleLogout() {
  // Show logout toast
  const toastContainer = document.getElementById('notifications');
  if (toastContainer) {
    const toastDiv = document.createElement('div');
    toastDiv.innerHTML = buildToast('👋 Logging out...', 'info');
    toastContainer.appendChild(toastDiv);

    setTimeout(() => {
      toastDiv.remove();
    }, 3000);
  }

  // Clear tokens
  localStorage.removeItem(constants.tokenKey);
  localStorage.removeItem(constants.username);

  // Wait briefly for user to see toast
  await new Promise(resolve => setTimeout(resolve, 800));

  // Redirect to home
  window.location.href = 'index.html';
}