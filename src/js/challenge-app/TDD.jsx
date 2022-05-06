import React from 'react';
import { listenDropdown } from '../common/dropdown';
import './challenge.scss';
import './challenge.scss';
import Stepper from './components/Stepper';
import WhatIsTDD from './tdd-challenge/what-is-tdd';
import Welcome from './tdd-challenge/welcome';
import TDDCycle from './tdd-challenge/tdd-cicle';
import Precode from './tdd-challenge/Precode';
import Challenge01 from './tdd-challenge/Challenge-01';

listenDropdown();

function TDD() {
  return (
    <Stepper>
      <Stepper.Step>
        <Welcome />
      </Stepper.Step>
      <Stepper.Step>
        <WhatIsTDD />
      </Stepper.Step>
      <Stepper.Step>
        <TDDCycle />
      </Stepper.Step>
      <Stepper.Step>
        <Precode />
      </Stepper.Step>
      <Stepper.Step>
        <Challenge01 />
      </Stepper.Step>
    </Stepper>
  );
}

export default TDD;
