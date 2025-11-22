//** */ Ads Model*/

// adsModel.js
// Model to fetch ads data from the backend API

import { constants } from '../utils/constants.js';

/**
 * Fetches ads from the backend API
 * @returns {Promise<Array>} Array of ad objects
 * @throws {Error} If fetching fails
 */

export const getAds = async () => {

  let ads = [];

  try {
    //* Build URL with constants
    const url = `${constants.apiUrl}/api/products/?_sort=createdAt&_order=desc`;

    //* Fetch ads from backend
    const response = await fetch(url);

    // If response is not OK, throw error
    if (!response.ok ) {
      if(response.status === 404) {
        throw new Error('No ads found');
      }
      throw new Error(`Failed to load ads (${response.status})`);
    }

    // Parse JSON
    ads = await response.json();

    console.log(`✅ MODEL: Received ${ads.length} ads from sparret`)

  } catch (error) {
    // Throw error to controller
    throw new Error('☢️ MODEL: Could not load ads: ' + error.message);
  }

  return ads;
};