/// <reference types="cypress" />

import { isMobile } from '../../isMobile';

const devices = ['desktop', 'iphone-6'];

describe('User navigation in Development page', () => {
  devices.forEach((device) => {
    describe(`From navbar emulating ${device}`, () => {
      beforeEach(() => {
        if (isMobile(device)) {
          cy.viewport(device);
        }

        cy.visit('/desarrollo.html');

        if (isMobile(device)) {
          cy.get('#js-menu-button').click();
        }
      });

      it('Should navigate to course benefits block in bootcamp page', () => {
        cy.get('.navbar__item').should('contain', 'Beneficios');
        cy.get('.navbar__item').first().click();
        cy.isInViewport('#benefits');
      });

      it('Should navigate to the course content block in bootcamp page', () => {
        cy.get('.navbar__item').eq(1).should('contain', 'Metodología');
        cy.get('.navbar__item').eq(1).click();
        cy.isInViewport('#methodology');
      });

      it('Should navigate to the course faqs block in bootcamp page', () => {
        cy.get('.navbar__item').eq(2).should('contain', 'Equipo');
        cy.get('.navbar__item').eq(2).click();
        cy.isInViewport('#team');
      });

      it('Should navigate to the course contact block in bootcamp page', () => {
        cy.get('.navbar__item').eq(3).should('contain', 'Contactar');
        cy.get('.navbar__item').eq(3).click();
        cy.isInViewport('#contact');
      });

      it('Should be able to see service list in a dropdown', () => {
        cy.get('#js-menu .navbar__item.dropdown').click();
        cy.get('.dropdown .options li').should('have.length', 5);

        cy.get('.dropdown .options li a').each((service, index) => {
          const menuItem = serviceList[index];
          cy.wrap(service).should('contain', menuItem.title);
          cy.wrap(service)
            .should('have.attr', 'href')
            .should('eq', menuItem.url);
        });
      });

      it('Should be able to see service list in a dropdown', () => {
        cy.validateServiceListInDropdown();
      });
    });
  });
});
