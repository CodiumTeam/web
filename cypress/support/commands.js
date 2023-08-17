// Follow same order of web menu
export const serviceList = [
  { title: 'Desarrollo', url: '/desarrollo.html' },
  { title: 'Curso Working with Legacy', url: '/curso-legacy-code.html' },
  { title: 'Curso de TDD', url: '/curso-tdd.html' },
  { title: 'Curso de Patrones', url: '/curso-refactoring-a-patrones.html' },
  { title: 'Curso de Docker', url: '/curso-docker.html' },
  { title: 'Curso Quality Assurance', url: '/curso-quality-assurance.html' },
  {
    title: 'Programa de aceleración',
    url: '/programa-de-aceleracion.html',
  },
];

Cypress.Commands.add('isInViewport', (selector) => {
  // eslint-disable-next-line cypress/no-assigning-return-values
  const yOffset = cy.$$('#js-header').outerHeight();

  const y = cy.$$(selector).offset().top - yOffset;
  cy.window().its('scrollY').should('be.greaterThan', 0);
  cy.window().its('scrollY').should('equal', Math.round(y));
});

Cypress.Commands.add('validateServiceListInDropdown', () => {
  cy.get('#js-menu .navbar__item.dropdown').click();
  cy.get('.dropdown .options li').should('have.length', 7);

  cy.get('.dropdown .options li a').each((service, index) => {
    const menuItem = serviceList[index];
    cy.wrap(service).should('contain', menuItem.title);
    cy.wrap(service).should('have.attr', 'href').should('eq', menuItem.url);
  });
});
