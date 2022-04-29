/// <reference types="cypress" />

describe('User navigation', () => {
  describe('From navbar in desktop', () => {
    beforeEach(() => {
      cy.visit('/curso-docker.html');
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
  });

  describe('From navbar in desktop', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
      cy.visit('/curso-docker.html');
      cy.get('#js-menu-button').click();
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
  });
});
