/* eslint-disable react/no-danger-with-children */
import React from 'react';
import Editor from '../components/Editor';
import Modal from 'react-modal';
import { solutions } from './solutions';
import { toast } from 'react-toastify';
import { ModalKata } from './HelpModalContent/ModalKata';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#page');

function Challenge() {
  const openFile = ['README.md', 'tests/leap.test.js'];
  const [vm, setVm] = React.useState(null);
  const [numHelpUsed, setNumHelpUsed] = React.useState(0);
  const handleSolutionClick = () => {
    const { explanation, code } = solutions[numHelpUsed];

    updateEditorWithCode('help.test.js', code).then(() => {
      toast.success(<Msg message={explanation} />);
    });

    setNumHelpUsed(numHelpUsed + 1);
  };

  const updateEditorWithCode = (fileName, code) => {
    const filePath = `tests/${fileName}`;
    return vm
      .applyFsDiff({
        create: {
          [filePath]: code,
        },
      })
      .then(() => {
        return vm.editor.openFile([...openFile, filePath]);
      });
  };

  return (
    <div className="editor-wrapper">
      <ModalKata />
      <Editor
        challengeId="tdd-challenge-1"
        openFile={openFile}
        onLoad={(vm) => {
          setVm(vm);
        }}
      />
      {vm && (
        <button className="button solution-btn" onClick={handleSolutionClick}>
          {solutions.length - numHelpUsed == 0 ? 'Mostrar solución' : 'Ayúdame'}{' '}
        </button>
      )}
    </div>
  );
}

const Msg = ({ message }) => (
  <div>
    <p dangerouslySetInnerHTML={{ __html: message }}>{}</p>
  </div>
);

export default Challenge;
