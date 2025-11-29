//** Ad Detail Controller */

import { getAdDetail, getUserData, deleteAd } from '../models/adDetailModel.js';
import { buildAdDetailCard } from '../views/adDetail.view.js';
import { constants } from '../utils/constants.js';
import { resetPagination } from './ads.controller.js';

/**
 * Fetches and displays a single ad detail
 * 
 * States: loading → success/error
 * 
 * @async
 * @param {HTMLElement} adDetailContainer - DOM element where ad will be rendered
 * @param {string} adId - ID of the ad to fetch
 * @returns {Promise<void>}
 */
export const adDetailController = async (adDetailContainer, adId) => {
  console.log('⚙️ CONTROLLER: Starting adDetailController for ad:', adId);

  //* Get DOM element
  const adDetailSection = document.getElementById('ad-detail');

  /**
   * Adds event listeners to Edit and Delete buttons
   * @private
   * @param {Object} ad - Ad object
   */
  const handleOwnerActions = (ad) => {

    //* EDIT BUTTON
    const editBtn = document.getElementById('edit-ad-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {

        //* Verify token
        const token = localStorage.getItem(constants.tokenKey);
        if (!token) {
          alert('Your session has expired. Please login again.');
          window.location.href = 'login.html';
          return;
        }

        //* Token existe → redirigir a edit
        window.location.href = `edit-ad.html?id=${ad.id}`;
      });
    }

    //* DELETE BUTTON
    const deleteBtn = document.getElementById('delete-ad-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', async () => {

        //* Verify token
        const token = localStorage.getItem(constants.tokenKey);
        if (!token) {
          alert('Your session has expired. Please login again.');
          window.location.href = 'login.html';
          return;
        }

        //* Confirm deletion
        const confirmed = confirm('Are you sure you want to delete this ad?\n\nThis action cannot be undone.');

        if (!confirmed) {
          return;
        }

        try {

          //* Show deleting toast + loader
          adDetailSection.dispatchEvent(new CustomEvent('start-deleting-ad', {
            detail: { message: 'Deleting ad...', type: 'info' }
          }));

          //* Delete from backend + minimum delay
          await Promise.all([
            deleteAd(ad.id),
            new Promise(resolve => setTimeout(resolve, 800))
          ]);

          //*  Hide loader
          adDetailSection.dispatchEvent(new CustomEvent('finish-deleting-ad'));

          //*  Show success toast
          adDetailSection.dispatchEvent(new CustomEvent('delete-ad-success', {
            detail: { message: '✅ Ad deleted successfully!', type: 'success' }
          }));

          //*  Wait for user to see the success toast
          await new Promise(resolve => setTimeout(resolve, 2000));

          //*  Redirect to home
          resetPagination();
          window.location.href = 'index.html';

        } catch (error) {

          //* HANDLE ERRORS: Check if it's an auth error
          const isAuthError =
            error.message.includes(' not authenticated') ||
            error.message.includes('not authorized') ||
            error.message.includes('401') ||
            error.message.includes('403') ||
            error.message.includes('Unauthorized') ||
            error.message.includes('Forbidden');

          if (isAuthError) {
            //* Token expired or user doesn't have permission
            alert('Your session has expired or you don\'t have permission. Please login again.');
            window.location.href = 'login.html';
            return;
          }

          //* OTHER ERRORS: While deleting..
          adDetailSection.dispatchEvent(new CustomEvent('delete-ad-error', {
            detail: {
              message: error.message || 'Failed to delete ad',
              type: 'error'
            }
          }));

        } finally {
          //* ALWAYS: Hide loader
          adDetailSection.dispatchEvent(new CustomEvent('finish-deleting-ad'));
        }
      });
    }
  };

  //*  Fetch ad 
  let ad = null;
  let hasError = false;
  let errorMessage = '';

  try {
    //* Dispatch start event (show loader + info toast)
    adDetailSection.dispatchEvent(new CustomEvent('start-fetching-ad-detail', {
      detail: { message: '🔎 Loading ad details...', type: 'info' }
    }));

    //* Fetch ad with owner info
    ad = await getAdDetail(adId);

    //* Check if ad exists
    if (!ad) {
      throw new Error('Ad not found');
    }

  } catch (error) {

    //* STATE = ERROR
    hasError = true;
    errorMessage = error.message;

    //* Dispatch error event
    adDetailSection.dispatchEvent(new CustomEvent('ad-detail-error', {
      detail: {
        message: '😱 ' + error.message,
        type: 'error'
      }
    }));

  } finally {
    //* Always hide loader
    adDetailSection.dispatchEvent(new CustomEvent('finish-fetching-ad-detail'));
  }

  //* ERROR → Stop , go home
  if (hasError) {
    window.location.href = 'index.html';
    return; // Stop execution
  }

  //* STATE = SUCCESS - Dispatch success event
  adDetailSection.dispatchEvent(new CustomEvent('ad-detail-success', {
    detail: {
      message: '😀 Ad loaded successfully',
      type: 'success'
    }
  }));

  //* Check ownership 
  let isOwner = false;

  try {
    const userData = await getUserData();

    //* Check if user is owner
    isOwner = userData.id === ad.userId;

  } catch (error) {
    throw error;
  }

  //*  Render ad with or without owner buttons
  const adHTML = buildAdDetailCard(ad, isOwner);
  adDetailContainer.innerHTML = adHTML;

  //* If owner, add event listeners to buttons
  if (isOwner) {
    handleOwnerActions(ad);
  }
};