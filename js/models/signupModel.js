//* signupModel.js

import { constants } from '../utils/constants.js';

/**
 * Creates a new user account in the system
 * 
 * @param {string} email - User's email address (used as username)
 * @param {string} password - User's password (min 8 characters)
 * @returns {Promise<void>} Resolves if user created successfully
 * @throws {Error} Throws error with descriptive message if registration fails
 */
export const createUser = async (email, password) => {

  try {

    // Send POST request to registration endpoint
    const response = await fetch(`${constants.apiUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,  // Backend expects 'username' field
        password
      })
    });

    // Check response before parsing JSON
    if (!response.ok) {

      // Try to parse error message from backend
      let errorMessage = 'Registration failed';

      try {
        const data = await response.json();
        errorMessage = data.message || errorMessage;
      } catch (parseError) {
        // Backend didn't return JSON 
        errorMessage = `Server error (${response.status} ${response.statusText})`;
      }

      throw new Error(errorMessage, { cause: 'server' });
    }

    // Response OK - user created successfully (no need to parse body)

  } catch (error) {

    // Distinguish between different error types
    if (error.cause === 'server') {
      // Backend error (already has descriptive message)
      throw error;
    }

    // Network error
    throw new Error('Could not connect to server. Please check your connection and try again.');
  }
};