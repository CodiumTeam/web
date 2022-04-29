Cypress.Commands.add('isInViewport', (selector) => {
  const yOffset = cy.$$('#js-header').outerHeight();

  const y = cy.$$(selector).offset().top - yOffset;
  cy.window().its('scrollY').should('be.greaterThan', 0);
  cy.window().its('scrollY').should('equal', Math.round(y));
});
