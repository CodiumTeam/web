import emailjs from '@emailjs/browser';

emailjs.init('eQPQDBk_OXEUnc08b');

export function sendEmail(params) {
  return emailjs.send(
    'service_20tumu9',
    'template_v75pdd7',
    getCorrectParamsForEmail(params)
  );
}

function getCorrectParamsForEmail(json) {
  const trainingType = json['trainingType'];
  return {
    ...json,
    emailAddress: json['email'] || 'Email not specified',
    name: json['name'] || 'Name not specified',
    message: json['message'] || 'No message specified',
    trainingType: trainingType || '',
    numEmployees: json['numEmployees'] || 'No specified',
    location: json['location'] || 'No specified',
    utm_source: json['utm_source'] || 'No specified',
    utm_term: json['utm_term'] || 'No specified',
    referrer: json['referrer'] || 'No specified',
    serviceName: json['serviceName'] || '',
    serviceText: json['serviceName']
      ? `Servicio: <b>${json['serviceName']}</b><br />`
      : '',
    subject: getSubject(trainingType),
  };
}

function getSubject(trainingType) {
  const today = new Date().toLocaleString();
  const trainings = {
    legacy_training: 'Curso de Legacy',
    tdd_training: 'Curso de TDD',
    docker_training: 'Curso de Docker',
    bootcamp_training: 'Programa de aceleración',
    development: 'Desarrollo',
    refactoring_to_patterns_training: 'Curso de Refactoring to patterns',
    qa_training: 'Curso de QA',
  };

  return trainings[trainingType]
    ? 'Lead: ' + trainings[trainingType] + ' ' + today.replace(/\//g, '-')
    : 'Lead: Contacto a través de la web';
}
