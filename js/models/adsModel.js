// js/models/adsModel.js

/**
 * MODEL: Fetches ads from backend
 * - Only does fetch requests
 * - Returns pure data (array of ads)
 * - Throws errors on failure
 * - Does NOT manipulate DOM
 */

export const getAds = async () => {
  let ads = [];

  try {
    // Fetch ads endpoint
    const response = await fetch('http://127.0.0.1:8000/api/anuncios');
    
    // If response is not OK, throw error
    if (!response.ok) {
      throw new Error('Failed to load ads');
    }
    
    // Parse JSON
    ads = await response.json();

  } catch (error) {
    // Throw error to controller
    throw new Error('Could not load ads: ' + error.message);
  }
  
  return ads;
};