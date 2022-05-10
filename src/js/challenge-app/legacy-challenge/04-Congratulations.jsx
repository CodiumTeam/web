import React from 'react';
import CourseCard from '../components/CourseCard';
import Img from '../../../img/legacy-code.svg';

function Congratulations() {
  const legacy = {
    title: 'Working with Legacy Code',
    description:
      'Desacopla y testea para reducir los costes de desarrollo y mantimiento.',
    imageUrl: Img,
    buttonUrl: '/curso-legacy-code.html',
    list: [
      'Identifica los problemas en el código',
      'Aprende a desacoplar las dependencias',
      'Añade tests para cambiar el software con seguridad',
      'Estrategias para transformar tu monolito',
    ],
  };
  return (
    <div>
      <h1>¡Felicidades!</h1>
      <p>
        Recupera el control de tu producto{' '}
        <strong>
          con nuestro{' '}
          <a href="/curso-legacy-code.html">
            curso de Working with Legacy code
          </a>
        </strong>
      </p>
      <div className="course-card fade-in">
        <CourseCard {...legacy} />
      </div>
    </div>
  );
}

export default Congratulations;
