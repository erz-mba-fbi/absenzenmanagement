/// <reference types="cypress" />

context('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays links to all modules', () => {
    cy.get('a')
      .should('have.length', 4)
      .should('contain', 'Präsenzkontrolle')
      .should('contain', 'Offene Absenzen')
      .should('contain', 'Absenzen bearbeiten')
      .should('contain', 'Absenzen auswerten');
  });
});
