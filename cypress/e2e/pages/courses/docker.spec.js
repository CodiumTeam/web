/// <reference types="cypress" />
import { isMobile } from '../../isMobile';

const devices = ['desktop', ];

describe('Docker page', () => {
  devices.forEach((device) => {
    describe(`From navbar emulating ${device}`, () => {
      beforeEach(() => {
        if (isMobile(device)) {
          cy.viewport(device);
        }

        cy.visit('/curso-docker.html');

        if (isMobile(device)) {
          cy.get('#js-menu-button').click();
        }
      });

      it('Should navigate to course benefits block in docker page', () => {
        cy.get('.navbar__item').should('contain', 'Beneficios');
        cy.get('.navbar__item').first().click();
        cy.isInViewport('#benefits');
      });

      it('Should navigate to the course content block in docker page', () => {
        cy.get('.navbar__item').eq(1).should('contain', 'Contenido');
        cy.get('.navbar__item').eq(1).click();
        cy.isInViewport('#training-content-timeline');
      });

      it('Should navigate to the course methodology block in docker page', () => {
        cy.get('.navbar__item').eq(2).should('contain', 'Metodología');
        cy.get('.navbar__item').eq(2).click();
        cy.isInViewport('#methodology');
      });

      it('Should navigate to the course faqs block in docker page', () => {
        cy.get('.navbar__item').eq(3).should('contain', 'FAQs');
        cy.get('.navbar__item').eq(3).click();
        cy.isInViewport('#faqs');
      });

      it('Should navigate to the course contact block in docker page', () => {
        cy.get('.navbar__item').eq(4).should('contain', 'Contactar');
        cy.get('.navbar__item').eq(4).click();
        cy.isInViewport('#contact');
      });
      it('Should be able to see service list in a dropdown', () => {
        cy.validateServiceListInDropdown();
      });
    });

    describe.skip(`Production: Send emails with ${device}`, () => {
      beforeEach(() => {
        if (isMobile(device)) {
          cy.viewport(device);
        }

        cy.visit('/curso-docker.html');
      });

      it('Send emails for business', () => {
        cy.findByTestId('contactBtn').click();
        cy.fillsCourseFormFor('business', {
          name: `${device} Docker`,
        });
        cy.findByText(
          'Muchas gracias por ponerte en contacto con nosotros.'
        ).should('be.visible');
        cy.findByText('Te contestaremos lo antes posible.').should(
          'be.visible'
        );
        cy.findByTestId('contactForm').should('not.exist');
      });

      it('Send emails for me', () => {
        cy.findByTestId('contactBtn').click();
        cy.fillsCourseFormFor('me', {
          name: `${device} Docker`,
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
