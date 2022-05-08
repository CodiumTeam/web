import React, { useState } from 'react';
import { listenDropdown } from '../common/dropdown';
import './challenge.scss';
import './challenge.scss';
import Stepper from './components/Stepper';
import WhatIsTDD from './tdd-challenge/03-WhatIsTdd';
import Welcome from './tdd-challenge/01-Welcome';
import TDDCycle from './tdd-challenge/02-TddCicle';
import Precode from './tdd-challenge/04-PrecodeRememberSep';
import Challenge from './tdd-challenge/05-Challenge';
import Congratulations from './tdd-challenge/06-Congratulations';

listenDropdown();

function TDD() {
  const [answers, setAnswers] = useState({
    whatIsTdd: null,
    tddCycle: null,
  });
  const [isDisable, setIsDisable] = useState(false);

  const handleStepChange = (step) => {
    const whatIsTDDStep = 1;
    const tddCycleStep = 2;

    if (step === whatIsTDDStep && answers.whatIsTdd === null) {
      setIsDisable(true);
    }

    if (step === tddCycleStep && answers.tddCycle === null) {
      setIsDisable(true);
    }
  };

  const handleWhatIsTddAnswer = (id) => {
    setAnswers({ ...answers, whatIsTdd: id });
    setIsDisable(false);
  };

  function handleTDDCicleAnswer() {
    return (id) => {
      setAnswers({ ...answers, tddCycle: id });
      setIsDisable(false);
    };
  }

  return (
    <Stepper isDisabled={isDisable} onStepChange={handleStepChange}>
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
