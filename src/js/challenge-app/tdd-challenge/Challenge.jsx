import React from 'react';
import Editor from '../components/Editor';
import Modal from 'react-modal';
import Img from '../../../img/challenges/dev.png';
import EditorImg from '../../../img/challenges/editor-1.png';
import EditorTerminal from '../../../img/challenges/editor-2.png';
import HelpDev from '../../../img/challenges/help-dev.png';
import ButtonHelp from '../../../img/challenges/button-1.png';

import Stepper from '../components/Stepper';

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

function ModalKata() {
  const [modalIsOpen, setIsOpen] = React.useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <Stepper
        onStepChange={(step, isLastStep) => {
          if (isLastStep) {
            closeModal();
          }
        }}
      >
        <Stepper.Step>
          <div className="card modal text-left">
            <div className="wrapper">
              <img src={Img} />
            </div>
            <div className="kata-explanation">
              <h2>Leap Years Kata</h2>

              <h4>User Story</h4>
              <p>
                As a user, I want to know if a year is a leap year, So that I
                can plan for an extra day on February 29th during those years.
              </p>

              <h4>Acceptance criteria</h4>
              <ul>
                <li>
                  All years divisible by 400 ARE leap years (so, for example,
                  2000 was indeed a leap year),
                </li>
                <li>
                  All years divisible by 100 but not by 400 are NOT leap years
                  (so, for example, 1700, 1800, and 1900 were NOT leap years,
                  NOR will 2100 be a leap year),
                </li>
                <li>
                  All years divisible by 4 but not by 100 ARE leap years (e.g.,
                  2008, 2012, 2016),
                </li>
                <li>
                  All years not divisible by 4 are NOT leap years (e.g. 2017,
                  2018, 2019).
                </li>
              </ul>
            </div>
          </div>
        </Stepper.Step>
        <Stepper.Step>
          <div className="card modal text-left">
            <div className="wrapper">
              <img src={EditorImg} />
            </div>
            <div className="kata-explanation">
              <h2>Editor</h2>

              <p>
                Podrás navegar por diferentes archivos y editar el código.
                También puedes crear nuevos si lo ves necesario.
              </p>

              <p>
                Dispones de un archivo <strong>README.md</strong> que te
                explicará cuáles son los requisitos a cumplir
              </p>

              <h2>Terminal</h2>
              <p>
                La terminal te irá dando feedback de si tus tests están pasando
                o fallando
              </p>
              <img src={EditorTerminal} />
              <p>
                <strong>Nota:</strong> Si editando código la terminal deja de
                mostrarte información, prueba a seguir editando o sino a
                ejecutar <code>npm run test</code>
              </p>
            </div>
          </div>
        </Stepper.Step>
        <Stepper.Step>
          <div className="card modal text-left">
            <div className="wrapper">
              <img src={HelpDev} />
            </div>
            <div className="kata-explanation">
              <h2>Necesito ayuda...</h2>
              <img src={ButtonHelp} />
              <p>
                En tus primeros pasos con ésta kata te ayudará en tus primeros
                pasos.
              </p>
              <p>
                Te ayudará a{' '}
                <strong>
                  crear tus primeros tests y añadirá código de producción
                </strong>{' '}
                dentro de un <strong>fichero llamado solution.spec.js</strong>{' '}
                ¡Utilizalo!
              </p>

              <h3>Resolución de la kata</h3>
              <p>
                Éste mismo botón te mostrará la solución de la kata después de
                haberte ayudado con tus primero pasos
              </p>
            </div>
          </div>
        </Stepper.Step>
      </Stepper>
    </Modal>
  );
}

export default Challenge;
