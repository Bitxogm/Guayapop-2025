import { buildToast } from "../views/toast.view.js";

export function toastController(toastContainer) {
  const showToast = (message, type = "sucess") => {
    const newToast = document.createElement("div");
    newToast.innerHTML = buildToast(message, type)

    newToast.querySelector("button").addEventListener("click", () => {
      newToast.remove();
    })

    toastContainer.appendChild(newToast);

    setTimeout(() => {
      newToast.remove();
    }, 5000);
  }

  return {
    showToast
  }
}