import React from 'react';
import Modal from 'react-modal';
import Stepper from '../../components/Stepper';
import { UserStory } from './UserStory';
import { EditorTutorial } from './EditorTutorial';
import { HelpKata } from './HelpKata';

export function ModalKata() {
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
          <UserStory />
        </Stepper.Step>
        <Stepper.Step>
          <EditorTutorial />
        </Stepper.Step>
        <Stepper.Step>
          <HelpKata />
        </Stepper.Step>
      </Stepper>
    </Modal>
  );
}
