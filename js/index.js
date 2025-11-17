// js/index.js

import { getAds } from "./models/adsModel.js";

console.log('🚀 Starting Wallapop application...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
  console.log('✅ DOM is ready!');
  
  // Get container from DOM
  const adsContainer = document.getElementById('ads-container');
  
  if (!adsContainer) {
    console.error('❌ Container #ads-container not found in HTML');
    return;
  }

  try {
    // Fetch ads from backend
    const ads = await getAds();
    console.log(`✅ Received ${ads.length} ads`);
    console.log('📦 Full ads array:', ads);
    
    // TODO: Later we'll show them on screen
    // For now, just verify in console
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
});

