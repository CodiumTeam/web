import React, { useState } from 'react';
import { listenDropdown } from '../common/dropdown';
import './challenge.scss';
import './challenge.scss';
import Stepper from './components/Stepper';
import WhatIsTDD from './tdd-challenge/what-is-tdd';
import Welcome from './tdd-challenge/welcome';
import TDDCycle from './tdd-challenge/tdd-cicle';
import Precode from './tdd-challenge/Precode';
import Challenge01 from './tdd-challenge/Challenge-01';
import Congratulations from './tdd-challenge/Congratulations';

listenDropdown();

function TDD() {
  const [answers, setAnswers] = useState({
    whatIsTdd: null,
    tddCycle: null,
  });
  const [isDisable, setIsDisable] = useState(false);

  const handleStepChange = (step) => {
    if (step === 1 && answers.whatIsTdd === null) {
      setIsDisable(true);
    }

    if (step === 2 && answers.tddCycle === null) {
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
        <Challenge01 />
      </Stepper.Step>
      <Stepper.Step>
        <Congratulations />
      </Stepper.Step>
    </Stepper>
  );
}

export default TDD;
