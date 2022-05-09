import React, { useState, Fragment } from 'react';
import './stepper.scss';

export default function Stepper({
  children,
  isDisabled,
  onStepChange = () => {},
  btnText = 'Siguiente',
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    const step = currentStep + 1;
    onStepChange(step, isLastStep());
    setCurrentStep(step);
  };

  const isLastStep = () => {
    return currentStep === children.length - 1;
  };

  const handlePrevious = () => {
    const step = currentStep - 1;
    onStepChange(step, isLastStep());
    setCurrentStep(step);
  };

  return (
    <Fragment>
      <div className="stepper card">
        <div className="stepper__body">{children[currentStep]}</div>

        <div className="stepper__footer">
          {currentStep > 0 && (
            <button
              className="button button--secondary"
              onClick={handlePrevious}
            >
              Atrás
            </button>
          )}
          {!isLastStep() ? (
            <button
              className="button button--primary"
              onClick={handleNext}
              disabled={isDisabled}
            >
              {btnText}
            </button>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

function Step({ children }) {
  return <>{children}</>;
}

Stepper.Step = Step;
