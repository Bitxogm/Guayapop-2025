//* loader.controller.js

import { buildLoader } from '../views/loader.view.js';

/**
 * Controller for loader
 * @param {*} loaderContainer 
 * @returns {Object} Object with showLoader and hideLoader methods
 */

export const loaderController = (loaderContainer) => {

  // Show loader
  const showLoader = () => {
    loaderContainer.innerHTML = buildLoader();
  };

  // Hide loader
  const hideLoader = () => {
    loaderContainer.innerHTML = '';
  };

  return {
    showLoader,
    hideLoader
  };

}