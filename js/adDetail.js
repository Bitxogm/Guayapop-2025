//**Ad Detail */

//Pintar detalle anuncio clickado
//Get urlParams from URL to get adId

const urlParams = window.location.search;

const searchParams = new URLSearchParams(urlParams);

const adId = searchParams.get('id');

if(!adId){
  window.location.href = '/';
}

const h1 = document.querySelector('h1');

h1.textContent = h1.textContent + ` ${adId}`;