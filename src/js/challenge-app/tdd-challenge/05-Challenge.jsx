import React from 'react';
import Editor from '../components/Editor';
import Modal from 'react-modal';
import { solution } from './solutions';

import { ModalKata } from './HelpModalContent/ModalKata';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#page');

function Challenge() {
  const [vm, setVm] = React.useState(null);
  const [numHelpUsed, setNumHelpUsed] = React.useState(0);
  const handleSolutionClick = () => {
    vm.applyFsDiff({
      create: {
        'tests/help.test.js': solution[numHelpUsed],
      },
    }).then(() => {
      vm.editor.openFile('tests/help.test.js');
    });

    setNumHelpUsed(numHelpUsed + 1);
  };

  return (
    <div className="editor-wrapper">
      <ModalKata />
      <Editor
        challengeId="tdd-challenge-1"
        onLoad={(vm) => {
          setVm(vm);
        }}
      />
      {vm && (
        <button className="button solution-btn" onClick={handleSolutionClick}>
          Ayúdame ({solution.length - numHelpUsed})
        </button>
      )}
    </div>
  );
}

export default Challenge;
