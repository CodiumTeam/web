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
    radio.addEventListener('change', function (event) {
      const { value } = event.target;

      document.getElementById('js-locality').classList.toggle('hidden');
      document.getElementById('js-numProgrammers').classList.toggle('hidden');

      if (value === 'business') {
        document.getElementById('numProgrammers').focus();
      } else {
        document.getElementById('locality').focus();
      }
    });
  });
