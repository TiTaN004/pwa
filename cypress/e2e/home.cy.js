describe('Homepage Loads', () => {
  it('Visits homepage and checks title', () => {
    cy.visit('http://localhost:5173/');
    cy.title().should('include', 'Panth Enterprise');
  });
});
