/// <reference types="cypress" />

import { isMobile } from '../../isMobile';

const devices = ['desktop', 'iphone-6'];

describe('User navigation via our services block in home page', () => {
  devices.forEach((device) => {
    describe(`Emulating: ${device}`, () => {
      beforeEach(() => {
        if (isMobile(device)) {
          cy.viewport(device);
        }

        cy.visit('/');
      });

      it('Should navigate to the Development page from home', () => {
        cy.get('#our-services .card__footer').first().click();
        cy.get('.hero__title').should('contain', 'Desarrollo');
      });

      it('Should navigate to the Course block in home page', () => {
        cy.get('#our-services .card__footer').eq(1).click();
        cy.isInViewport('#courses-list');
      });

      it('Should navigate to the Contact from when I click on Lets talk in "Formacion continue"', () => {
        cy.get('#our-services .card__footer').eq(2).click();
        cy.isInViewport('#contact');
      });

      it('Should navigate to the Development page from home', () => {
        cy.get('#our-services .card__footer').eq(3).click();
        cy.get('.hero__title').should(
          'contain',
          'Aceleración técnica y onboarding'
        );
      });
    });
  });
});
