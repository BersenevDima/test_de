import "./styles/global.pcss";
import FormManager from "./js/form.js";
import Modal from "./js/modal.js";

document.addEventListener("DOMContentLoaded", () => {
  new Modal({
    modalEl: document.querySelector('[data-js-modal="modal1"]'),
    openBtns: document.querySelectorAll('[data-js-open="modal1"]'),
    closeBtns: document.querySelectorAll('[data-js-modal="modal1"] [data-js-close]')
  });

  new FormManager();
});
