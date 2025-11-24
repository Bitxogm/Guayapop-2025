// js/controllers/ads.controller.js

import { getAds } from '../models/adsModel.js';
import { buildAdCard } from '../views/ads.view.js';
import { buildEmptyState, buildErrorState } from '../views/states.view.js';
import { constants } from '../utils/constants.js';

/**
 * Fetches and displays ads list
 * 
 * States: loading → success/error/empty
 * 
 * @async
 * @returns {Promise<void>}
 */

export const adsController = async () => {
  console.log('🎮 CONTROLLER: Starting loadAds...');

  /* These lines of code are retrieving references to HTML elements with the IDs 'ads-container' and
  'ads-cards' from the DOM. */
  const adsContainer = document.getElementById('ads-container');
  const adsSection = document.getElementById('ads-cards');

  if (!adsContainer || !adsSection) {
    console.error('❌ CONTROLLER: Required elements not found');
    return;
  }

  //* Check authentication
  const token = localStorage.getItem(constants.tokenKey);
  const isAuthenticated = !!token;

  //* Get username from token (if authenticated)
  let username = null;
  if (isAuthenticated && token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      username = payload.username;
      const shortName = username ? username.split('@')[0] : 'User';
      console.log('👤 Username from token:', shortName);
    } catch (error) {
      console.error('❌ Error decoding token:', error);
    }
  }

  let ads = [];
  let hasError = false;  // FLAG para saber si hubo error
  let errorMessage = '';  // FLAG para almacenar el mensaje de error

  try {
    //* Dispatch start event
    const startEvent = new CustomEvent('start-fetching-ads', {
      detail: {
         message: '🔎 Fetching ads...',
          type: 'info' 
        }
    });
    adsSection.dispatchEvent(startEvent);

    //* Fetch data from Model
    ads = await getAds();

  } catch (error) {
    //  STATE = ERROR
    console.error('❌ CONTROLLER: Error fetching ads:', error);
    hasError = true;  //  Marcar que hubo error

    //* Dispatch error event
    const errorEvent = new CustomEvent('ads-error', {
      detail: {
        message: '😱 ' + error.message,
        type: 'error'
      }
    });
    adsSection.dispatchEvent(errorEvent);

    //* Clear container on error
    adsContainer.innerHTML = '';

  } finally {
    //* Always hide loader
    const finishEvent = new CustomEvent('finish-fetching-ads');
    adsSection.dispatchEvent(finishEvent);
  }

  //* SI HUBO ERROR → SALIR (no mostrar más toasts)

  if (hasError) {
    console.log('❌ Stopping due to error');
    adsContainer.innerHTML = buildErrorState(errorMessage)
    return;  //Return  - No continuar con success/empty
  }


  //* STATE = EMPTY (sin error, pero sin anuncios)
  if (ads.length === 0) {
    console.log('📭 CONTROLLER: No ads found');

    //* Show empty state
    adsContainer.innerHTML = buildEmptyState(isAuthenticated, username);

    //* Dispatch empty event (toast azul)
    const emptyStateEvent = new CustomEvent('ads-empty', {
      detail: {
        message: `🤔 ${ads.length} ads found`,
        type: 'info'
      }
    });
    adsSection.dispatchEvent(emptyStateEvent);

    return;  //return, no continuar con success
  }

  //* STATE = SUCCESS (sin error, con anuncios)
  console.log(`✅ CONTROLLER: Building ${ads.length} ad cards...`);

  //* Dispatch success event (toast verde)
  const successEvent = new CustomEvent('finish-load-ads', {
    detail: {
      message: `😀 ${ads.length} ads loaded successfully`,
      type: 'success'
    }
  });
  adsSection.dispatchEvent(successEvent);

  //* Clear container
  adsContainer.innerHTML = '';

  //* Create grid
  const gridRow = document.createElement('div');
  gridRow.classList.add('row');

  //* Add each ad card
  ads.forEach((ad) => {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('col-md-4', 'mb-4');

    cardWrapper.innerHTML = buildAdCard(ad);

    cardWrapper.addEventListener('click', () => {
      console.log(`🖱️ Card clicked, navigating to ad detail: ${ad.id}`);
      window.location.href = `ad-detail.html?id=${ad.id}`;
    });

    gridRow.appendChild(cardWrapper);
  });

  adsContainer.appendChild(gridRow);

  console.log('✅ CONTROLLER: Ads rendered successfully');
};