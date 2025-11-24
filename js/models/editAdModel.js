//** Edit Ad Model - API interactions for updating ads */

import { constants } from '../utils/constants.js';

/**
 * Fetches ad details for editing
 * 
 * @async
 * @param {string} adId - Ad ID to fetch
 * @returns {Promise<Object>} Ad object
 * @throws {Error} If ad not found or network error
 */
export async function getAdForEdit(adId) {
  console.log('📡 MODEL: Fetching ad for edit:', adId);
  
  const url = `${constants.apiUrl}/api/products/${adId}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Ad not found');
    }
    throw new Error('Failed to fetch ad');
  }
  
  const ad = await response.json();
  console.log('✅ MODEL: Ad fetched successfully');
  return ad;
}

/**
 * Updates an existing ad
 * 
 * @async
 * @param {string} adId - Ad ID to update
 * @param {Object} adData - Updated ad data
 * @param {string} adData.name - Ad name
 * @param {string} adData.description - Ad description
 * @param {number} adData.price - Ad price
 * @param {string} adData.type - Ad type ('sell' or 'buy')
 * @param {string} adData.image - Ad image URL
 * @param {Array<string>} adData.tags - Ad tags
 * @returns {Promise<Object>} Updated ad object
 * @throws {Error} If not authenticated or update fails
 */
export async function updateAd(adId, adData) {
  console.log('📡 MODEL: Updating ad:', adId);
  
  const token = localStorage.getItem(constants.tokenKey);
  
  if (!token) {
    throw new Error('You must be logged in to edit ads');
  }

  const url = `${constants.apiUrl}/api/products/${adId}`;
  
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(adData)
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('You are not authorized to edit this ad');
    }
    throw new Error('Failed to update ad');
  }

  const updatedAd = await response.json();
  console.log('✅ MODEL: Ad updated successfully');
  return updatedAd;
}