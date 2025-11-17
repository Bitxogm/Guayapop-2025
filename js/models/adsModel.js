// js/models/adsModel.js


export const getAds = async () => {
  console.log('🔄 MODEL: Starting fetching to backend -> sparret ...');

  let ads = [];

  try {
    // Fetch ads endpoint
    const response = await fetch('http://127.0.0.1:8000/api/ads');
    
    // If response is not OK, throw error
    if (!response.ok) {
      throw new Error('Failed to load ads');
    }
    
    // Parse JSON
    ads = await response.json();
    
    console.log(`✅ MODEL: Received ${ads.length} ads from sparret`)

  } catch (error) {
    // Throw error to controller
    throw new Error('❌ MODEL: Could not load ads: ' + error.message);
  }
  
  return ads;
};