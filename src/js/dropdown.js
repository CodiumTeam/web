export function listenDropdown() {
  const menuButton = document.getElementById('js-menu-button');
  const menu = document.getElementById('js-menu');

  const controlMobileMenu = () => menu.classList.toggle('is-visible');

  menuButton.addEventListener('click', controlMobileMenu);

  const dropdown = document.querySelector('.dropdown');
  dropdown.addEventListener('click', function () {
    dropdown.classList.toggle('active');
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const yOffset = document.getElementById('js-header').offsetHeight;
      const blockPadding = 32;
      const element = document.querySelector(this.getAttribute('href'));

      if (!element) return;

      const y =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        (yOffset + blockPadding);

      window.scrollTo({ top: y, behavior: 'smooth' });

      menu.classList.remove('is-visible');
    });
  });

  document.addEventListener('click', function (event) {
    const clickedElement = event.target;
    const dropdowns = document.querySelectorAll('.dropdown');
    if (clickedElement.closest('.navbar__item') === null) {
      for (const dropdown of dropdowns) {
        dropdown.classList.remove('active');
      }
    }
  });
}
