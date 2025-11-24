//** Create Ad Controller */

import { createAd } from '../models/createAd.model.js';
import { constants } from '../utils/constants.js';  

// TODO:Si el usuario no ha iniciado sesion redireccionar a pantalla de anuncios
// TODO: Mostrar un toast informando del motivo
export const createAdController = (createAdForm) => {

  createAdForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = localStorage.getItem(constants.tokenKey);
    if (!token) {
      alert('Your session has expired. Please login again.');
      window.location.href = 'login.html';
      return;
    }
    // Necesito obtener el Contenido del los datos del formulario

    // Get all data from form , FormData read automatically the input names and values
    const formData = new FormData(createAdForm);

    // Extarct individual values
    const name = formData.get('name');
    const description = formData.get('description');
    const price = parseFloat(formData.get('price'));
    const image = formData.get('image');
    const type = formData.get('type');

    // Tag is diferent because it's a multi select with the same name
    const tags = formData.getAll('tags');

    //Build the object for model
    const adData = {
      name,
      description,
      price: parseFloat(price),
      type,
      image: image || undefined,
      tags: tags.length > 0 ? tags : undefined,
    }

    // Call the model to create the ad
    try {
      // Distpatch START loader event
      const startEvent = new CustomEvent("start-create-ad", {
        detail: {
          message: " Creating ad...",
          type: "info"
        }
      });
      createAdForm.dispatchEvent(startEvent);
      const newAd = await createAd(adData);
      console.log('✅ CONTROLLER: Ad created successfully:', newAd);
      // If ad, dispatch success event
      const successEvent = new CustomEvent("create-ad-success", {
        detail: {
          message: "😀 Ad created!! ➡️ Go home",
          type: "success"
        }
      });
      createAdForm.dispatchEvent(successEvent);
      setTimeout(() => {
        window.location.href = `/`;
      }, 3000);

    } catch (error) {
      const errorMessage = '☢️ CONTROLLER: Could not create ad: ' + error.message;
      console.error(errorMessage);

      const errorEvent = new CustomEvent("create-ad-validation-error", {
        detail: {
          message: errorMessage,
          type: "error"
        }
      });
      createAdForm.dispatchEvent(errorEvent);
    } finally {
      // Dispatch END loader event
      const endEvent = new CustomEvent("finish-create-ad");
      createAdForm.dispatchEvent(endEvent);
    }
  });
};