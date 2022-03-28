const $contactForm = document.getElementById('contactForm');

$contactForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const isValid = true;

  if (!isValid) return;

  if (!grecaptcha.getResponse()) {
    grecaptcha.execute();
    return;
  }
});

// This is called via data-callback
function captchaCompleted() {
  debugger;

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
