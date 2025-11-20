//** Signup Controller Module **/
import { constants } from '../../utils/constants.js';
import { createUser } from '../models/signupModel.js';

export const signupController = (signupForm) => {

  // Event listener for form submission
  signupForm.addEventListener('submit', async (event) => {
    // preventDefault form submission behavior
    event.preventDefault();

    const errors = []

    // Select form fields
    const password = signupForm.querySelector("#password");
    const passwordConfirmation = signupForm.querySelector("#passwordConfirm");

    // Select email field and define regex for validation
    const email = signupForm.querySelector("#email");
    const emailRegExp = new RegExp(constants.mailRegExp);

    // Validate password and confirmation match
    if (password.value !== passwordConfirmation.value) {
      const errorEvent = new CustomEvent("signup-validation-error", {
        detail: {
          message: "Passwords do not match.",
          type: "error"
        }
      });
      errors.push(errorEvent);
    }

    // Validate email format
    if (!emailRegExp.test(email.value)) {
      const errorEvent = new CustomEvent("signup-validation-error", {
        detail: {
          message: "Invalid email format.",
          type: "error"
        }
      });
      errors.push(errorEvent);
    }
    // If there are validation errors, dispatch them and exit
    if (errors.length > 0) {
      errors.forEach(errorEvent => {
        signupForm.dispatchEvent(errorEvent);
      });
      return;
    }
    // Call createUser from the model if no validation errors

    try {

      // Distpatch START loader event
      const startEvent = new CustomEvent("start-signup");
      signupForm.dispatchEvent(startEvent);

      await createUser(email.value, password.value);
      // If validation passes, dispatch success event
      const successEvent = new CustomEvent("signup-success", {
        detail: {
          message: "😀 Signup successful!",
          type: "success"
        }
      });
      signupForm.dispatchEvent(successEvent);
        setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {

      // If an error occurs, dispatch validation error event
      const errorEvent = new CustomEvent("signup-validation-error", {
        detail: {
          message: error.message,
          type: "error"
        }
      });
      signupForm.dispatchEvent(errorEvent);
    }finally{
      // Distpatch END loader event
      const finishEvent = new CustomEvent("finish-signup");
      signupForm.dispatchEvent(finishEvent);
    }
  });

}


