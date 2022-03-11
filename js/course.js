var glide = new Glide('.glide', {
  type: 'carousel',
  perView: 2,
  focusAt: 'center',
  breakpoints: {
    600: {
      perView: 1,
    },
  },
  gap: 20,
});

function showCorrectInputDependingOnSelectedRadio(event) {
  const { value } = event.target;

  document.getElementById('js-locality').classList.toggle('hidden');
  document.getElementById('js-numProgrammers').classList.toggle('hidden');
}

function isForBusiness(value) {
  return value === 'business';
}

function hasValue(inputElement) {
  return inputElement.value.length > 0;
}

function validateForm(ev) {
  const $name = document.getElementById('name');
  const $email = document.getElementById('email');
  const $radio = document.querySelector('input[name="myRadio"]:checked');
  const $locality = document.getElementById('locality');
  const $numProgrammers = document.getElementById('numProgrammers');

  const hasValidName = validateInput($name);
  const hasValidEmail = validateInput($email);
  const hasValidForWhoInput = isForBusiness($radio.value)
    ? validateInput($numProgrammers)
    : validateInput($locality);

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

function validateInput($input) {
  if (!hasValue($input)) {
    addErrorToInput($input);

    return false;
  }

  clearErrorMessageFromInput($input);

  return true;
}

function addErrorToInput($input) {
  $input.classList.add('has-error');

  if ($input.nextElementSibling) return;

  const el = document.createElement('span');
  el.innerHTML = '<span class="error-message">Campo requerido</span>';
  insertAfter($input, el);
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function clearErrorMessageFromInput($input) {
  $input.classList.remove('has-error');
  $input.nextElementSibling && $input.nextElementSibling.remove();
}

glide.mount();

document
  .querySelectorAll('input[type=radio][name="myRadio"]')
  .forEach(function (radio) {
    radio.addEventListener('change', showCorrectInputDependingOnSelectedRadio);
  });

document.getElementById('contactForm').addEventListener('submit', function () {
  event.preventDefault();

  const isValid = validateForm(event);

  if (!isValid) return;

  if (!grecaptcha.getResponse()) {
    grecaptcha.execute();
    return;
  }
});

// This is called via data-callback
function captchaCompleted() {
  const $form = document.getElementById('contactForm');
  const formData = new FormData($form);
  const url = $form.getAttribute('action');

  formData.append('trainingType', $form.getAttribute('data-training-type'));

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
        document.getElementById('js-submit').disabled = false;
      }
    })
    .catch((error) => {
      document.getElementById('js-submit').disabled = false;
    });
}
