import React from 'react';
import './stepper.scss';

export default function Stepper({ step, children, controls }) {
  return (
    <div className="stepper card">
      <div className="stepper__body">{children[step]}</div>
      <div className="stepper__footer">{controls}</div>
    </div>
  );
}

function Step({ children }) {
  return <>{children}</>;
}

function Controls({
  onNextStepClick,
  onBackStepClick,
  nextButtonText = 'Siguiente',
  nextButtonDisabled = false,
  hideBackButton = false,
  step = 0,
}) {
  return (
    <>
      {hideBackButton ? null : step !== 0 ? (
        <button className="button button--outline" onClick={onBackStepClick}>
          Atrás
        </button>
      ) : null}
      <button
        className="button button--primary"
        onClick={onNextStepClick}
        disabled={nextButtonDisabled}
      >
        {nextButtonText}
      </button>
    </>
  );
}

Stepper.Step = Step;
Stepper.Controls = Controls;
