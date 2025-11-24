//** Session Controller */

import { constants } from '../utils/constants.js';

/**
 * Session Controller - Builds navbar buttons dynamically
 * @param {HTMLElement} sessionContainer - Container where buttons will be rendered
 */
export const sessionController = (sessionContainer) => {
  console.log('🎮 SESSION CONTROLLER: Initializing...');

  //* Check if user is authenticated
  const token = localStorage.getItem(constants.tokenKey);
  const isAuthenticated = !!token;

  //* Clear container
  sessionContainer.innerHTML = '';

  if (isAuthenticated) {
    //* User is logged in → Show greeting + Create Ad + Logout buttons

    //* Get username from localstorage
    const username = localStorage.getItem('username') || 'user@example.com';
    const shortName = username.split('@')[0];

    //* Greeting text
    const greetingSpan = document.createElement('span');
    greetingSpan.classList.add('text-success', 'me-5', 'fw-normal', 'fs-4');
    greetingSpan.textContent = ` 👋🏻 Hello, ${shortName} !`;

    //* Create Ad button
    const createAdButton = document.createElement('a');
    createAdButton.href = 'create-ad.html';
    createAdButton.classList.add('btn', 'btn-primary', 'btn-sm', 'me-2');
    createAdButton.textContent = '➕ Create Ad';

    //* Logout button
    const logoutButton = document.createElement('button');
    logoutButton.classList.add('btn', 'btn-outline-danger', 'btn-sm');
    logoutButton.textContent = '🚪 Logout';

    //* Logout event listener
    logoutButton.addEventListener('click', () => {
      console.log('🚪 Logging out...');

      //* Clear token
      localStorage.removeItem(constants.tokenKey);
      localStorage.removeItem('username');


      //* Redirect to home
      window.location.href = 'index.html';
    });

    //* Append all elements
    sessionContainer.appendChild(greetingSpan);
    sessionContainer.appendChild(createAdButton);
    sessionContainer.appendChild(logoutButton);

  } else {
    //* User is NOT logged in → Show Login + Signup buttons

    const loginButton = document.createElement('a');
    loginButton.href = 'login.html';
    loginButton.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'me-2');
    loginButton.textContent = '🔐 Login';

    const signupButton = document.createElement('a');
    signupButton.href = 'signup.html';
    signupButton.classList.add('btn', 'btn-primary', 'btn-sm');
    signupButton.textContent = '📝 Sign Up';

    sessionContainer.appendChild(loginButton);
    sessionContainer.appendChild(signupButton);
  }

  console.log('🔐 User authenticated:', isAuthenticated);
  console.log('✅ SESSION CONTROLLER: Initialized');
};