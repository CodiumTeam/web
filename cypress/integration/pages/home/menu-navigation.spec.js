/// <reference types="cypress" />

import { isMobile } from '../../isMobile';

const devices = ['desktop', 'iphone-6'];

describe('User navigation in home page', () => {
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

      it('Should navigate to the courses block in home page', () => {
        cy.get('.navbar__item').eq(2).click();
        cy.isInViewport('#courses-list');
      });

      it('Should navigate to the team block in home page', () => {
        cy.get('.navbar__item').eq(3).click();
        cy.isInViewport('#team');
      });

      it('Should navigate to the team block in home page', () => {
        cy.get('.navbar__item').eq(4).click();
        cy.isInViewport('#contact');
      });
    });
  });
});
