import React, { useState } from 'react';
import { listenDropdown } from '../common/dropdown';
import './challenge.scss';
import sdk from '@stackblitz/sdk';
import './challenge.scss';
import Stepper from './components/Stepper';
import WhatIsTDD from './tdd-challenge/what-is-tdd';

listenDropdown();

function App() {
  return (
    <div className="App">
      <Stepper>
        <Stepper.Step title="Step 1">
          <WhatIsTDD />
        </Stepper.Step>
        <Stepper.Step title="Step 2">
          <h1>Step 2</h1>
        </Stepper.Step>
      </Stepper>
    </div>
  );
}

export default App;
