import React from 'react';
import HelpDev from '../../../../img/challenges/help-dev.png';
import ButtonHelp from '../../../../img/challenges/button-1.png';

export function HelpKata() {
  return (
    <div className="card modal text-left">
      <div className="wrapper">
        <img src={HelpDev} />
      </div>
      <div className="kata-explanation">
        <h2>Necesito ayuda...</h2>
        <img src={ButtonHelp} />
        <p>
          En tus primeros pasos con ésta kata te ayudará en tus primeros pasos.
        </p>
        <p>
          Te ayudará a{' '}
          <strong>
            crear tus primeros tests y añadirá código de producción
          </strong>{' '}
          dentro de un <strong>fichero llamado solution.spec.js</strong>{' '}
          ¡Utilizalo!
        </p>

        <h3>Resolución de la kata</h3>
        <p>
          Éste mismo botón te mostrará la solución de la kata después de haberte
          ayudado con tus primero pasos
        </p>
      </div>
    </div>
  );
}
