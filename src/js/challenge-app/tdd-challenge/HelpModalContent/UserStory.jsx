import React from 'react';
import Img from '../../../../img/challenges/dev.png';

export function UserStory() {
  return (
    <div className="card modal text-left">
      <div className="wrapper">
        <img src={Img} />
      </div>
      <div className="kata-explanation">
        <h2>Año bisiesto Kata</h2>

        <h4>Historia de usuario</h4>
        <p>
          Como usuario, quiero saber si un año es bisiesto o no, para poder
          planificar un día extra el 29 de febrero durante esos años.
        </p>

        <h4>Criterios de aceptación</h4>
        <ul>
          <li>
            Los años que no son divisibles entre 4 NO son bisiestos (p. ej.
            2017, 2018, 2019).
          </li>
          <li>
            Los años divisibles por 4 SON bisiestos (p. ej., 2008, 2012, 2016),
          </li>
          <li>
            Los años divisibles por 100, a pesar de ser divisibles por 4, NO son
            bisiestos (p. ej., 1700, 1800 y 1900 no son años bisiestos ni lo
            será el 2100),
          </li>
          <li>
            Los años divisibles por 400, a pesar de ser divisibles por 100, SON
            bisiestos (p. ej., 2000 fue año bisiesto),
          </li>
        </ul>
      </div>
    </div>
  );
}
