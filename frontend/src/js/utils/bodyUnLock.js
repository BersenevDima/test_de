export const BodyUnLock = (unlock, timeout) => {
	setTimeout(() => {
		document.body.style.paddingRight = '0px'
		document.body.style.overflow = 'visible'
	}, timeout)

	unlock = false
	setTimeout(() => {
		unlock = true
	}, timeout)
}
