import React from 'react';
import Options from '../components/Options';

function TDDCycle() {
  const options = [
    {
      id: '1',
      text: 'Crear un test en rojo (Red), añadir el código mínimo necesario para que pase (Green) y refactorizar (Refactor)',
    },
    {
      id: '2',
      text: 'Crear un test en rojo (Red), modificar el código de producción para que pase (Refactor), eliminar el test(Green)',
    },
    {
      id: '3',
      text: 'Modificar el código de producción que rompe un test (Red), modificar el tests para que pase (Refactor), hacer push de los cambios y que la pipeline se ponga verde (Green)',
    },
    { id: '4', text: 'Ninguna de las anteriores.' },
  ];

  return (
    <section className="card">
      <h2 className="text-center tab-header">
        ¿Cuál son los pasos para aplicar TDD?
      </h2>
      <Options
        options={options}
        correctAnswerId={'1'}
        answerMessage={`El ciclo del tests empieza por crear un test en rojo (Red), añadir el código mínimo necesario para que pase (Green) y luego refactorizar el código existente
        (Refactor)`}
      />
    </section>
  );
}

export default TDDCycle;
