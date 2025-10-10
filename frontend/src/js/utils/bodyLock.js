export const BodyLock = (() => {
  let isLocked = false;

  return (timeout = 300) => {
    if (isLocked) return;
    const lockPadding = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    document.body.style.paddingRight = lockPadding;
    document.body.style.overflow = "hidden";
    isLocked = true;

    setTimeout(() => {
      isLocked = false;
    }, timeout);
  };
})();