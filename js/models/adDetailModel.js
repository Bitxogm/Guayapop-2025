//** AdDetail Model 

import { constants } from '../utils/constants.js';

/**
 * Fetches a single ad by ID with owner info expanded
 * @param {string} adId - ID of the ad to fetch
 * @returns {Promise<Object>} Ad object with user data
 * @throws {Error} If fetching fails or ad not found
 */
export const getAdDetail = async (adId) => {
  console.log(`📡 MODEL: Fetching ad with ID: ${adId}`);

  try {
    //* Build URL with _expand=user to get owner info
    const url = `${constants.apiUrl}/api/products/${adId}?_expand=user`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Ad not found');
      }
      throw new Error(`Failed to load ad (${response.status})`);
    }

    const adDetail = await response.json();
    console.log('✅ MODEL: Ad received successfully:', adDetail);

    return adDetail;

  } catch (error) {
    console.error('❌ MODEL: Error fetching ad:', error);
    throw error;
  }
};

/**
 * Fetches current authenticated user data
 * @returns {Promise<Object>} User object
 * @throws {Error} If fetching fails or user not authenticated
 */
export const getUserData = async () => {
  console.log('📡 MODEL: Fetching current user data');

  const token = localStorage.getItem(constants.tokenKey);
  
  if (!token) {
    throw new Error('User is not authenticated');
  }

  try {
    const url = `${constants.apiUrl}/auth/me`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to load user data (${response.status})`);
    }

    const userData = await response.json();
    console.log('✅ MODEL: User data received successfully:', userData);

    return userData;

  } catch (error) {
    console.error('❌ MODEL: Error fetching user data:', error);
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
  console.log(`📡 MODEL: Updating ad ${adId}`, adData);

  const token = localStorage.getItem(constants.tokenKey);
  
  if (!token) {
    throw new Error('User is not authenticated');
  }

  try {
    const url = `${constants.apiUrl}/api/products/${adId}`;

    const response = await fetch(url, {
      method: 'PATCH',  // ✅ PATCH para actualización parcial
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
    console.log('✅ MODEL: Ad updated successfully:', updatedAd);

    return updatedAd;

  } catch (error) {
    console.error('❌ MODEL: Error updating ad:', error);
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
  console.log(`📡 MODEL: Deleting ad ${adId}`);

  const token = localStorage.getItem(constants.tokenKey);
  
  if (!token) {
    throw new Error('User is not authenticated');
    
  }

  try {
    const url = `${constants.apiUrl}/api/products/${adId}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ad (${response.status})`);
    }

    console.log('✅ MODEL: Ad deleted successfully');

  } catch (error) {
    console.error('❌ MODEL: Error deleting ad:', error);
    throw error;
  }
};