import React from 'react';
import Editor from '../components/Editor';
import Modal from 'react-modal';

import { ModalKata } from './HelpModalContent/ModalKata';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#page');

function Challenge() {
  return (
    <div className="editor-wrapper">
      <ModalKata />
      <Editor
        challengeId="tdd-challenge-1"
        onLoad={(vm) => {
          console.log(vm);
        }}
      />
      <button className="button solution-btn">Mostrar solución</button>
    </div>
  );
}

export default Challenge;
