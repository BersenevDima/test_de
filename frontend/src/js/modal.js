import { BodyLock } from "./utils/bodyLock";
import { BodyUnLock } from "./utils/bodyUnLock";

export default class Modal {
  constructor({ modalEl, openBtns = [], closeBtns = [], onOpen, onClose, timeout = 300 }) {
    this.modal = modalEl;
    this.openBtns = openBtns;
    this.closeBtns = closeBtns;
    this.isOpen = false;
    this.timeout = timeout;
    this.onOpen = onOpen;
    this.onClose = onClose;

    this.openBtns.forEach(btn => btn.addEventListener("click", e => this.open(e)));
    this.closeBtns.forEach(btn => btn.addEventListener("click", e => this.close(e)));
    this.modal.addEventListener("click", e => {
      if (!e.target.closest(".modal__content")) this.close();
    });
  }

  async open(e) {
    e?.preventDefault();
    if (!this.isOpen) {
      this.isOpen = true;
      const activeModal = document.querySelector(".modal.open");
      if (activeModal) {
        const existingModal = new Modal({ modalEl: activeModal });
        await existingModal.close(false);
      } else {
        BodyLock(this.timeout);
      }

      this.modal.classList.remove("close");
      this.modal.classList.add("open");
      this.onOpen?.();
    }
  }

  async close(doUnlock = true, e) {
    e?.preventDefault();
    if (this.isOpen) {
      this.isOpen = false;
      this.modal.classList.remove("open");
      this.modal.classList.add("close");
      if (doUnlock) await BodyUnLock(this.timeout);
      this.onClose?.();
    }
  }
}
