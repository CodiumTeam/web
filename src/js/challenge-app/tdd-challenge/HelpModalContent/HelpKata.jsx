import React from 'react';
import HelpDev from '../../../../img/challenges/help-dev.png';
import ButtonSolution from '../../../../img/challenges/solution.png';
import ButtonHelpMe from '../../../../img/challenges/help-me.png';

import { help } from '../solutions';

export function HelpKata() {
  return (
    <div className="card modal text-left">
      <div className="wrapper">
        <img src={HelpDev} />
      </div>
      <div className="kata-explanation">
        <h2>Necesito ayuda...</h2>
        <img src={ButtonHelpMe} />
        <p>Dispones de un botón que te ayudará en tus primeros pasos.</p>
        <p>
          Tienes hasta <strong>{help.length}</strong> soluciones para este
          desafío.
        </p>
        <p>
          Una vez utilizado todas las ayudas. El botón de ayuda desaparecerá
        </p>

        <h3>Resolución de la kata</h3>
        <img src={ButtonSolution} />

        <p>
          Tras usar todas las ayudas disponibles. Aparecerá un nuevo botón que
          te permitirá ver la solución de toda la kata
        </p>
      </div>
    </div>
  );
}
