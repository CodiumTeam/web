export function validateInput($input) {
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
