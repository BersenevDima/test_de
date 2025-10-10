export const BodyUnLock = (timeout = 300) => {
  return new Promise(resolve => {
    setTimeout(() => {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "visible";
      resolve();
    }, timeout);
  });
};