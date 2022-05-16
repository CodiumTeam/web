import { useState } from 'react';
import { useStepper } from './components/Stepper/useStepper';

export function useChallenge({ codeStep, requiredSteps = [] }) {
  const { step, nextStep, prevStep } = useStepper();
  const [stepperBtnText, setStepperBtnText] = useState('Siguiente');
  const [isDisable, setIsDisable] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [required, setRequiredSteps] = useState(requiredSteps);

  function handleNextStep(skipValidation) {
    if (step === codeStep && !skipValidation) {
      setShowExitModal(true);
      return;
    }

    goToNext();
  }

  function goToNext() {
    const currStep = nextStep();
    setStepperBtnText('Siguiente');

    if (required.includes(currStep)) {
      setIsDisable(true);
      return;
    }

    if (currStep === codeStep) {
      setStepperBtnText('Finalizar');
    }
  }

  function handleBackStep() {
    setIsDisable(false);
    prevStep();
  }

  function hideExitModal() {
    setShowExitModal(false);
  }

  function updateRequiredSteps(requiredSteps) {
    setIsDisable(false);
    setRequiredSteps(requiredSteps);
  }

  return {
    handleBackStep,
    handleNextStep,
    showExitModal,
    hideExitModal,
    stepperBtnText,
    isDisable,
    step,
    updateRequiredSteps,
  };
}
