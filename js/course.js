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

    if (!hasValue($name)) {
      ev.preventDefault();
      addErrorToInput($name);
      $name.focus();
    } else {
      clearErrorMessageFromInput($name);
    }

    if (!hasValue($email)) {
      ev.preventDefault();
      addErrorToInput($email);
      $email.focus();
    } else {
      clearErrorMessageFromInput($email);
    }

    if (isForBusiness($radio.value)) {
      if (!hasValue($numProgrammers)) {
        ev.preventDefault();
        addErrorToInput($numProgrammers);
        $numProgrammers.focus();
      } else {
        clearErrorMessageFromInput($radio);
      }
    } else {
      if (!hasValue($locality)) {
        addErrorToInput($locality);
        ev.preventDefault();
        $locality.focus();
      } else {
        clearErrorMessageFromInput($locality);
      }
    }
  });

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
