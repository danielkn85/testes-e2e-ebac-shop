/// <reference types="cypress" />
import infoCliente from "../support/page_objects/cliente.page"
const dadosCliente = require('../fixtures/client.json')
var faker = require('faker')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/')

    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        // Acesso a pagina e Registro de Usuario

        let nomeFaker = faker.name.firstName()
        let sobrenomeFaker = faker.name.lastName()
        let emailFaker = faker.internet.email()

       cy.loginFaker(emailFaker)

        // Acesso a pagina de produtos

        cy.get('#primary-menu > .menu-item-629 > a').click()

        // Selecao de produtos com comando customizado      

        // Produto 1: Abominable Hoodie

        cy.addProdutos('Abominable Hoodie', 'XS', 'Green', 1)

        // Produto 2: Argus All-Weather Tank

        cy.visit('produtos')
        cy.addProdutos('Argus All-Weather Tank', 'XS', 'Gray', 1)

        // Produto 3: Arcadio Gym Short

        cy.visit('produtos')
        cy.addProdutos('Arcadio Gym Short', '34', 'Blue', 1)

        // Produto 4: Argus All-Weather Tank

        cy.visit('produtos')
        cy.addProdutos('Argus All-Weather Tank', 'S', 'Gray', 1)

        // Verificacao do carrinho e confirmacao da compra

        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()


        // Dados do cliente

        cy.visit('checkout')

        infoCliente.editarCheckoutCliente(
            dadosCliente[2].nome,
            dadosCliente[2].sobrenome, 
            dadosCliente[2].empresa,
            dadosCliente[2].pais,
            dadosCliente[2].endereco,
            dadosCliente[2].numero,
            dadosCliente[2].cidade,
            dadosCliente[2].estado,
            dadosCliente[2].cep,
            dadosCliente[2].telefone,
            dadosCliente[2].email
            )

         // Finalizacao da compra

        cy.get('#payment_method_cod').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()

        // Confirmacao da compra

        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')












    });
})
