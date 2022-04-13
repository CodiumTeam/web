import { scrollToElement } from './scrollToElement';

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

      if (anchor.parentNode.classList.contains('dropdown') && isMobile()) {
        return;
      }

      const element = document.querySelector(this.getAttribute('href'));

      if (!element) return;

      scrollToElement(element);
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

  function isMobile() {
    const MIN_SIZE_TO_SHOW_MOBILE_MENU_ICON = 768;

    return window.screen.availWidth < MIN_SIZE_TO_SHOW_MOBILE_MENU_ICON;
  }
}
