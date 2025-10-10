import Modal from "./modal.js";

export class Form {
  static selectors = { input: "[data-js-input]" };

  constructor(formEl, modalOpenCallback) {
    this.form = formEl;
    this.inputs = Array.from(this.form.querySelectorAll(Form.selectors.input));
    this.url = this.form.getAttribute("action");
    this.modalOpen = modalOpenCallback;

    this.form.addEventListener("submit", e => this.onSubmit(e));
  }

  static setInputErrorState(input, isValid = true) {
    input.classList.toggle("isValid", isValid);
    input.classList.remove("isNotValid");
    if (!isValid) input.classList.add("isNotValid");
  }

  static isEmailValid(input) {
    const reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return reg.test(input.value);
  }

  static isDefaultInputValid(input) {
    return !!input.value.trim().length;
  }

  static isValid(inputs = []) {
    return inputs
      .map(input => {
        const type = input.getAttribute("data-js-input");
        const isValid = type === "email" ? Form.isEmailValid(input) : Form.isDefaultInputValid(input);
        Form.setInputErrorState(input, isValid);
        return isValid;
      })
      .every(Boolean);
  }

  static async send(url, form) {
    return fetch(url, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
      },
      body: new FormData(form),
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    if (!Form.isValid(this.inputs)) return;

    const btn = this.form.querySelector('input[type="submit"]');
    btn.disabled = true;

    try {
      await Form.send(this.url, this.form);
      this.modalOpen();
    } catch {
      this.modalOpen();
    } finally {
      btn.disabled = false;
    }
  }
}

export default class FormManager {
  static selector = "[data-js-form]";

  constructor() {
    this.forms = document.querySelectorAll(FormManager.selector);

    if (!this.forms.length) {
      console.warn("No forms found on the page");
      return;
    }

    this.init();
  }

  init() {
    const modalEl = document.querySelector('[data-js-modal="modal2"]');
    if (!modalEl) return;

    const modal = new Modal({
      modalEl,
      closeBtns: modalEl.querySelectorAll('[data-js-close]')
    });

    this.forms.forEach(formEl => {
      if (!formEl) return;
      new Form(formEl, () => modal.open());
    });
  }
}
