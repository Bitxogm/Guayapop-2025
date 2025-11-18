//** Signup Controller Module **/

export const sigunupController = (signupForm) => {

  // Event listener for form submission
  signupForm.addEventListener('submit', (event) => {
    // preventDefault form submission behavior
    event.preventDefault();

    const errors = []

    const password = signupForm.querySelector("#password");
    const passwordConfirmation = signupForm.querySelector("#passwordConfirm");

    const email = signupForm.querySelector("#email");
    const emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);


    
    // Validate password and confirmation match
    if (password.value !== passwordConfirmation.value) {
      const errorEvent = new CustomEvent("signup-validation-error", {
        detail: {
          message: "Passwords do not match.",
          type: "error"
        }
      });
      signupForm.dispatchEvent(errorEvent);
      return;
    }

    // Validate email format
    if (!emailRegExp.test(email.value)) {
      const errorEvent = new CustomEvent("signup-validation-error", {
        detail: {
          message: "Invalid email format.",
          type: "error"
        }
      });
      signupForm.dispatchEvent(errorEvent);
      return;
    }

    // If validation passes, dispatch success event
    const successEvent = new CustomEvent("signup-success", {
      detail: {
        message: "Signup successful!",
        type: "success"
      }
    });
    signupForm.dispatchEvent(successEvent);

  });
}


