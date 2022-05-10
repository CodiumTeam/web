import React, { useState } from 'react';
import { listenDropdown } from '../common/dropdown';
import Stepper from './components/Stepper/Stepper';
import { useStepper } from './components/Stepper/useStepper';
import Welcome from './legacy-challenge/01-Welcome';
import WhatIsLegacy from './legacy-challenge/02-WhatIsLegacy';
import LegacyChallenge from './legacy-challenge/03-Challenge';
import Congratulations from './legacy-challenge/04-Congratulations';
import ModalExistWarning from './components/ModalExistWarning';

listenDropdown();

function Legacy() {
  const codeStep = 2;
  const { step, nextStep, prevStep } = useStepper();
  const [stepperBtnText, setStepperBtnText] = useState('Siguiente');
  const [isDisable, setIsDisable] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [answers, setAnswers] = useState({
    whatIsLegacy: null,
  });

  function handleNextStep() {
    if (step === codeStep) {
      setShowExitModal(true);
      return;
    }

    goToNext();
  }

  function goToNext() {
    const whatIsLegacyStep = 1;
    const currStep = nextStep();
    setStepperBtnText('Siguiente');

    if (whatIsLegacyStep == currStep) {
      if (answers.whatIsLegacy === null) {
        setIsDisable(true);
      }
    }

    if (currStep === codeStep) {
      setStepperBtnText('Finalizar');
    }
  }

  function handleBackStep() {
    setIsDisable(false);
    prevStep();
  }

  function handleWhatIsLegactAnswer(answerId) {
    setAnswers({ ...answers, whatIsLegacy: answerId });
    setIsDisable(false);
  }

  return (
    <>
      <Stepper
        step={step}
        controls={
          step >= codeStep + 1 ? null : (
            <Stepper.Controls
              step={step}
              onNextStepClick={handleNextStep}
              onBackStepClick={handleBackStep}
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
            setShowExitModal(false);
            goToNext();
          }}
          onCancel={() => {
            setShowExitModal(false);
          }}
        />
      )}
    </>
  );
}

export default Legacy;
