//** Ad Detail Controller 

import { getAdDetail, getUserData, deleteAd } from '../models/adDetailModel.js';
import { buildAdDetailCard } from '../views/adDetail.view.js';

/**
 * Fetches and displays a single ad detail
 * 
 * Handles four possible states:
 * - LOADING: Shows loader and info toast
 * - ERROR: Shows error toast, alert, and redirects to home
 * - NOT FOUND: Shows warning toast, alert, and redirects to home
 * - SUCCESS: Shows ad detail with success toast
 * 
 * @async
 * @function adDetailController
 * @param {HTMLElement} adDetailContainer - DOM element where ad will be rendered
 * @param {string} adId - ID of the ad to fetch
 * @returns {Promise<void>}

 */
export const adDetailController = async (adDetailContainer, adId) => {
  console.log('⚙️ CONTROLLER: Starting adDetailController for ad:', adId);

  //* Get event bus (section element)
  const adDetailSection = document.getElementById('ad-detail');

  if (!adDetailSection) {
    console.error('❌ CONTROLLER: Ad detail section not found');
    return;
  }

  /**
   * Adds event listeners to Edit and Delete buttons if the current user is the owner of the ad
   * @private
   * @param {Object} ad - Ad object
   */
  const handleOwnerActions = (ad) => {
    console.log('🔑 Adding event listeners to owner action buttons');

    //* Edit button listener
    const editBtn = document.getElementById('edit-ad-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        console.log('✏️ Edit button clicked');
        alert('Edit functionality coming soon!\nWill redirect to: edit-ad.html?id=' + ad.id);
        // TODO: window.location.href = `edit-ad.html?id=${ad.id}`;
      });
    }

    //* Delete button listener
    const deleteBtn = document.getElementById('delete-ad-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', async () => {
        //* Confirm deletion
        const confirmed = confirm('Are you sure you want to delete this ad?\n\nThis action cannot be undone.');

        if (!confirmed) {
          console.log('❌ Delete cancelled by user');
          return;
        }

        try {
          console.log('🗑️ Deleting ad:', ad.id);

          //* 1->  Show deleting toast + loader
          adDetailSection.dispatchEvent(new CustomEvent('start-deleting-ad', {
            detail: { message: 'Deleting ad...', type: 'info' }
          }));

          //* 2-> Delete from backend , promise + delay
          await Promise.all([
            deleteAd(ad.id),
            new Promise(resolve => setTimeout(resolve, 800))  // ✅ Delay mínimo
          ]);

          //* 3 -> Hide loader
          adDetailSection.dispatchEvent(new CustomEvent('finish-deleting-ad'));

          //* 4 -> Show success toast
          adDetailSection.dispatchEvent(new CustomEvent('delete-ad-success', {
            detail: { message: '✅ Ad deleted successfully!', type: 'success' }
          }));

          //* 5 -> Wait for user to see the success toast
          console.log('⏳ Waiting 2 seconds before redirect...');
          await new Promise(resolve => setTimeout(resolve, 800));

          //* 6 -> Redirect to home (will show loading/success toasts there)
          console.log('🔄 Redirecting to home...');
          window.location.href = 'index.html';

        } catch (error) {
          console.error('❌ Error deleting ad:', error);

          //* Show error toast
          adDetailSection.dispatchEvent(new CustomEvent('delete-ad-error', {
            detail: {
              message: error.message || 'Failed to delete ad',
              type: 'error'
            }
          }));

        } finally {
          //* Ensure loader is hidden
          adDetailSection.dispatchEvent(new CustomEvent('finish-deleting-ad'));
        }
      });
    }

  }

  //* sdtep 1: Fetch ad (required)

  let ad = null;
  let hasError = false;
  let errorMessage = '';

  try {
    //* Dispatch start event (show loader + info toast)
    adDetailSection.dispatchEvent(new CustomEvent('start-fetching-ad-detail', {
      detail: { message: 'Loading ad details...', type: 'info' }
    }));

    //* Fetch ad with owner info
    ad = await getAdDetail(adId);

    //* Check if ad exists
    if (!ad) {
      throw new Error('Ad not found');
    }

    console.log('✅ CONTROLLER: Ad loaded successfully');

  } catch (error) {
    //* STATE = ERROR or NOT FOUND
    console.error('❌ CONTROLLER: Error loading ad:', error);

    hasError = true;
    errorMessage = error.message || 'Failed to load ad';

    //* Determine if it's 404 or other error
    const is404 = error.message === 'Ad not found' || error.message.includes('404');

    if (is404) {
      //* Dispatch not found event (warning toast)
      adDetailSection.dispatchEvent(new CustomEvent('ad-not-found', {
        detail: {
          message: 'Ad not found',
          type: 'warning'
        }
      }));
    } else {
      //* Dispatch error event (error toast)
      adDetailSection.dispatchEvent(new CustomEvent('ad-detail-error', {
        detail: {
          message: errorMessage,
          type: 'error'
        }
      }));
    }

  } finally {
    //* Always hide loader
    adDetailSection.dispatchEvent(new CustomEvent('finish-fetching-ad-detail'));
  }

  //* If error occurred, show alert and redirect
  
  if (hasError) {
    //* Show error alert and redirect 
    alert(errorMessage);
    window.location.href = 'index.html';
    return; // Stop execution
  }

  //*  Dispatch success event
  adDetailSection.dispatchEvent(new CustomEvent('ad-detail-success', {
    detail: {
      message: '😀 Ad loaded successfully',
      type: 'success'
    }
  }));

  //*  Check ownership of ad
  let isOwner = false;

  try {
    const userData = await getUserData();
    console.log('👤 User data retrieved:', userData);

    //* Check if user is owner
    isOwner = userData.id === ad.userId;
    console.log('🔑 Is owner?', isOwner);

  } catch (error) {
    console.log('👤 User not authenticated');
  }

  //* Render ad with or without owner buttons
  const adHTML = buildAdDetailCard(ad, isOwner);
  adDetailContainer.innerHTML = adHTML;

  //* If owner, add event listeners to buttons
  if (isOwner) {
    handleOwnerActions(ad);
  }
};