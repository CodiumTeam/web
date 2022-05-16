import React, { useState } from 'react';
import { listenDropdown } from '../common/dropdown';
import Stepper from './components/Stepper/Stepper';
import WhatIsTDD from './tdd-challenge/02-WhatIsTdd';
import Welcome from './tdd-challenge/01-Welcome';
import TDDCycle from './tdd-challenge/03-TddCicle';
import Precode from './tdd-challenge/04-PrecodeRememberSep';
import Challenge from './tdd-challenge/05-Challenge';
import Congratulations from './tdd-challenge/06-Congratulations';
import ModalExistWarning from './components/ModalExistWarning';
import { useChallenge } from './useChallenge';

listenDropdown();

function TDD() {
  const codeStep = 4;
  const [answers, setAnswers] = useState({
    whatIsTdd: null,
    tddCycle: null,
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
    codeStep,
    requiredSteps: [1, 2],
  });

  function handleWhatIsTddAnswer(id) {
    updateRequiredSteps([2]);
    setAnswers({ ...answers, whatIsTdd: id });
  }

  function handleTDDCicleAnswer(id) {
    updateRequiredSteps([]);
    setAnswers({ ...answers, tddCycle: id });
  }

  return (
    <>
      <Stepper
        step={step}
        codeStep={4}
        controls={
          step >= codeStep + 1 ? null : (
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
              hideBackButton={step === codeStep}
            />
          )
        }
      >
        <Stepper.Step>
          <Welcome />
        </Stepper.Step>
        <Stepper.Step>
          <WhatIsTDD
            onSelect={handleWhatIsTddAnswer}
            userAnswer={answers.whatIsTdd}
          />
        </Stepper.Step>
        <Stepper.Step>
          <TDDCycle
            onSelect={handleTDDCicleAnswer}
            userAnswer={answers.tddCycle}
          />
        </Stepper.Step>
        <Stepper.Step>
          <Precode />
        </Stepper.Step>
        <Stepper.Step>
          <Challenge />
        </Stepper.Step>
        <Stepper.Step>
          <Congratulations />
        </Stepper.Step>
      </Stepper>
      {showExitModal && (
        <ModalExistWarning
          onExit={() => {
            hideExitModal();
            handleNextStep(true);
          }}
          onCancel={() => {
            hideExitModal();
          }}
        />
      )}
    </>
  );
}

export default TDD;
