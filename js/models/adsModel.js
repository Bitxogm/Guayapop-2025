import { constants } from '../utils/constants.js';

export async function getAds(page = 1, perPage = 10, searchTerm = '') {
  let  url = `${constants.apiUrl}/api/products?_sort=createdAt&_order=desc&_page=${page}&_per_page=${perPage}`;
  
  if(searchTerm) {
    url += `&q=${searchTerm}`
  }
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ads: ${response.status} ${response.statusText}`);
  }
  
  // Extraer total de items del header X-Total-Count
  const totalCount = parseInt(response.headers.get('X-Total-Count')) || 0;
  
  const ads = await response.json();
  
  return { ads, totalCount };
}