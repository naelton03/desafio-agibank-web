import blogPage from '../support/pages/blog.page';
import { Result } from 'axe-core';

function reportA11y(violations: Result[]) {

  cy.task('log', `🚨 Foram encontradas ${violations.length} violações de acessibilidade.`);

  violations.forEach((violation) => {
    const nodes = violation.nodes.map((node) => node.target).join(', ');

    cy.log(`**ID:** ${violation.id}`);
    cy.log(`**Impacto:** ${violation.impact}`);
    cy.log(`**Onde:** ${nodes}`);

    cy.task('log', `ID: ${violation.id} | Impacto: ${violation.impact} | Elemento: ${nodes}`);
  });
}

describe('Jornada de Conversão Agi', () => {
  beforeEach(() => {
    blogPage.acessarBlog();
  });

  it('Deve validar busca, acessibilidade e conversão do consignado', () => {
    cy.pesquisarNoBlog('empréstimo consignado');

    cy.url().should('include', 's=empr%C3%A9stimo+consignado');

    cy.get('header.entry-header', { timeout: 10000 }).should('be.visible');

    cy.injectAxe();

    cy.checkA11y(
      undefined,
      {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        }
      },
      reportA11y,
      true
    );

    blogPage.getBannerConsignado()
      .should('be.visible')
      .and('have.attr', 'alt')
      .should('not.be.empty');

    blogPage.getLinkWhatsapp()
      .should('be.visible')
      .and('have.attr', 'target', '_blank')
      .should('have.attr', 'href')
      .and('include', 'phone=551130042221');
  });

  it('Deve exibir mensagem amigável ao não encontrar resultados', () => {


    cy.pesquisarNoBlog('asasasasas');

    cy.get('.no-results.not-found').should('be.visible').should('contain', 'Lamentamos, mas nada foi encontrado para sua pesquisa, tente novamente com outras palavras.');
  });
});