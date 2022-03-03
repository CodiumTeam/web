const menuButton = document.getElementById('js-menu-button');
const menu = document.getElementById('js-menu');

const controlMobileMenu = () => menu.classList.toggle('is-visible');

menuButton.addEventListener('click', controlMobileMenu);