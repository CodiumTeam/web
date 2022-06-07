import * as events from './common/trackEvents';
import { listenDropdown } from './common/dropdown';
import './common/contact-form-with-message';

import '../sass/site.scss';
import { scrollToElement } from './common/scrollToElement';

listenDropdown();
events.initTrackEvents();

document.querySelectorAll('[data-type="card-services"]').forEach((card) => {
  const viewMoreBtn = card.querySelector(
    '[data-type="card-services-view-more"]'
  );
  const viewLessBtn = card.querySelector(
    '[data-type="card-services-view-less"]'
  );
  const cardTitle = card.querySelector('[data-type="card-services-title"]');

  viewMoreBtn.addEventListener('click', () => {
    card.classList.toggle('card--open');
    viewMoreBtn.classList.add('hidden');
    viewLessBtn.classList.remove('hidden');
    scrollToElement(cardTitle);
  });

  viewLessBtn.addEventListener('click', () => {
    card.classList.toggle('card--open');
    viewLessBtn.classList.add('hidden');

    setTimeout(() => {
      viewMoreBtn.classList.remove('hidden');
      scrollToElement(card);
    }, 0);
  });
});
