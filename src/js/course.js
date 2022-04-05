import Glide, {
  Controls,
  Breakpoints,
} from '@glidejs/glide/dist/glide.modular.esm';

import * as events from './common/trackEvents';
import * as formValidation from './common/fromValidation';
import { listenDropdown } from './common/dropdown';

import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
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

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    if (!grecaptcha.getResponse()) {
      grecaptcha.execute();
      return;
    }
  });

function mountOpinionCarousel() {
  const glide = new Glide('#opinion', {
    type: 'carousel',
    autoplay: 5000,
    startAt: 0,
    perView: 2,
    focusAt: 'center',
    breakpoints: {
      600: {
        perView: 1,
      },
    },
    gap: 20,
  });

  glide.mount({ Controls, Breakpoints });

  addClientEventForArrows('.js-opinion-arrow', glide);
}

// This is a fix for https://github.com/glidejs/glide/issues/417
function addClientEventForArrows(arrowClass, glide) {
  const glideArrows = document.querySelectorAll(arrowClass);

  glideArrows.forEach(function (glideArrow) {
    glideArrow.addEventListener('click', function () {
      glide.go(glideArrow.dataset.glideDir);
    });
  });
}

function mountClientsCarousel() {
  const clients = document.querySelector('#clients');

  if (!clients) return;

  const glide = new Glide('#clients', {
    type: 'carousel',
    autoplay: false,
    startAt: 0,
    gap: 10,
    perView: 5,
    breakpoints: {
      450: {
        perView: 1,
      },
      600: {
        perView: 2,
      },
      900: {
        perView: 3,
      },
      980: {
        perView: 4,
      },
    },
  });

  glide.mount({ Controls, Breakpoints });

  addClientEventForArrows('.js-clients-arrow', glide);
}

function showCorrectInputDependingOnSelectedRadio(event) {
  const { value } = event.target;

  document.getElementById('js-locality').classList.toggle('hidden');
  document.getElementById('js-numProgrammers').classList.toggle('hidden');
}

function isForBusiness(value) {
  return value === 'business';
}

function validateForm() {
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
  const isValid = validateForm();

  if (!isValid) {
    grecaptcha.reset();
    return;
  }

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
