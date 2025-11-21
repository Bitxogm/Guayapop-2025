//** Create Ad Model */

import { constants } from '../utils/constants.js';

/**
 * Creates a new ad by sending ad data to the backend API
 * @param {Object} adData - The ad data object
 * @param {string} adData.name - Product name
 * @param {string} adData.description - Product description
 * @param {number} adData.price - Product price
 * @param {string} adData.type - Ad type ('buy' or 'sell')
 * @param {string} [adData.image] - Optional image URL
 * @param {string[]} [adData.tags] - Optional tags array
 * @returns {Promise<Object>} Created ad with id, userId, createdAt, etc.
 * @throws {Error} If ad creation fails
 */

export const createAd = async (adData) => {

  // Get JWT token from localStorage
  const token = localStorage.getItem(constants.tokenKey);
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    const url = `${constants.apiUrl}/api/products/`;
    console.log('🔄 MODEL: Creating add...');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include JWT token in Authorization header
      },
      body: JSON.stringify({
        name: adData.name,
        description: adData.description,
        price: adData.price,
        type: adData.type,
        image: adData.image || "https://placehold.co/800x400?text=No+Image",
        tags: adData.tags || []
      })
    });

    // CHECK response.ok BEFORE parsing JSON
    if (!response.ok) {

      let errorMessage = 'Ad creation failed';

      try {
        const data = await response.json();
        errorMessage = data.message || 'Invalid credentials';
      } catch (parseError) {
        errorMessage = `Server error (${response.status} ${response.statusText})`;
      }

      throw new Error(errorMessage, { cause: 'server' });
    }

    //Response OK - safe to parse JSON
    const data = await response.json();
    console.log('✅ MODEL: Create ad successful, token received');

    return data;

  } catch (error) {

    // Distinguish between different error types
    if (error.cause === 'server') {
      throw error;
    }

    // Network error
    throw new Error('Network error: Unable to reach authentication server');
  }
}