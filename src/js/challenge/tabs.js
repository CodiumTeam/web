export function tabs(parentId) {
  const parentTab = document.getElementById(parentId);
  const tabs = parentTab.querySelectorAll('[role="tab"]');
  const nextButton = parentTab.querySelector('[data-action="next"]');
  let currentStep = 0;

  nextButton.onclick = goNext;

  function goNext(e) {
    e.preventDefault();
    currentStep += 1;

    if (currentStep > tabs.length) {
      return;
    }

    goToStep(currentStep);
  }

  function goToStep(stepNumber) {
    currentStep = stepNumber;

    //hide all input
    for (let i = 0; i < tabs.length; ++i) {
      if (i === currentStep) {
        show(tabs[i]);
      } else {
        hide(tabs[i]);
      }
    }
  }

  function show(elem) {
    elem.classList.remove('hidden');
  }

  function hide(elem) {
    elem.classList.add('hidden');
  }
}
