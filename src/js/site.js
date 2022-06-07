import * as events from './common/trackEvents';
import { listenDropdown } from './common/dropdown';
import './common/contact-form-with-message';

import '../sass/site.scss';

listenDropdown();
events.initTrackEvents();

document.querySelectorAll('[data-type="card-services"]').forEach((card) => {
  const viewMoreBtn = card.querySelector(
    '[data-type="card-services-view-more"]'
  );

  const viewLessBtn = card.querySelector(
    '[data-type="card-services-view-less"]'
  );

  viewMoreBtn.addEventListener('click', () => {
    card.classList.toggle('card--open');
    viewMoreBtn.classList.add('hidden');
  });

  viewLessBtn.addEventListener('click', () => {
    card.classList.toggle('card--open');
    setTimeout(() => {
      viewMoreBtn.classList.remove('hidden');
    }, 0);
  });
});
