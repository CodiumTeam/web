/// <reference types="cypress" />

import { isMobile } from '../../isMobile';

const devices = ['desktop', 'iphone-6'];

describe('User navigation', () => {
  devices.forEach((device) => {
    describe(`From navbar emulating ${device}`, () => {
      beforeEach(() => {
        if (isMobile(device)) {
          cy.viewport('iphone-6');
        }

        cy.visit('/curso-legacy-code.html');

        if (isMobile(device)) {
          cy.get('#js-menu-button').click();
        }
      });

      it('Should navigate to course benefits block in legacy page', () => {
        cy.get('.navbar__item').should('contain', 'Beneficios');
        cy.get('.navbar__item').first().click();
        cy.isInViewport('#benefits');
      });

      it('Should navigate to the course content block in legacy page', () => {
        cy.get('.navbar__item').eq(1).should('contain', 'Contenido');
        cy.get('.navbar__item').eq(1).click();
        cy.isInViewport('#training-content-timeline');
      });

      it('Should navigate to the course methodology block in legacy page', () => {
        cy.get('.navbar__item').eq(2).should('contain', 'Metodología');
        cy.get('.navbar__item').eq(2).click();
        cy.isInViewport('#methodology');
      });

      it('Should navigate to the course faqs block in legacy page', () => {
        cy.get('.navbar__item').eq(3).should('contain', 'FAQs');
        cy.get('.navbar__item').eq(3).click();
        cy.isInViewport('#faqs');
      });

      it('Should navigate to the course contact block in legacy page', () => {
        cy.get('.navbar__item').eq(4).should('contain', 'Contactar');
        cy.get('.navbar__item').eq(4).click();
        cy.isInViewport('#contact');
      });
    });
  });
});
