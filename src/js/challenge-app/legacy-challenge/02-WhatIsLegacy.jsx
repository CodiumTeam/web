import React from 'react';
import Options from '../components/Options';

function WhatIsLegacy({ onSelect, userAnswer = null }) {
  const options = [
    {
      id: '1',
      text: 'Código escrito por otros que yo debo mantener arreglando sus bugs',
    },
    {
      id: '2',
      text: 'Código que entrega valor a un único usuario',
    },
    {
      id: '3',
      text: 'Es un test que se le hace al programador para conocer si sabe programar',
    },
    { id: '4', text: 'Código que entrega valor y que nos da miedo cambiar' },
  ];

  return (
    <section>
      <h2 className="text-center tab-header">¿Qué es código legado?</h2>
      <Options
        onSelect={onSelect}
        options={options}
        correctAnswerId={'4'}
        answerMessage={`Existen varias definiciones de legacy code,
          pero la definición de J.B Rainberger es la que más nos gusta en Codium:
          Código legado es aquel que entrega valor y que nos da miedo cambiar`}
        userAnswer={userAnswer}
      />
    </section>
  );
}

export default WhatIsLegacy;
