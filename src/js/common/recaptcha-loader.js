import { ScriptLoader } from './script-loader';

export function configureFormWithRecaptcha(formElement, validate) {
  const submitButtons = [
    ...formElement.getElementsByTagName('button'),
    ...formElement.getElementsByTagName('submit'),
  ];
  const formInputs = [
    ...formElement.getElementsByTagName('input'),
    ...formElement.getElementsByTagName('select'),
    ...formElement.getElementsByTagName('textarea'),
  ];

  function disableSubmitButtons() {
    submitButtons.forEach((button) => {
      button.setAttribute('disabled', true);
    });
  }

  function enableSubmitButtons() {
    submitButtons.forEach((button) => {
      button.removeAttribute('disabled');
    });
  }

  function loadRecaptcha(onload) {
    window._onRecaptchaLoaded = onload;

    ScriptLoader.addScript(
      'https://www.google.com/recaptcha/api.js?onload=_onRecaptchaLoaded',
      {
        defer: true,
      }
    );
  }

  let startRecaptcha = () => {
    disableSubmitButtons();
    loadRecaptcha(() => {
      enableSubmitButtons();
    });
  };

  formInputs.forEach((input) => {
    input.addEventListener('click', () => {
      startRecaptcha();
      startRecaptcha = () => {};
    });
  });

  formElement.addEventListener('submit', function (event) {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    if (!grecaptcha.getResponse()) {
      grecaptcha.execute();
    }
  });
}
