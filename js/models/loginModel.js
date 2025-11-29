//* loginModel.js

import { constants } from '../utils/constants.js';

/**
 * Authenticates user and returns JWT token
 * @param {string} email - User's email (username)
 * @param {string} password - User's password
 * @returns {Promise<string>} JWT access token
 * @throws {Error} If authentication fails
 */
export const loginUser = async (email, password) => {
  try {
    
    // POST request to login endpoint
    const response = await fetch(`${constants.apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password
      })
    });

    // Check response before parsing JSON
    if (!response.ok) {
      
      let errorMessage = 'Login failed';
      
      try {
        const data = await response.json();
        errorMessage = data.message || 'Invalid credentials';
      } catch (parseError) {
        errorMessage = `Server error (${response.status} ${response.statusText})`;
      }
      
      throw new Error(errorMessage, { cause: 'server' });
    }

    // Response OK - safe to parse JSON
    const data = await response.json();
    return data.accessToken;

  } catch (error) {
    
    // Distinguish between different error types
    if (error.cause === 'server') {
      throw error;
    }
    
    // Network error
    throw new Error('Network error: Unable to reach authentication server');
  }
};