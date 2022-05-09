import { useState } from 'react';

export function useStepper() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    const nextStep = step + 1;
    setStep(nextStep);

    return nextStep;
  };

  const prevStep = () => {
    const nextStep = step - 1;
    setStep(nextStep);

    return nextStep;
  };

  return {
    step,
    nextStep,
    prevStep,
  };
}
