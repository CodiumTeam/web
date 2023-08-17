/// <reference types="cypress" />

import { isMobile } from '../../isMobile';

const devices = ['desktop', 'iphone-6'];

describe('Home page', () => {
  devices.forEach((device) => {
    describe(`From navbar in ${device}`, () => {
      beforeEach(() => {
        if (isMobile(device)) {
          cy.viewport(device);
        }

        cy.visit('/');

        if (isMobile(device)) {
          cy.get('#js-menu-button').click();
        }
      });

      it('Should navigate to the services block in home page', () => {
        cy.get('.navbar__item').first().click();
        cy.isInViewport('#our-services');
      });

      it('Should navigate to the values and methodoly block in home page', () => {
        cy.get('.navbar__item').eq(1).click();
        cy.isInViewport('#values-and-methodology');
      });

      it('Should navigate to the development page', () => {
        cy.get('.navbar__item').eq(2).click();
        cy.location().should((location) => {
          expect(location.pathname).to.eq('/desarrollo.html');
        });
      });

      it('Should navigate to the courses block in home page', () => {
        cy.get('.navbar__item').eq(3).click();
        cy.isInViewport('#courses-list');
      });

      it('Should navigate to the team block in home page', () => {
        cy.get('.navbar__item').eq(4).click();
        cy.isInViewport('#team');
      });

      it('Should navigate to the team block in home page', () => {
        cy.get('.navbar__item').eq(5).click();
        cy.isInViewport('#contact');
      });
    });

    describe.skip(`Production: Send emails with ${device}`, () => {
      beforeEach(() => {
        if (isMobile(device)) {
          cy.viewport(device);
        }

        cy.visit('/programa-de-aceleracion.html');
      });

      it('Send contact email', () => {
        cy.findByTestId('contactBtn').click();
        cy.fillsContactForm({
          name: 'Cypress Home ' + Date.now(),
        });
        cy.findByText(
          'Muchas gracias por ponerte en contacto con nosotros.'
        ).should('be.visible');
        cy.findByText('Te contestaremos lo antes posible.').should(
          'be.visible'
        );
        cy.findByTestId('contactForm').should('not.exist');
      });
    });
  });
});
