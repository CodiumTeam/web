import React from 'react';
import { listenDropdown } from '../common/dropdown';
import './challenge.scss';
import sdk from '@stackblitz/sdk';
import './challenge.scss';
import Stepper from './components/Stepper';
import WhatIsTDD from './tdd-challenge/what-is-tdd';
import Introduction from './tdd-challenge/introduction';
import TDDCycle from './tdd-challenge/tdd-cicle';

listenDropdown();

function TDD() {
  return (
    <Stepper>
      <Stepper.Step>
        <Introduction />
      </Stepper.Step>
      <Stepper.Step>
        <WhatIsTDD />
      </Stepper.Step>
      <Stepper.Step>
        <TDDCycle />
      </Stepper.Step>
    </Stepper>
  );
}

export default TDD;
