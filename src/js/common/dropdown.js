import { scrollToElement } from './scrollToElement';

export function listenDropdown() {
  const menuButton = document.getElementById('js-menu-button');
  const menu = document.getElementById('js-menu');

  const controlMobileMenu = () => menu.classList.toggle('is-visible');

  menuButton.addEventListener('click', controlMobileMenu);

  const dropdowns = document.querySelectorAll('.dropdown');

  for (let i = 0; i < dropdowns.length; i++) {
    const dropdown = dropdowns[i];
    dropdown.addEventListener('click', function () {
      dropdown.classList.toggle('active');
    });
  }

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

export function langsSwitcher() {
  const langOptions = document.querySelectorAll('.lang-option');
  const availableLanguages = [];
  Array.from(langOptions).forEach((lang) => {
    const locale = lang.getAttribute('data-locale');
    availableLanguages.push(locale);
    lang.addEventListener('click', (e) => {
      e.preventDefault();
      if (locale) {
        const currentUrl = new URL(window.location.href);
        if (!currentUrl.pathname.includes(`/${locale}/`)) {
          const urls = currentUrl.pathname
            .split('/')
            .filter(Boolean)
            .filter((x) => !availableLanguages.includes(x));
          const url = urls[0] || '';
          currentUrl.pathname = `/${locale}/${url}`.replace('/es/', '');
        }
        window.location.href = currentUrl.href;
      }
    });
  });
}
