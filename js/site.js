const $contactForm = document.getElementById('contactForm');

$contactForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const isValid = validateForm(event);

  if (!isValid) return;

  if (!grecaptcha.getResponse()) {
    grecaptcha.execute();
    return;
  }
});

function validateForm(ev) {
  const $name = document.getElementById('name');
  const $email = document.getElementById('email');
  const $message = document.getElementById('message');

  const hasValidName = validateInput($name);
  const hasValidEmail = validateInput($email);
  const hasValidMessage = validateInput($message);

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
function captchaCompleted() {
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
        console.log(response);
        document.getElementById('js-submit').disabled = false;
      }
    })
    .catch((error) => {
      console.log(error);
      document.getElementById('js-submit').disabled = false;
    });
}
