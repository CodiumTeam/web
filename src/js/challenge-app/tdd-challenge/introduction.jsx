import React from 'react';

function Introduction() {
  return (
    <div className="card">
      <div>
        <img
          src="/img/challenges/welcome_cats.svg"
          width="300"
          height="200"
          alt="Welcome to codium"
        />
      </div>
      <h2 className="text-center tab-header">
        ¡Bienvenide al challenge de TDD de Codium!
      </h2>
      <p>
        Antes de empezar la prueba. Repasemos primero unos conceptos básicos de
        TDD.
      </p>
    </div>
  );
}

export default Introduction;
