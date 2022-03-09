var glide = new Glide('.glide', {
  type: 'carousel',
  perView: 2,
  breakpoints: {
    600: {
      perView: 1,
    },
  },
  gap: 20,
});

glide.mount();

document
  .querySelectorAll('input[type=radio][name="myRadio"]')
  .forEach(function (radio) {
    radio.addEventListener('change', showCorrectInputDependingOnSelectedRadio);
  });

function showCorrectInputDependingOnSelectedRadio(event) {
  const { value } = event.target;

  document.getElementById('js-locality').classList.toggle('hidden');
  document.getElementById('js-numProgrammers').classList.toggle('hidden');

  if (isForBusiness(value)) {
    const $numProgrammers = document.getElementById('numProgrammers');

    if (!hasValue($numProgrammers)) {
      $numProgrammers.focus();
    }
  } else {
    const $localityInput = document.getElementById('locality');

    if (!hasValue($localityInput)) {
      $localityInput.focus();
    }
  }
}

function isForBusiness(value) {
  return value === 'business';
}

function hasValue(inputElement) {
  return inputElement.value.length > 0;
}

document
  .getElementById('contactForm')
  .addEventListener('submit', function (ev) {
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
        return;
      }

      if (!hasValidEmail) {
        $email.focus();
        return;
      }

      if (!hasValidForWhoInput) {
        isForBusiness($radio.value)
          ? $numProgrammers.focus()
          : $locality.focus();
      }
    }
  });

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
