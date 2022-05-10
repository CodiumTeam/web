import React from 'react';
import EditorImg from '../../../img/challenges/editor-1.png';
import EditorTerminal from '../../../img/challenges/editor-2.png';

function EditorTutorial() {
  return (
    <section className="card modal text-left">
      <div className="wrapper">
        <img src={EditorImg} />
      </div>
      <div className="kata-explanation">
        <h2>Editor</h2>

        <p>
          Podrás navegar por diferentes archivos y editar el código. También
          puedes crear nuevos si lo ves necesario.
        </p>

        <p>
          Dispones de un archivo <strong>README.md</strong> que te explicará
          cuáles son los requisitos a cumplir
        </p>

        <h2>Terminal</h2>
        <p>
          La terminal te irá dando feedback de si tus tests están pasando o
          fallando
        </p>
        <img src={EditorTerminal} />
        <p>
          <strong>Nota:</strong> Si editando código la terminal deja de
          mostrarte información, prueba a seguir editando o sino a ejecutar{' '}
          <code>npm run test</code>
        </p>
      </div>
    </section>
  );
}

export default EditorTutorial;
