import './styles/global.pcss'
import FormManager from './js/form'
import Modal from './js/modal.js'

document.addEventListener('DOMContentLoaded', () => {
	const form = new FormManager()
	const modal = new Modal('[data-js-modal=modal1]')
})
