/// <reference types="cypress" />

describe('Minesweeper screen', () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it('renders the grid', () => {
    cy.get(`[data-cy='grid']`);
  });
});
