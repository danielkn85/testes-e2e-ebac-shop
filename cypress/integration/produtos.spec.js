/// <reference types="cypress" />


describe('Funcionalidade página de produtos', () => {


    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('[class= "product-block grid"]')
            .first()
            .click()

    });

    it.only('Deve adicionar um produto ao carrinho', () => {
        var quantidade = 1

        cy.get('[class= "product-block grid"]').eq(1).click()
    });

});