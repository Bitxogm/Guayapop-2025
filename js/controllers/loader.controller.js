import { buildLoader } from '../views/loader.view.js';

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