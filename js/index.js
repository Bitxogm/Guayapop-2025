
//  * ENTRY POINT: Application starts here

import { loadAds } from './controllers/adsController.js';

console.log('🚀 Application starting...');

// Wait for DOM 
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM ready, calling Controller...');
  
  // Call the Controller 
  loadAds();
});