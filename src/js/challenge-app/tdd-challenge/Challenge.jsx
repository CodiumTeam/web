import React from 'react';
import Editor from '../components/Editor';
import Modal from 'react-modal';
import Img from '../../../img/challenges/dev.png';

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
      closeTimeoutMS={300}
    >
      <div className="card modal text-left">
        <div className="wrapper">
          <img src={Img} />
        </div>
        <div className="kata-explanation">
          <h2>Leap Years Kata</h2>

          <h4>User Story</h4>
          <p>
            As a user, I want to know if a year is a leap year, So that I can
            plan for an extra day on February 29th during those years.
          </p>

          <h4>Acceptance criteria</h4>
          <ul>
            <li>
              All years divisible by 400 ARE leap years (so, for example, 2000
              was indeed a leap year),
            </li>
            <li>
              All years divisible by 100 but not by 400 are NOT leap years (so,
              for example, 1700, 1800, and 1900 were NOT leap years, NOR will
              2100 be a leap year),
            </li>
            <li>
              All years divisible by 4 but not by 100 ARE leap years (e.g.,
              2008, 2012, 2016),
            </li>
            <li>
              All years not divisible by 4 are NOT leap years (e.g. 2017, 2018,
              2019).
            </li>
          </ul>
          <div className="btn-kata">
            <button className="button button--outline" onClick={closeModal}>
              Entendido
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Challenge;
