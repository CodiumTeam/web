/// <reference types="cypress" />

describe('User navigation', () => {
  describe('Our services block navigation in desktop', () => {
    beforeEach(() => {
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

  describe('Our services block navigation in iphone-6', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
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
