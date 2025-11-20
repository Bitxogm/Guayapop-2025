//** */ Ads Model*/

// adsModel.js
// Model to fetch ads data from the backend API

/**
 * Fetches ads from the backend API
 * @returns {Promise<Array>} Array of ad objects
 * @throws {Error} If fetching fails
 */

export const getAds = async () => {

  let ads = [];

  try {
    // Fetch ads endpoint
    const response = await fetch('http://127.0.0.1:8000/api/products');
    
    // If response is not OK, throw error
    if (!response.ok) {
      throw new Error('Failed to load ads');
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