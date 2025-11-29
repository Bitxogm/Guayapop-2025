//** Edit Ad Controller  */

import { getAdForEdit, updateAd } from '../models/editAdModel.js';
import { getUserData } from '../models/adDetailModel.js';
import { constants } from '../utils/constants.js';

/**
 * Edit Ad Controller - Loads ad data and handles form submission
 * @async
 * @param {string} adId - ID of ad to edit
 * @returns {Promise<void>}
 * 
 * @throws {Error} If ad not found or not owner
 */
export const editAdController = async (adId) => {

  // Get DOM elements
  const form = document.getElementById('ad-form');
  const editAdSection = document.getElementById('edit-ad-section');

  // Fetch ad data
  let ad = null;

  try {
    // Dispatch start event (show loader + toast)
    editAdSection.dispatchEvent(new CustomEvent('start-fetching-ad', {
      detail: { message: 'Loading ad...', type: 'info' }
    }));

    // Fetch ad from backend
    ad = await getAdForEdit(adId);

    // Dispatch success event  
    editAdSection.dispatchEvent(new CustomEvent('fetch-ad-success', {
      detail: { message: '✅ Ad loaded successfully!', type: 'success' }
    }));

  } catch (error) {
    editAdSection.dispatchEvent(new CustomEvent('ad-not-found', {
      detail: { message: 'Ad not found', type: 'warning' }
    }));
    alert(error.message || 'Failed to load ad');
    window.location.href = 'index.html';
    return;

  } finally {
    // Always hide loader
    editAdSection.dispatchEvent(new CustomEvent('finish-fetching-ad'));
  }

  // Verify ownership
  let isOwner = false;

  try {
    const userData = await getUserData();

    // Check if user is owner
    isOwner = userData.id === ad.userId;

    // If NOT owner, show alert and redirect
    if (!isOwner) {
      alert('You can only edit your own ads');
      window.location.href = 'index.html';
      return;
    }
  } catch (error) {
    // User not authenticated - redirect to login
    alert('You must be logged in to edit ads');
    window.location.href = 'login.html';
    return;
  }

  // Pre-fill form with ad data
  document.getElementById('name').value = ad.name || '';
  document.getElementById('description').value = ad.description || '';
  document.getElementById('price').value = ad.price || '';
  document.getElementById('image').value = ad.image || '';

  // Set type radio button
  const typeRadio = document.querySelector(`input[name="type"][value="${ad.type}"]`);
  if (typeRadio) {
    typeRadio.checked = true;
  }

  // Set tags checkboxes
  if (ad.tags && ad.tags.length > 0) {
    ad.tags.forEach(tag => {
      const checkbox = document.querySelector(`input[name="tags"][value="${tag}"]`);
      if (checkbox) {
        checkbox.checked = true;
      }
    });
  }

  // Handle form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = localStorage.getItem(constants.tokenKey);
    if (!token) {
      alert('Your session has expired. Please login again.');
      window.location.href = 'login.html';
      return;
    }

    // Get form data
    const formData = new FormData(form);

    const name = formData.get('name').trim();
    const description = formData.get('description').trim();
    const price = parseFloat(formData.get('price'));
    const type = formData.get('type');
    const image = formData.get('image').trim();
    const tags = formData.getAll('tags');

    // Prepare updated ad data
    const updatedAdData = {
      name,
      description,
      price,
      type,
      image: image || 'https://placehold.co/800x400?text=No+Image',
      tags
    };

    try {
      // Dispatch start event (show loader + toast)
      editAdSection.dispatchEvent(new CustomEvent('start-updating-ad', {
        detail: { message: 'Updating ad...', type: 'info' }
      }));

      // Update ad in backend and wait max 800ms
      await Promise.all([
        updateAd(adId, updatedAdData),
        new Promise(resolve => setTimeout(resolve, 800))
      ]);

      // Hide loader
      editAdSection.dispatchEvent(new CustomEvent('finish-updating-ad'));

      // Show success toast
      editAdSection.dispatchEvent(new CustomEvent('update-ad-success', {
        detail: { message: '✅ Ad updated successfully!', type: 'success' }
      }));

      // Wait 2 seconds for user to see success
      await new Promise(resolve => setTimeout(resolve, 2000));
      window.location.href = `ad-detail.html?id=${adId}`;
      
    } catch (error) {

      // Check if error is related to authentication
      const isAuthError =
        error.message.includes('not authenticated') ||
        error.message.includes('not authorized') ||
        error.message.includes('401') ||
        error.message.includes('403') ||
        error.message.includes('Unauthorized') ||
        error.message.includes('Forbidden');

      if (isAuthError) {
        alert('Your session has expired or you don\'t have permission. Please login again.');
        window.location.href = 'login.html';
        return;
      }

      // Dispatch error event (show toast)
      editAdSection.dispatchEvent(new CustomEvent('update-ad-error', {
        detail: {
          message: error.message || 'Failed to update ad',
          type: 'error'
        }
      }));

    } finally {
      // Ensure loader is hidden
      editAdSection.dispatchEvent(new CustomEvent('finish-updating-ad'));
    }
  });
};