import Glide, {
  Controls,
  Breakpoints,
} from '@glidejs/glide/dist/glide.modular.esm';
import { isInView } from 'isinview';
import * as events from './common/trackEvents';
import * as formValidation from './common/fromValidation';
import { langsSwitcher, listenDropdown } from './common/dropdown';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import { scrollToElement } from './common/scrollToElement';
import '../sass/course.scss';
import { sendEmail } from './email-sender';
import { configureFormWithRecaptcha } from './common/recaptcha-loader';

listenDropdown();
langsSwitcher();
events.initTrackEvents();
mountOpinionCarousel();
mountClientsCarousel();
listenForRadioChangeInForm();
animateSummaryNumbers();
initContactForm();

function animateSummaryNumbers() {
  document.querySelectorAll('.circle-number-js').forEach(function (circle) {
    isInView(
      circle,
      (target) => {
        const circleNumber = Number(target.innerText);
        animateValue(circle, 0, circleNumber, 1500);
      },
      { once: true }
    );
  });

  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }
}

function mountOpinionCarousel() {
  if (document.getElementById('opinion') === null) return;
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

function mountClientsCarousel() {
  if (document.getElementById('clients') === null) return;
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

// This is a fix for https://github.com/glidejs/glide/issues/417
function addClientEventForArrows(arrowClass, glide) {
  const glideArrows = document.querySelectorAll(arrowClass);

  glideArrows.forEach(function (glideArrow) {
    glideArrow.addEventListener('click', function () {
      glide.go(glideArrow.dataset.glideDir);
    });
  });
}

function listenForRadioChangeInForm() {
  document
    .getElementById('for-company')
    .addEventListener('change', showForMyCompany);
  document.getElementById('for-me').addEventListener('change', showForMe);

  function showForMyCompany() {
    document.getElementById('js-locality').classList.add('hidden');
    document.getElementById('js-numProgrammers').classList.remove('hidden');
    document
      .getElementById('email')
      .setAttribute('placeholder', 'mi-email@empresa.com');
    document.getElementById('email-label').innerHTML = 'Email de empresa';
  }

  function showForMe() {
    document.getElementById('js-locality').classList.remove('hidden');
    document.getElementById('js-numProgrammers').classList.add('hidden');
    document
      .getElementById('email')
      .setAttribute('placeholder', 'mi@email.com');
    document.getElementById('email-label').innerHTML = 'Email';
  }
}

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  configureFormWithRecaptcha(contactForm, validateForm);
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

function isForBusiness(value) {
  return value === 'business';
}

// This is called via data-callback
window.onContactFormSubmit = () => {
  const response = grecaptcha.getResponse();
  if (response.length === 0) {
    return;
  }

  const isValid = validateForm();
  if (!isValid) {
    grecaptcha.reset();
    return;
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const utm_source = urlParams.get('utm_source') || 'Direct';
  const utm_term = urlParams.get('utm_term') || '';
  const $form = document.getElementById('contactForm');
  const formData = new FormData($form);
  const $errorBlock = document.getElementById('js-show-error');
  const $sentButton = document.getElementById('js-submit');
  const trainingType = $form.getAttribute('data-training-type');
  formData.append('trainingType', trainingType);
  formData.append('utm_source', utm_source);
  formData.append('utm_term', utm_term);
  formData.append('referrer', document.referrer || document.location.href);

  $sentButton.disabled = true;

  sendEmail(Object.fromEntries(formData.entries()))
    .then(function (response) {
      grecaptcha.reset();

      if (response.status === 200) {
        events.trackEventGTag('contact_us', {
          trainingType,
        });
        events.trackEvent('contact_us', 'sent', trainingType);
        $form.remove();
        $errorBlock.remove();

        const $successBlock = document.getElementById('js-show-success');
        $successBlock.classList.remove('hidden');

        const yOffset = document.getElementById('js-header').offsetHeight;
        const y =
          $successBlock.getBoundingClientRect().top +
          window.pageYOffset -
          yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        $errorBlock.classList.remove('hidden');
        scrollToElement($errorBlock);
        events.trackEvent('contact_us', 'failed', trainingType);
        $sentButton.disabled = false;
      }
    })
    .catch(() => {
      grecaptcha.reset();
      $errorBlock.classList.remove('hidden');
      scrollToElement($errorBlock);
      events.trackEvent('contact_us', 'failed', trainingType);
      $sentButton.disabled = false;
    });
};
