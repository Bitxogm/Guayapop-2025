//** AdDetail Model 

import { constants } from '../utils/constants.js';

/**
 * Fetches a single ad by ID with owner info expanded
 * @param {string} adId - ID of the ad to fetch
 * @returns {Promise<Object>} Ad object with user data
 * @throws {Error} If fetching fails or ad not found
 */
export const getAdDetail = async (adId) => {

  try {
    // Build URL with _expand=user to get owner info
    const url = `${constants.apiUrl}/api/products/${adId}?_expand=user`;

    const response = await fetch(url);

    // Check response status
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Ad not found');
      }
      throw new Error(`Failed to load ad (${response.status})`);
    }

    const adDetail = await response.json();
    return adDetail;

  } catch (error) {
    throw error;
  }
};

/**
 * Fetches current authenticated user data
 * @returns {Promise<Object>} User object
 * @throws {Error} If fetching fails or user not authenticated
 */
export const getUserData = async () => {

  // Get token from localStorage
  const token = localStorage.getItem(constants.tokenKey);

  if (!token) {
    throw new Error('User is not authenticated');
  }

  try {
    const url = `${constants.apiUrl}/auth/me`;

    // Fetch with Authorization header
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to load user data (${response.status})`);
    }

    const userData = await response.json();
    return userData;

  } catch (error) {
    throw error;
  }
};

/**
 * Updates an existing ad (PATCH - partial update)
 * @param {string} adId - ID of the ad to update
 * @param {Object} adData - Fields to update
 * @returns {Promise<Object>} Updated ad object
 * @throws {Error} If update fails
 */
export const updateAd = async (adId, adData) => {

  // Get token from localStorage
  const token = localStorage.getItem(constants.tokenKey);

  if (!token) {
    throw new Error('User is not authenticated');
  }

  try {
    const url = `${constants.apiUrl}/api/products/${adId}`;

    // PATCH request with updated data
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(adData)
    });

    if (!response.ok) {
      throw new Error(`Failed to update ad (${response.status})`);
    }

    const updatedAd = await response.json();
    return updatedAd;

  } catch (error) {
    throw error;
  }
};

/**
 * Deletes an ad
 * @param {string} adId - ID of the ad to delete
 * @returns {Promise<void>}
 * @throws {Error} If deletion fails
 */
export const deleteAd = async (adId) => {

  // Get token from localStorage
  const token = localStorage.getItem(constants.tokenKey);

  if (!token) {
    throw new Error('User is not authenticated');
  }

  try {
    const url = `${constants.apiUrl}/api/products/${adId}`;

    // DELETE request
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ad (${response.status})`);
    }

  } catch (error) {
    throw error;
  }
};