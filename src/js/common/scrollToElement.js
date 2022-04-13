export const scrollToElement = (element) => {
  const yOffset = document.getElementById('js-header').offsetHeight;
  const y = element.getBoundingClientRect().top + window.pageYOffset - yOffset;

  window.scrollTo({ top: y, behavior: 'smooth' });
};
