export function options(parentId, onRender, onSelect) {
  const parent = document.getElementById(parentId);
  const optionSolutionIndex = parseInt(parent.dataset.answer, 10);
  const options = parent.querySelectorAll('.options__option');
  let selected = false;
  options.forEach((option, index) => {
    option.addEventListener(
      'click',
      function handleClick() {
        if (selected) return;
        selected = true;
        let item = index + 1;
        if (item === optionSolutionIndex) {
          option.classList.add('options__option--correct');
        } else {
          option.classList.add('options__option--wrong');
          parent.parentElement
            .querySelector('#show-answer')
            .classList.remove('hidden');
        }

        onSelect();
      },
      { once: true }
    );
  });
}
