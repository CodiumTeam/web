import * as events from './common/trackEvents';
import * as formValidation from './common/fromValidation';
import { listenDropdown } from './common/dropdown';

import '../sass/site.scss';

listenDropdown();
events.initTrackEvents();
handleFormSubmit();

function validateForm() {
  const $name = document.getElementById('name');
  const $email = document.getElementById('email');
  const $message = document.getElementById('message');

  const hasValidName = formValidation.validateInput($name);
  const hasValidEmail = formValidation.validateInput($email);
  const hasValidMessage = formValidation.validateInput($message);

  if (!hasValidName || !hasValidEmail || !hasValidMessage) {
    if (!hasValidName) {
      $name.focus();
      return false;
    }

    if (!hasValidEmail) {
      $email.focus();
      return false;
    }

    if (!hasValidMessage) {
      $message.focus();
      return false;
    }
  }

  return true;
}

function handleFormSubmit() {
  document
    .getElementById('contactForm')
    .addEventListener('submit', function (event) {
      event.preventDefault();

      const isValid = validateForm();

      if (!isValid) return;

      if (!grecaptcha.getResponse()) {
        grecaptcha.execute();
        return;
      }
    });
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

  document.getElementById('js-submit').disabled = true;

  fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then(function (response) {
      if (response.ok) {
        events.trackEvent('contact_us', 'sent', 'home');
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
        events.trackEvent('contact_us', 'failed', 'home');
        document.getElementById('js-submit').disabled = false;
      }
    })
    .catch((error) => {
      events.trackEvent('contact_us', 'failed', 'home');
      document.getElementById('js-submit').disabled = false;
    });
};
