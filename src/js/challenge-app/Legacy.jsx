import React, { useState } from 'react';
import { listenDropdown } from '../common/dropdown';
import Stepper from './components/Stepper/Stepper';
import Welcome from './legacy-challenge/01-Welcome';
import WhatIsLegacy from './legacy-challenge/02-WhatIsLegacy';
import LegacyChallenge from './legacy-challenge/03-Challenge';
import Congratulations from './legacy-challenge/04-Congratulations';
import ModalExistWarning from './components/ModalExistWarning';
import { useChallenge } from './useChallenge';

listenDropdown();

function Legacy() {
  const steps = {
    whatIsLegacy: 1,
    codeStep: 2,
  };
  const [answers, setAnswers] = useState({
    whatIsLegacy: null,
  });

  const {
    step,
    handleNextStep,
    handleBackStep,
    stepperBtnText,
    isDisable,
    showExitModal,
    hideExitModal,
    updateRequiredSteps,
  } = useChallenge({
    codeStep: steps.codeStep,
    requiredSteps: [steps.whatIsLegacy],
  });

  function handleWhatIsLegactAnswer(answerId) {
    setAnswers({ ...answers, whatIsLegacy: answerId });
    updateRequiredSteps([]);
  }

  function isInLastStep() {
    return step >= steps.codeStep + 1;
  }

  return (
    <>
      <Stepper
        step={step}
        controls={
          isInLastStep() ? null : (
            <Stepper.Controls
              step={step}
              onNextStepClick={() => {
                handleNextStep(false);
              }}
              onBackStepClick={() => {
                handleBackStep(false);
              }}
              nextButtonText={stepperBtnText}
              nextButtonDisabled={isDisable}
              hideBackButton={step === steps.codeStep}
            />
          )
        }
      >
        <Stepper.Step>
          <Welcome />
        </Stepper.Step>
        <Stepper.Step>
          <WhatIsLegacy
            onSelect={handleWhatIsLegactAnswer}
            userAnswer={answers.whatIsTdd}
          />
        </Stepper.Step>
        <Stepper.Step>
          <LegacyChallenge />
        </Stepper.Step>
        <Stepper.Step>
          <Congratulations />
        </Stepper.Step>
      </Stepper>
      {showExitModal && (
        <ModalExistWarning
          modalIsOpen={showExitModal}
          onExit={() => {
            hideExitModal(false);
            handleNextStep(true);
          }}
          onCancel={() => {
            hideExitModal(false);
          }}
        />
      )}
    </>
  );
}

export default Legacy;
