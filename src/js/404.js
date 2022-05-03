import { listenDropdown } from './common/dropdown';

import '../sass/404.scss';

listenDropdown();

setTimeout(() => {
  document.querySelector('.not-found').classList.remove('hidden');
  document.querySelector('.not-found').classList.add('fade-in');

  document.querySelectorAll('[data-blob]').forEach((el) => {
    el.classList.add('blob');
  });

  document.querySelector('[data-liquid]').classList.add('liquid');
}, 6000);
