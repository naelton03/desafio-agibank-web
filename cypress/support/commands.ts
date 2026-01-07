Cypress.Commands.add('pesquisarNoBlog', (termo: string) => {
    cy.get('.astra-search-icon').first().click({ force: true });
    cy.get('#search-field').should('be.visible').focus().type(`${termo}{enter}`);
});