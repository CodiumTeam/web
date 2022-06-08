import * as events from './common/trackEvents';
import { listenDropdown } from './common/dropdown';
import './common/contact-form-with-message';

import '../sass/site.scss';
import { scrollToElement } from './common/scrollToElement';
import { isInView } from 'isinview';

listenDropdown();
events.initTrackEvents();

document
  .querySelectorAll('[data-type="card-services"]')
  .forEach((card, index, arr) => {
    let randomNumber = Math.floor(Math.random() * arr.length);
    const collectionID = 856079;

    isInView(
      card,
      () => {
        fetch(
          `https://source.unsplash.com/collection/${collectionID}/?sig=${randomNumber}&blur`
        ).then((response) => {
          const image = card.querySelector('[data-type="card-services-image"]');
          image.style.backgroundImage = `url(${response.url})`;
        });
      },
      { once: true }
    );

    const viewMoreBtn = card.querySelector(
      '[data-type="card-services-view-more"]'
    );
    const viewLessBtn = card.querySelector(
      '[data-type="card-services-view-less"]'
    );
    const iWantItBtn = card.querySelector('[data-role="button"]');

    iWantItBtn.addEventListener('click', (ev) => {
      const serviceType = ev.target.dataset.type;
      const $serviceNameInput = document.querySelector('#serviceName');
      $serviceNameInput.value = serviceType;
    });

    viewMoreBtn.addEventListener('click', () => {
      card.classList.toggle('card--open');
      viewMoreBtn.classList.add('hidden');
      viewLessBtn.classList.remove('hidden');
      scrollToElement(card);
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
