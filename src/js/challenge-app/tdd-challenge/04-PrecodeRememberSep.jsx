import React from 'react';
import Img from '../../../img/illustrations/bootcamp/katas.png';

function Precode() {
  return (
    <>
      <div className="issues alert alert--info">
        <img src={Img} />
        <h3>Recuerda</h3>
        <ul>
          <li>
            Añadir un <strong>tests en rojo</strong>
          </li>
          <li>
            Añadir el <strong>mínimo código necesario</strong> para hacer pasar
            el test
          </li>
          <li>
            <strong>Refactorizar</strong> si lo requiere.
          </li>
        </ul>
      </div>
      <h3>¡Mucha suerte!</h3>
    </>
  );
}

export default Precode;
