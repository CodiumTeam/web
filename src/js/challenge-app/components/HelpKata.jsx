import React from 'react';
import HelpDev from '../../../img/challenges/help-dev.png';
import ButtonSolution from '../../../img/challenges/solution.png';
import ButtonHelpMe from '../../../img/challenges/help-me.png';

function HelpKata({ numSolutions }) {
  return (
    <div className="card modal text-left">
      <div className="wrapper">
        <img src={HelpDev} />
      </div>
      <div className="kata-explanation">
        <h2>Estamos aquí para ayudarte</h2>
        <img src={ButtonHelpMe} />
        <p>
          Si no sabes por dónde empezar. El botón ver iteración te ayudará con
          tus primeros pasos.
        </p>
        <p>
          Tienes hasta <strong>{numSolutions}</strong> iteraciones disponibles
          para éste desafío.
        </p>
        <p>Una vez visto todas las iteraciones. El botón desaparecerá</p>

        <h3>Resolución de la kata</h3>
        <img src={ButtonSolution} />

        <p>
          Tras ver todas las iteraciones disponibles. Aparecerá un nuevo botón
          que te permitirá ver la solución de toda la kata.
        </p>
      </div>
    </div>
  );
}

export default HelpKata;
