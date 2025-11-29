// js/controllers/ads.controller.js

import { getAds } from '../models/adsModel.js';
import { buildAdCard } from '../views/ads.view.js';
import { buildEmptyState, buildErrorState } from '../views/states.view.js';
import { buildPagination } from '../views/pagination.view.js';
import { constants } from '../utils/constants.js';

/**
 * Fetches and displays ads list
 * 
 * States: loading → success/error/empty
 * 
 * @async
 * @returns {Promise<void>}
 */

let currentPage = 1;
let perPage = 10;
let totalPages = 0;
let isLoading = false;
let searchTerm = '';
let filterTag = '';

export const adsController = async () => {

  //* Get DOM elements
  const adsContainer = document.getElementById('ads-container');
  const adsSection = document.getElementById('ads-cards');
  const paginationContainer = document.getElementById('pagination-container');

  //* Check authentication
  const token = localStorage.getItem(constants.tokenKey);
  const isAuthenticated = !!token;

  //* Get username from token (if authenticated)
  let username = null;
  if (isAuthenticated && token) {
    try {

      // Decode JWT token with atob ,
      const payload = JSON.parse(atob(token.split('.')[1]));
      username = payload.username;
      const shortName = username ? username.split('@')[0] : 'User';
    } catch (error) {
      throw new Error('Error decoding token');
    }
  }

  let ads = [];
  let hasError = false;
  let errorMessage = '';

  try {
    //* Dispatch start event
    isLoading = true;
    const startEvent = new CustomEvent('start-fetching-ads', {
      detail: {
        message: '🔎 Fetching ads...',
        type: 'info'
      }
    });
    adsSection.dispatchEvent(startEvent);

    //* Fetch data from Model
    const { ads: fetchedAds, totalCount } = await getAds(currentPage, perPage, searchTerm, filterTag);

    ads = fetchedAds;
    totalPages = Math.ceil(totalCount / perPage);

  } catch (error) {
    //  STATE = ERROR
    hasError = true;

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
    isLoading = false;
    //* Always hide loader
    const finishEvent = new CustomEvent('finish-fetching-ads');
    adsSection.dispatchEvent(finishEvent);
  }

  if (hasError) {
    adsContainer.innerHTML = buildErrorState(errorMessage);
    paginationContainer.innerHTML = '';
    return;
  }


  //* STATE = EMPTY 
  if (ads.length === 0) {

    //* Show empty state
    adsContainer.innerHTML = buildEmptyState(isAuthenticated, username);
    paginationContainer.innerHTML = '';

    //* Dispatch empty event (blue toast)
    const emptyStateEvent = new CustomEvent('ads-empty', {
      detail: {
        message: `🤔 ${ads.length} ads found`,
        type: 'info'
      }
    });
    adsSection.dispatchEvent(emptyStateEvent);
    return;
  }

  //* STATE = SUCCESS 

  //* Dispatch success event (green toast)
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
      window.location.href = `ad-detail.html?id=${ad.id}`;
    });

    gridRow.appendChild(cardWrapper);
  });

  adsContainer.appendChild(gridRow);
  paginationContainer.innerHTML = buildPagination(currentPage, totalPages);
  attachPaginationListeners();
};

const attachPaginationListeners = () => {
  const prevButton = document.getElementById('prev-page-btn');
  const nextButton = document.getElementById('next-page-btn');

  if (prevButton && !prevButton.disabled) {
    prevButton.addEventListener('click', () => {
      changePage(currentPage - 1);
    })
  }

  if (nextButton && !nextButton.disabled) {
    nextButton.addEventListener('click', () => {
      changePage(currentPage + 1);
    })
  }
}

const changePage = (newPage) => {
  if (newPage < 1 || newPage > totalPages) {
    return;
  }

  currentPage = newPage;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  adsController();
}

// Reset pagination
export const resetPagination = () => {
  currentPage = 1;
  adsController();
}

export const handleSearch = () => {
  const searchInput = document.getElementById('search-input');
  const showAllButton = document.getElementById('show-all-button');

  if (!searchInput) return;

  searchTerm = searchInput.value.trim();

  //* show button
  if (showAllButton && searchTerm) {
    showAllButton.style.display = 'inline-block';
  }

  currentPage = 1;
  adsController();
}

export function showAllAds() {
  const searchInput = document.getElementById('search-input');
  const showAllButton = document.getElementById('show-all-button');

  //* Clear input
  if (searchInput) {
    searchInput.value = '';
  }

  //* Hide button
  if (showAllButton) {
    showAllButton.style.display = 'none';
  }

  //* Reset search
  searchTerm = '';
  currentPage = 1;
  adsController();
}

export function filterByTag(tag) {

  //* Keep tag
  filterTag = tag;

  //* Reset pagination
  currentPage = 1;

  //* Show button "Clear Filter"
  const clearBtn = document.getElementById('clear-filter-btn');
  if (clearBtn) {
    clearBtn.style.display = 'inline-block';
  }

  //* Reload ads with filters
  adsController();
}

export function clearFilter() {

  //* Clear tag 
  filterTag = '';

  //* Reset pagination
  currentPage = 1;

  //*Hide button "Clear Filter"
  const clearBtn = document.getElementById('clear-filter-btn');
  if (clearBtn) {
    clearBtn.style.display = 'none';
  }

  // Recargar todos los anuncios
  adsController();
}