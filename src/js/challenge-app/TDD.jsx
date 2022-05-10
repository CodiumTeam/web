import React, { useState } from 'react';
import Modal from 'react-modal';
import { listenDropdown } from '../common/dropdown';
import Stepper from './components/Stepper/Stepper';
import WhatIsTDD from './tdd-challenge/02-WhatIsTdd';
import Welcome from './tdd-challenge/01-Welcome';
import TDDCycle from './tdd-challenge/03-TddCicle';
import Precode from './tdd-challenge/04-PrecodeRememberSep';
import Challenge from './tdd-challenge/05-Challenge';
import Congratulations from './tdd-challenge/06-Congratulations';
import { useStepper } from './components/Stepper/useStepper';
import WarningImg from '../../img/challenges/warning.png';

import './challenge.scss';

listenDropdown();

function TDD() {
  const codeStep = 4;
  const { step, nextStep, prevStep } = useStepper();
  const [stepperBtnText, setStepperBtnText] = useState('Siguiente');
  const [answers, setAnswers] = useState({
    whatIsTdd: null,
    tddCycle: null,
  });
  const [isDisable, setIsDisable] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  function handleNextStep() {
    if (step === codeStep) {
      setShowExitModal(true);
      return;
    }

    goToNext();
  }

  function goToNext() {
    const currStep = nextStep();
    const whatIsTDDStep = 1;
    const tddCycleStep = 2;
    setStepperBtnText('Siguiente');

    if ([whatIsTDDStep, tddCycleStep].includes(currStep)) {
      if (answers.tddCycle === null || answers.tddCycle === null) {
        setIsDisable(true);
      }
    }

    if (currStep === codeStep) {
      setStepperBtnText('Finalizar');
    }
  }

  function handleBackStep() {
    setIsDisable(false);
    prevStep();
  }

  function handleWhatIsTddAnswer(id) {
    setAnswers({ ...answers, whatIsTdd: id });
    setIsDisable(false);
  }

  function handleTDDCicleAnswer() {
    return (id) => {
      setAnswers({ ...answers, tddCycle: id });
      setIsDisable(false);
    };
  }

  return (
    <>
      <Stepper
        step={step}
        controls={
          step >= codeStep + 1 ? null : (
            <Stepper.Controls
              step={step}
              onNextStepClick={handleNextStep}
              onBackStepClick={handleBackStep}
              nextButtonText={stepperBtnText}
              nextButtonDisabled={isDisable}
              hideBackButton={step === codeStep}
            />
          )
        }
      >
        <Stepper.Step>
          <Welcome />
        </Stepper.Step>
        <Stepper.Step>
          <WhatIsTDD
            onSelect={handleWhatIsTddAnswer}
            userAnswer={answers.whatIsTdd}
          />
        </Stepper.Step>
        <Stepper.Step>
          <TDDCycle
            onSelect={handleTDDCicleAnswer()}
            userAnswer={answers.tddCycle}
          />
        </Stepper.Step>
        <Stepper.Step>
          <Precode />
        </Stepper.Step>
        <Stepper.Step>
          <Challenge />
        </Stepper.Step>
        <Stepper.Step>
          <Congratulations />
        </Stepper.Step>
      </Stepper>
      {showExitModal && (
        <ModalExistWarning
          modalIsOpen={showExitModal}
          onExit={() => {
            setShowExitModal(false);
            goToNext();
          }}
          onCancel={() => {
            setShowExitModal(false);
          }}
        />
      )}
    </>
  );
}

function ModalExistWarning({ modalIsOpen, onExit, onCancel }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      className="Modal"
      overlayClassName="Overlay"
      onRequestClose={() => {}}
      contentLabel="Example Modal"
    >
      <section className="card kata-explanation ">
        <img src={WarningImg} />
        <h1>¡Cuidado!</h1>
        <p>
          Al finalizar la kata podrías perder todos tus cambios.{' '}
          <strong>¿Deseas continuar?</strong>
        </p>

        <div className="button__wrapper exit">
          <button className="button button--outline" onClick={onCancel}>
            Cancelar
          </button>
          <button className="button button--primary" onClick={onExit}>
            Sí, finalizar kata
          </button>
        </div>
      </section>
    </Modal>
  );
}

export default TDD;
