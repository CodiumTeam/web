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
  const emailAddress = json['email'] || 'Email not specified';
  return {
    ...json,
    emailAddress: emailAddress,
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
    subject: getSubject(trainingType, emailAddress),
  };
}

function getSubject(trainingType, emailAddress) {
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

  const subject = trainings[trainingType]
    ? trainings[trainingType] + ' ' + today.replace(/\//g, '-')
    : 'Contacto a través de la web';
  return 'Lead: ' + subject + ' - ' + emailAddress;
}
