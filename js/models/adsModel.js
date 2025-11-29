//** Ads Model */

import { constants } from '../utils/constants.js';

/**
 * Fetches ads with pagination, search and filtering
 * @param {number} page - Current page number
 * @param {number} perPage - Number of items per page
 * @param {string} searchTerm - Search query string
 * @param {string} filterTag - Tag to filter by
 * @returns {Promise<Object>} Object with ads array and total count
 * @throws {Error} If fetching fails
 */
export async function getAds(page = 1, perPage = 10, searchTerm = '', filterTag = '') {

  // Build base URL with sorting and pagination
  let url = `${constants.apiUrl}/api/products?_sort=createdAt&_order=desc&_page=${page}&_per_page=${perPage}`;

  // Add search parameter if provided
  if (searchTerm) {
    url += `&q=${searchTerm}`;
  }

  // Add tag filter if provided
  if (filterTag) {
    url += `&tags_like=${encodeURIComponent(filterTag)}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ads: ${response.status} ${response.statusText}`);
  }

  // Extract total count from response header
  const totalCount = parseInt(response.headers.get('X-Total-Count')) || 0;

  const ads = await response.json();

  return { ads, totalCount };
}