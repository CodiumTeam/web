import React from 'react';
import { listenDropdown } from '../common/dropdown';
import './challenge.scss';
import sdk from '@stackblitz/sdk';
import './challenge.scss';
import Stepper from './components/Stepper';
import WhatIsTDD from './tdd-challenge/what-is-tdd';
import Welcome from './tdd-challenge/welcome';
import TDDCycle from './tdd-challenge/tdd-cicle';
import Precode from './components/Precode';

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
    </Stepper>
  );
}

export default TDD;
