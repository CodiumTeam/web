/* eslint-disable react/no-danger-with-children */
import React from 'react';
import Editor from '../components/Editor';
import Modal from 'react-modal';
import { help, solution } from './solutions';
import { toast } from 'react-toastify';
import { ModalKata } from './HelpModalContent/ModalKata';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#page');

function LegacyChallenge() {
  const openFile = ['README.md', 'tests/leap.test.js'];
  const [vm, setVm] = React.useState(null);
  const [numHelpUsed, setNumHelpUsed] = React.useState(0);
  const [solutionUsed, setSolutionUsed] = React.useState(false);

  const handleSolutionClick = () => {
    if (solutionUsed) return;
    const helpItem = help[numHelpUsed];
    let explanation;
    let code;

    if (helpItem) {
      explanation = helpItem.explanation;
      code = helpItem.code;
    } else {
      setSolutionUsed(true);
      explanation = solution.explanation;
      code = solution.code;
    }

    updateEditorWithCode(
      helpItem ? 'help.test.js' : 'solution.test.js',
      code
    ).then(() => {
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
        <button
          className="button solution-btn"
          onClick={handleSolutionClick}
          disabled={solutionUsed}
        >
          {help.length - numHelpUsed == 0
            ? 'Mostrar solución'
            : solutionUsed
            ? 'Mostrar solución'
            : `Ver ${numHelpUsed + 1} Interación`}
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

export default LegacyChallenge;
