import React, { useState } from 'react';
import { listenDropdown } from '../common/dropdown';
import './challenge.scss';
import './challenge.scss';
import Stepper from './components/Stepper/Stepper';
import WhatIsTDD from './tdd-challenge/03-WhatIsTdd';
import Welcome from './tdd-challenge/01-Welcome';
import TDDCycle from './tdd-challenge/02-TddCicle';
import Precode from './tdd-challenge/04-PrecodeRememberSep';
import Challenge from './tdd-challenge/05-Challenge';
import Congratulations from './tdd-challenge/06-Congratulations';
import { useStepper } from './components/Stepper/useStepper';

listenDropdown();

function TDD() {
  const codeStep = 4;
  const { step, nextStep, prevStep } = useStepper(6);
  const [stepperBtnText, setStepperBtnText] = useState('Siguiente');
  const [answers, setAnswers] = useState({
    whatIsTdd: null,
    tddCycle: null,
  });
  const [isDisable, setIsDisable] = useState(false);

  function handleNextStep() {
    const currStep = nextStep();
    const whatIsTDDStep = 1;
    const tddCycleStep = 2;
    if (currStep === whatIsTDDStep && answers.whatIsTdd === null) {
      setIsDisable(true);
    }

    if (currStep === tddCycleStep && answers.tddCycle === null) {
      setIsDisable(true);
    }

    if (currStep === codeStep) {
      setStepperBtnText('Finalizar');
    } else {
      setStepperBtnText('Siguiente');
    }
  }

  function handleBackStep() {
    setIsDisable(false);
    prevStep();
  }

  function handleWhatIsTddAnswer(id) {
    setAnswers({ ...answers, whatIsTdd: id });
    setIsDisable(false);
  }

  function handleTDDCicleAnswer() {
    return (id) => {
      setAnswers({ ...answers, tddCycle: id });
      setIsDisable(false);
    };
  }

  return (
    <Stepper
      step={step}
      controls={
        <Stepper.Controls
          step={step}
          onNextStepClick={handleNextStep}
          onBackStepClick={handleBackStep}
          nextButtonText={stepperBtnText}
          nextButtonDisabled={isDisable}
          hideBackButton={step === codeStep}
        />
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
          onSelect={handleTDDCicleAnswer()}
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
  );
}

export default TDD;
