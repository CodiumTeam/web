import React from 'react';
import CourseCard from '../components/CourseCard';

function Congratulations() {
  const tdd = {
    title: 'Test-driven development',
    description: 'Desarrolla con pasos seguros, con calidad y de forma simple.',
    imageUrl: '/img/tdd-logo.svg',
    buttonUrl: '/curso-tdd.html',
    list: [
      'Aprende el ciclo de desarrollo de TDD',
      'Utiliza dobles de pruebas para aislar las diferentes capas',
      'Estrategias para testear código legado',
      'Aprende buenas prácticas e identifica problemas en los tests',
    ],
  };
  return (
    <div>
      <h1>¡Felicidades!</h1>
      <p>
        Puedes seguir revolucionando tu forma de desarrollar{' '}
        <strong>
          con nuestro <a href="/curso-tdd.html">curso de TDD</a>
        </strong>
      </p>
      <div className="course-card fade-in">
        <CourseCard {...tdd} />
      </div>
    </div>
  );
}

export default Congratulations;
