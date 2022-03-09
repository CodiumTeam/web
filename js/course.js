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

  if (value === 'business') {
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

function hasValue(inputElement) {
  return inputElement.value.length > 0;
}
