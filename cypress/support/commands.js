import '@testing-library/cypress/add-commands';

/**
 * @memberof cy
 * @method isInViewport
 * @param {string} selector
 * @returns Chainable
 */
Cypress.Commands.add('isInViewport', (selector) => {
  // eslint-disable-next-line cypress/no-assigning-return-values
  const yOffset = cy.$$('#js-header').outerHeight();
  const y = cy.$$(selector).offset().top - yOffset;
  cy.window().its('scrollY').should('be.greaterThan', 0);
  cy.window().its('scrollY').should('be.eq', Math.round(y));
});

/**
 * @memberof cy
 * @method validateServiceListInDropdown
 * @returns Chainable
 */
Cypress.Commands.add('validateServiceListInDropdown', () => {
  cy.get('#js-menu .navbar__item.dropdown').click();
  cy.get('.dropdown .options li').should('have.length', 8);

  cy.get('.dropdown .options li a').each((service, index) => {
    // Follow same order of web menu
    const serviceList = [
      { title: 'Desarrollo', url: '/desarrollo.html' },
      { title: 'Curso Working with Legacy', url: '/curso-legacy-code.html' },
      { title: 'Curso de TDD', url: '/curso-tdd.html' },
      { title: 'Curso de Patrones', url: '/curso-refactoring-a-patrones.html' },
      { title: 'Curso de Docker', url: '/curso-docker.html' },
      {
        title: 'Curso Quality Assurance',
        url: '/curso-quality-assurance.html',
      },
      {
        title: 'Taller de Front-end',
        url: 'https://online-trainings.codium.team/',
      },
      {
        title: 'Programa de aceleración',
        url: '/programa-de-aceleracion.html',
      },
    ];
    const menuItem = serviceList[index];
    cy.wrap(service).should('contain', menuItem.title);
    cy.wrap(service)
      .should('have.attr', 'href')
      .should('contain', menuItem.url);
  });
});

/**
 * @typedef {"business" | "me"} CourseFor
 */
/**
 * @memberof cy
 * @method fillsCourseFormFor
 * @param {CourseFor} type
 * @param {Object} [values]
 * @returns Chainable
 */
Cypress.Commands.add(
  'fillsCourseFormFor',
  (
    type,
    {
      email = `cypress-${Date.now()}@codium.team`,
      name = 'Cypress',
      localization = 'Madrid',
      numOfProgrammer = 10,
    }
  ) => {
    const isBusiness = type === 'business';
    let forLabel = isBusiness ? /Para mi empresa/ : /Sólo para mí/;
    cy.findByTestId('contactForm').findByLabelText(forLabel).click();
    cy.findByTestId('contactForm')
      .findByLabelText(/Nombre/)
      .type(name);
    const emailFor = isBusiness ? /Email de empresa/ : /Email/;
    cy.findByTestId('contactForm').findByLabelText(emailFor).type(email);
    const moreInfo = isBusiness
      ? /Número de programadores/
      : /Localidad dónde vives/;
    cy.findByTestId('contactForm')
      .findByLabelText(moreInfo)
      .type(isBusiness ? numOfProgrammer : localization);
    cy.findByRole('button', { name: 'Pedir información' }).click();
    cy.window().then((win) => {
      // skip recaptcha
      win.onContactFormSubmit();
    });
  }
);

/**
 * @memberof cy
 * @method fillsContactForm
 * @param {Object} [values]
 * @returns Chainable
 */
Cypress.Commands.add(
  'fillsContactForm',
  ({
    name = 'Cypress',
    email = `cypress@codium.team`,
    message = 'This is a cypress message',
  }) => {
    cy.findByTestId('contactForm')
      .findByLabelText(/Nombre/)
      .type(name);
    cy.findByTestId('contactForm').findByLabelText(/Email/).type(email);
    cy.findByTestId('contactForm')
      .findByLabelText(/Mensaje/)
      .type(message);
    cy.findByRole('button', { name: 'Enviar mensaje' }).click();
    cy.window().then((win) => {
      // skip recaptcha
      win.onContactFormSubmit();
    });
  }
);
