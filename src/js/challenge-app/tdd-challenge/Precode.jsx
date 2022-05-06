import React from 'react';

function Precode() {
  return (
    <section className="card">
      <img src="./img/illustrations/bootcamp/katas.png" />
      <h2>¡Mucha suerte!</h2>

      <div className="issues alert alert--info fade-in">
        <span className="icon icon-warning"></span>
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
    </section>
  );
}

export default Precode;
