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
  console.log('🎮 CONTROLLER: Starting loadAds...');

  /* These lines of code are retrieving references to HTML elements with the IDs 'ads-container' and
  'ads-cards' from the DOM. */
  const adsContainer = document.getElementById('ads-container');
  const adsSection = document.getElementById('ads-cards');
  const paginationContainer = document.getElementById('pagination-container');

  if (!adsContainer || !adsSection || !paginationContainer) {
    console.error('❌ CONTROLLER: Required elements not found');
    return;
  }
  if (isLoading) {
    return;
  }


  //* Check authentication
  const token = localStorage.getItem(constants.tokenKey);
  const isAuthenticated = !!token;

  //* Get username from token (if authenticated)
  let username = null;
  if (isAuthenticated && token) {
    try {

      // Otra forma de obtener el y decodificar el token , con atob decodifica y obtiene todos los valores del token del localstorage , mas rapido
      //  y sin llamr al backend
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
    console.log(`CONTROLLER: Page ${currentPage} / ${totalPages}, Total ads: ${totalCount}`)

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
    isLoading = false;
    //* Always hide loader
    const finishEvent = new CustomEvent('finish-fetching-ads');
    adsSection.dispatchEvent(finishEvent);
  }

  //* SI HUBO ERROR → SALIR (no mostrar más toasts)

  if (hasError) {
    console.log('❌ Stopping due to error');
    adsContainer.innerHTML = buildErrorState(errorMessage);
    paginationContainer.innerHTML = '';
    return;  //Return  - No continuar con success/empty
  }


  //* STATE = EMPTY (sin error, pero sin anuncios)
  if (ads.length === 0) {
    console.log('📭 CONTROLLER: No ads found');

    //* Show empty state
    adsContainer.innerHTML = buildEmptyState(isAuthenticated, username);
    paginationContainer.innerHTML = '';

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
  paginationContainer.innerHTML = buildPagination(currentPage, totalPages);

  attachPaginationListeners();

  console.log('✅ CONTROLLER: Ads rendered successfully');
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
    console.log('❌ Invalid page number:', newPage);
    return;
  }

  currentPage = newPage;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  adsController();
}


// Resetear a pagina 1 despues de crear editar o eliminar una nuncio 
export const resetPagination = () => {
  currentPage = 1;
  adsController();
}

export const handleSearch = () => {
  const searchInput = document.getElementById('search-input');
  const showAllButton = document.getElementById('show-all-button'); 
  
  if (!searchInput) return;
  
  searchTerm = searchInput.value.trim();
  
  
  // boton show
  if (showAllButton && searchTerm) {
    showAllButton.style.display = 'inline-block';
  }
  
  currentPage = 1;
  adsController();
}

export function showAllAds() {
  const searchInput = document.getElementById('search-input');
  const showAllButton = document.getElementById('show-all-button');
  
  // Limpiar input
  if (searchInput) {
    searchInput.value = '';
  }
  
  // Ocultar botón
  if (showAllButton) {
    showAllButton.style.display = 'none';
  }
  
  // Reset búsqueda
  searchTerm = '';
  currentPage = 1;
  adsController();
}

export function filterByTag(tag) {
  console.log('🏷️ Filtering by tag:', tag);
  
  // Guardar el tag
  filterTag = tag;
  
  // Volver a página 1
  currentPage = 1;
  
  // Mostrar botón "Clear Filter"
  const clearBtn = document.getElementById('clear-filter-btn');
  if (clearBtn) {
    clearBtn.style.display = 'inline-block';
  }
  
  // Recargar anuncios con filtro
  adsController();
}

export function clearFilter() {
  console.log('🗑️ Clearing filter...');
  
  // Limpiar el filtro
  filterTag = '';
  
  // Volver a página 1
  currentPage = 1;
  
  // Ocultar botón "Clear Filter"
  const clearBtn = document.getElementById('clear-filter-btn');
  if (clearBtn) {
    clearBtn.style.display = 'none';
  }
  
  // Recargar todos los anuncios
  adsController();
}