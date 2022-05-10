import React, { useState } from 'react';
import Modal from 'react-modal';
import Stepper from '../../components/Stepper/Stepper';
import { UserStory } from './UserStory';
import HelpKata from '../../components/HelpKata';
import { useStepper } from '../../components/Stepper/useStepper';
import EditorTutorial from '../../components/EditorTutorial';

export function ModalKata() {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [stepperNexBtnText, setStepperNexBtnText] = useState('Siguiente');
  const { step, nextStep, prevStep } = useStepper();

  function closeModal() {
    setIsOpen(false);
  }

  function handleNextStep() {
    const currStep = nextStep();
    if (currStep <= 1) {
      setStepperNexBtnText('Siguiente');
    } else if (currStep === 2) {
      setStepperNexBtnText('Cerrar');
    } else {
      closeModal();
    }
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
        step={step}
        controls={
          <Stepper.Controls
            step={step}
            onNextStepClick={handleNextStep}
            onBackStepClick={prevStep}
            nextButtonText={stepperNexBtnText}
          />
        }
      >
        <Stepper.Step>
          <EditorTutorial />
        </Stepper.Step>
        <Stepper.Step>
          <HelpKata />
        </Stepper.Step>
        <Stepper.Step>
          <UserStory />
        </Stepper.Step>
      </Stepper>
    </Modal>
  );
}
