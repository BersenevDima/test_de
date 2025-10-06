export const BodyLock = (unlock, timeout) => {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'

	document.body.style.paddingRight = lockPaddingValue
	document.body.style.overflow = 'hidden'

	unlock = false
	setTimeout(() => {
		unlock = true
	}, timeout)
}
