import * as formValidation from './fromValidation';
import { scrollToElement } from './scrollToElement';
import * as events from './trackEvents';

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

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const utm_source = urlParams.get('utm_source') || 'Direct';
  const utm_term = urlParams.get('utm_term') || '';
  const $form = document.getElementById('contactForm');
  const formData = new FormData($form);
  const trainingType = $form.getAttribute('data-training-type');
  const $errorBlock = document.getElementById('js-show-error');

  formData.append('trainingType', trainingType);
  formData.append('utm_source', utm_source);
  formData.append('utm_term', utm_term);

  const $sentButton = document.getElementById('js-submit');
  $sentButton.disabled = true;

  fetch('/php/contact.php', {
    method: 'POST',
    body: formData,
  })
    .then(function (response) {
      grecaptcha.reset();
      if (response.ok) {
        events.trackEventGTag('contact_us', {
          trainingType,
        });
        events.trackEvent('contact_us', 'sent', 'home');
        $form.remove();

        const $successBlock = document.getElementById('js-show-success');
        $successBlock.classList.remove('hidden');

        const yOffset = document.getElementById('js-header').offsetHeight;
        const y =
          $successBlock.getBoundingClientRect().top +
          window.pageYOffset -
          yOffset;

        $errorBlock.remove();
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        $errorBlock.classList.remove('hidden');
        scrollToElement($errorBlock);
        events.trackEvent('contact_us', 'failed', 'home');
        $sentButton.disabled = false;
      }
    })
    .catch(() => {
      grecaptcha.reset();
      $errorBlock.classList.remove('hidden');
      scrollToElement($errorBlock);
      events.trackEvent('contact_us', 'failed', 'home');
      $sentButton.disabled = false;
    });
};
