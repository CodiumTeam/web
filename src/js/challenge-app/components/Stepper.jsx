import React, { useState, Fragment } from 'react';
import './stepper.scss';

export default function Stepper({ children }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
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
          <button
            className="button button--primary"
            onClick={handleNext}
            disabled={currentStep >= children.length - 1}
          >
            Continuar
          </button>
        </div>
      </div>
    </Fragment>
  );
}

function Step({ children }) {
  return <div>{children}</div>;
}

Stepper.Step = Step;
