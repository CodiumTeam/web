/// <reference types="cypress" />

describe('User navigation', () => {
  describe('From navebar in desktop', () => {
    beforeEach(() => {
      cy.visit('/');
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

  describe('From navebar in desktop', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
      cy.visit('/');
      cy.get('#js-menu-button').click();
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
