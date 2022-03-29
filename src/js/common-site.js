const menuButton = document.getElementById('js-menu-button');
const menu = document.getElementById('js-menu');

const controlMobileMenu = () => menu.classList.toggle('is-visible');

menuButton.addEventListener('click', controlMobileMenu);

const dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function () {
  dropdown.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const yOffset = document.getElementById('js-header').offsetHeight;
    const blockPadding = 32;
    const element = document.querySelector(this.getAttribute('href'));

    if (!element) return;

    const y =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      (yOffset + blockPadding);

    window.scrollTo({ top: y, behavior: 'smooth' });

    menu.classList.remove('is-visible');
  });
});

document.addEventListener('click', function (event) {
  const clickedElement = event.target;
  const dropdowns = document.querySelectorAll('.dropdown');
  if (clickedElement.closest('.navbar__item') === null) {
    for (const dropdown of dropdowns) {
      dropdown.classList.remove('active');
    }
  }
});

const trackEvents = document.querySelectorAll('[data-trackevent]');
trackEvents.forEach((element) => {
  element.addEventListener('click', (event) => {
    const events = (event.currentTarget.dataset.trackevent || '').split('.');
    trackEvent(events[0], events[1], events[2]);
  });
});

function validateInput($input) {
  if (!hasValue($input)) {
    addErrorToInput($input);

    return false;
  }

  clearErrorMessageFromInput($input);

  return true;
}

function hasValue(inputElement) {
  return inputElement.value.length > 0;
}

function addErrorToInput($input) {
  $input.classList.add('has-error');

  if ($input.nextElementSibling) return;

  const el = document.createElement('span');
  el.classList.add('error-message');
  el.innerHTML = 'Campo requerido';
  insertAfter($input, el);
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function clearErrorMessageFromInput($input) {
  $input.classList.remove('has-error');
  $input.nextElementSibling && $input.nextElementSibling.remove();
}

function trackEvent(category, action, label) {
  ga && ga('send', 'event', category, action, label);
}
