import * as events from './trackEvents';
import * as formValidation from './fromValidation';
import { listenDropdown } from './dropdown';

import '../sass/site.scss';
import '../sass/course.scss';

listenDropdown();
events.initTrackEvents();
mountOpinionCarousel();
mountClientsCarousel();

document
  .querySelectorAll('input[type=radio][name="myRadio"]')
  .forEach(function (radio) {
    radio.addEventListener('change', showCorrectInputDependingOnSelectedRadio);
  });

document
  .getElementById('contactForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const isValid = validateForm(event);

    if (!isValid) return;

    if (!grecaptcha.getResponse()) {
      grecaptcha.execute();
      return;
    }
  });

function mountOpinionCarousel() {
  new Glide('#opinion', {
    type: 'carousel',
    autoplay: 2500,
    startAt: 0,
    perView: 2,
    focusAt: 'center',
    breakpoints: {
      600: {
        perView: 1,
      },
    },
    gap: 20,
  }).mount();
}

function mountClientsCarousel() {
  new Glide('#clients', {
    type: 'carousel',
    autoplay: 2500,
    startAt: 0,
    gap: 20,
    perView: 5,
    breakpoints: {
      700: {
        perView: 3,
      },
      450: {
        perView: 2,
      },
      350: {
        perView: 1,
      },
      800: {
        perView: 4,
      },
    },
  }).mount();
}

function showCorrectInputDependingOnSelectedRadio(event) {
  const { value } = event.target;

  document.getElementById('js-locality').classList.toggle('hidden');
  document.getElementById('js-numProgrammers').classList.toggle('hidden');
}

function isForBusiness(value) {
  return value === 'business';
}

function validateForm(ev) {
  const $name = document.getElementById('name');
  const $email = document.getElementById('email');
  const $radio = document.querySelector('input[name="myRadio"]:checked');
  const $locality = document.getElementById('locality');
  const $numProgrammers = document.getElementById('numProgrammers');

  const hasValidName = formValidation.validateInput($name);
  const hasValidEmail = formValidation.validateInput($email);
  const hasValidForWhoInput = isForBusiness($radio.value)
    ? formValidation.validateInput($numProgrammers)
    : formValidation.validateInput($locality);

  if (!hasValidName || !hasValidEmail || !hasValidForWhoInput) {
    ev.preventDefault();

    if (!hasValidName) {
      $name.focus();
      return false;
    }

    if (!hasValidEmail) {
      $email.focus();
      return false;
    }

    if (!hasValidForWhoInput) {
      isForBusiness($radio.value) ? $numProgrammers.focus() : $locality.focus();
      return false;
    }
  }

  return true;
}

// This is called via data-callback
window.captchaCompleted = () => {
  const $form = document.getElementById('contactForm');
  const formData = new FormData($form);
  const url = $form.getAttribute('action');

  const trainingType = $form.getAttribute('data-training-type');
  formData.append('trainingType', trainingType);

  document.getElementById('js-submit').disabled = true;

  fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then(function (response) {
      if (response.ok) {
        events.trackEvent('contact_us', 'sent', trainingType);
        $form.remove();

        const $successBlock = document.getElementById('js-show-success');
        $successBlock.classList.remove('hidden');

        const yOffset = document.getElementById('js-header').offsetHeight;
        const y =
          $successBlock.getBoundingClientRect().top +
          window.pageYOffset -
          yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        events.trackEvent('contact_us', 'failed', trainingType);
        document.getElementById('js-submit').disabled = false;
      }
    })
    .catch((error) => {
      events.trackEvent('contact_us', 'failed', trainingType);
      document.getElementById('js-submit').disabled = false;
    });
};
