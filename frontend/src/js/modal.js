import { BodyLock } from './utils/bodyLock'
import { BodyUnLock } from './utils/bodyUnLock'

export default class Modal {
	static selectors = {
		openButton: '[data-js-open]',
		closeButton: '[data-js-close]'
	}

	constructor (modal = '[data-js-modal=modal1]') {
		this.modal = document.querySelector(modal)
		this.openButton = document.querySelectorAll(Modal.selectors.openButton)
		this.closeButton = document.querySelectorAll(Modal.selectors.closeButton)
		this.unlock = true
		this.timeout = 300

		if (this.modal && this.openButton) {
			this.clickOpenBtn()
			this.clickCloseBtn()
		}
	}

	clickOpenBtn () {
		this.openButton.forEach(btn => {
			this.#clickOpen(btn)
		})
	}

	clickCloseBtn () {
		this.closeButton.forEach(btn => {
			this.#clickClose(btn)
		})
	}

	modalOpen () {
		if (this.unlock) {
			const modalActive = document.querySelector('.open')
			if (modalActive) {
				this.modalClose(modalActive, false)
			} else {
				BodyLock(this.unlock, this.timeout)
			}

			this.modal.classList.remove('close')
			this.modal.classList.add('open')
			this.backgroundClose(this.modal)
		}
	}

	modalClose (modal, doUnlock = true) {
		if (this.unlock) {
			modal.classList.remove('open')
			modal.classList.add('close')
			if (doUnlock) BodyUnLock(this.unlock, this.timeout)
		}
	}

	backgroundClose (modal) {
		modal.addEventListener('click', (e) => {
			if (!e.target.closest('.modal__content')) {
				this.modalClose(modal.closest('.modal'))
			}
		}, { once: true })
	}

	#clickOpen (btn) {
		btn.addEventListener('click', (e) => {
			e.preventDefault()
			const modalName = btn.getAttribute('data-js-open')
			if (this.modal.getAttribute('data-js-modal') === modalName) {
				this.modalOpen(this.modal)
			}
		})
	}

	#clickClose (btn) {
		btn.addEventListener('click', (e) => {
			e.preventDefault()
			this.modalClose(btn.closest('.modal'))
		})
	}
}
