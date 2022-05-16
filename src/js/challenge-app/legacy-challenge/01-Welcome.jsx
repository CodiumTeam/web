import React from 'react';
import Img from '../../../img/challenges/welcome.png';

function Welcome() {
  return (
    <div>
      <div>
        <img src={Img} alt="Welcome to codium" />
      </div>
      <h2 className="text-center tab-header">
        ¡Bienvenide al challenge de código legado de Codium!
      </h2>
      <p>
        Antes de empezar la prueba. Repasemos primero unos conceptos básicos de
        código legado.
      </p>
    </div>
  );
}

export default Welcome;
