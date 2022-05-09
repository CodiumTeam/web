import React from 'react';
import Options from '../components/Options';

function WhatIsTDD({ onSelect, userAnswer = null }) {
  const options = [
    { id: '1', text: 'Es escribir el test primero.' },
    { id: '2', text: 'Test drivement developer.' },
    { id: '3', text: 'Es una metodología de desarrollo dirigido por tests.' },
    { id: '4', text: 'Es un cuento para niños.' },
  ];
  return (
    <section>
      <h2 className="text-center tab-header">Tdd es...</h2>
      <Options
        onSelect={onSelect}
        options={options}
        correctAnswerId={'3'}
        userAnswer={userAnswer}
        answerMessage={`TDD o Test-Driven Development (desarrollo dirigido por tests) es una práctica de programación que consiste en
    escribir primero las pruebas (generalmente unitarias), después escribir el código fuente que pase la prueba
    satisfactoriamente y, por último, refactorizar el código escrito.`}
      />
    </section>
  );
}

export default WhatIsTDD;
