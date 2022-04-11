export const scrollToElement = (element) => {
  const yOffset = document.getElementById('js-header').offsetHeight;
  const blockPadding = 32;
  const y =
    element.getBoundingClientRect().top +
    window.pageYOffset -
    (yOffset + blockPadding);

  window.scrollTo({ top: y, behavior: 'smooth' });
};
