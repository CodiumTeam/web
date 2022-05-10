import React from 'react';
import Modal from 'react-modal';
import WarningImg from '../../../img/challenges/warning.png';

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

export default ModalExistWarning;
