import Modal from './modal'

export class Form {
	static selectors = {
		input: '[data-js-input]'
	}

	constructor (element) {
		this.instance = element

		this.inputs = Array.from(
			this.instance.querySelectorAll(Form.selectors.input)
		)

		this.url = this.instance.getAttribute('action')

		if (this.instance) {
			this.modal = new Modal('[data-js-modal=modal2]')
			this.bindEvents()
		}
	}

	static setInputErrorState (input, isValid = true) {
		input.classList.toggle('isValid', isValid)
		input.classList.remove('isNotValid')
		if (!isValid) {
			input.classList.add('isNotValid')
		}
	}

	static isEmailValid (input) {
		const reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
		return reg.test(input.value)
	}

	static isDefaultInputValid (input) {
		return !!input.value.length
	}

	static isValid (inputs = []) {
		const isInputValid = (input) => {
			const validationType = input.getAttribute('data-js-input')
			switch (validationType) {
			case 'email':
				return Form.isEmailValid(input)
			default:
				return Form.isDefaultInputValid(input)
			}
		}
		return inputs
			.map((el) => {
				const isValid = isInputValid(el)
				Form.setInputErrorState(el, isValid)
				return isValid
			})
			.every((isValid) => !!isValid)
	}

	static async send (url, instance) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				mode: 'no-cors',
				method: 'POST',
				headers: {
					'Access-Control-Allow-Headers': 'Content-Type',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH'
				},
				body: new FormData(instance)
			})
				.then(res => {
					if (res.ok) {
						resolve(res)
					} else {
						reject(new Error(`Error: ${res.status} ${res.statusText}`))
					}
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	#onSubmit (e) {
		e.preventDefault()
		const isValid = Form.isValid(this.inputs)
		const btn = this.instance.querySelector('input[type="submit"]')
		if (isValid) {
			btn.disabled = true
			Form.send(this.url, this.instance)
				.then(() => {
					this.modal.modalOpen()
					btn.disabled = false
				})
				.catch(() => {
					const currentModal = document.querySelector('[data-js-modal="modal2"]')
					const changeText = currentModal.querySelector('.message__descr')
					changeText.innerText = 'An error has occurred'
					this.modal.modalOpen()
					btn.disabled = false
				})
		}
	}

	bindEvents () {
		this.instance.addEventListener('submit', (e) => this.#onSubmit(e))
	}
}

export default class FormManager {
	static selector = '[data-js-form]'

	constructor () {
		this.form = document.querySelectorAll(FormManager.selector)
		if (this.form.length) {
			this.init()
		}
	}

	init () {
		this.form.forEach(node => new Form(node))
	}
}
