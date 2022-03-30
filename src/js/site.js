import * as events from './trackEvents';
import * as formValidation from './fromValidation';
import { listenDropdown } from './dropdown';
import { reveal } from './reveal';

import '../sass/site.scss';

listenDropdown();
events.initTrackEvents();
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

window.addEventListener('scroll', reveal);

function validateForm(ev) {
  const $name = document.getElementById('name');
  const $email = document.getElementById('email');
  const $message = document.getElementById('message');

  const hasValidName = formValidation.validateInput($name);
  const hasValidEmail = formValidation.validateInput($email);
  const hasValidMessage = formValidation.validateInput($message);

  if (!hasValidName || !hasValidEmail || !hasValidMessage) {
    ev.preventDefault();

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

// This is called via data-callback
window.captchaCompleted = () => {
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
