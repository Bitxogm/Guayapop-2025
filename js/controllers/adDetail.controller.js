//** Ad Detail Controller - VERSIÓN LIMPIA */

import { getAdDetail, getUserData, deleteAd } from '../models/adDetailModel.js';
import { buildAdDetailCard } from '../views/adDetail.view.js';

/**
 * Fetches and displays a single ad detail
 * @param {HTMLElement} adDetailContainer - DOM element where ad will be rendered
 * @param {string} adId - ID of the ad to fetch
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
   * Adds event listeners to Edit and Delete buttons (if they exist)
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

          // //* Dispatch start event (show loader)
          adDetailSection.dispatchEvent(new CustomEvent('start-deleting-ad', {
            detail: { message: '😀 Deleted Ad', type: 'success' }
          }));

          //* Delete ad from backend
          await deleteAd(ad.id);

          //* Redirect to home
          console.log('✅ Ad deleted successfully, redirecting to home...');
          window.location.href = 'index.html';

        } catch (error) {
          console.error('❌ Error deleting ad:', error);

          //* Dispatch error event
          adDetailSection.dispatchEvent(new CustomEvent('delete-ad-error', {
            detail: {
              message: error.message || 'Failed to delete ad',
              type: 'error'
            }
          }));

        } finally {
          //* Always hide loader
          adDetailSection.dispatchEvent(new CustomEvent('finish-deleting-ad'));
        }
      });
    }
  };

  let ad = null;

  try {
    //* Dispatch start event
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
    console.error('❌ CONTROLLER: Error loading ad:', error);

    //* Dispatch error event
    adDetailSection.dispatchEvent(new CustomEvent('ad-detail-error', {
      detail: {
        message: error.message || 'Failed to load ad',
        type: 'error'
      }
    }));

    //* Show error and redirect 
    alert(error.message || 'Ad not found');
    window.location.href = 'index.html';
    return; // Stop execution

  } finally {
    //* Always hide loader
    adDetailSection.dispatchEvent(new CustomEvent('finish-fetching-ad-detail'));
  }

  let isOwner = false;

  try {
    const userData = await getUserData();
    console.log('👤 User data retrieved:', userData);

    //* Check if user is owner
    isOwner = userData.id === ad.userId;
    console.log('🔑 Is owner?', isOwner);

  } catch (error) {
    //* Silent fail - user not authenticated
    console.log('👤 User not authenticated');
  }

  const adHTML = buildAdDetailCard(ad, isOwner);
  adDetailContainer.innerHTML = adHTML;

  //* If owner, add event listeners to buttons
  if (isOwner) {
    handleOwnerActions(ad);
  }
};