/// <reference types="cypress" />

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

        // Acesso a pagina e Login

        cy.get('.icon-user-unfollow').click()
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste.com', { log: false })
        cy.get('.woocommerce-form > .button').click()

        // Acesso a pagina de produtos

        cy.get('#primary-menu > .menu-item-629 > a').click()

        // Selecao de produtos

        // Produto 1: Abominable Hoodie

        cy.get('.post-2559 > .product-block > .block-inner > .image > .product-image > .image-hover').click()
        cy.get('.button-variable-item-L').click()
        cy.get('.button-variable-item-Red').click()
        cy.get('.input-text').clear().type('2')
        cy.get('.single_add_to_cart_button').click()

        // Produto 2: Argus All-Weather Tank

        cy.visit('produtos')
        cy.get('.post-3647 > .product-block > .block-inner > .image > .product-image > .image-hover').click()
        cy.get('.button-variable-item-XS').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.input-text').clear().type('2')
        cy.get('.single_add_to_cart_button').click()

        // Verificacao do carrinho e confirmacao da compra

        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()


        // Dados do cliente

        cy.visit('checkout')
        cy.get('#billing_first_name').clear().type('Charlinho')
        cy.get('#billing_last_name').clear().type('Menezes')
        cy.get('#billing_company').clear().type('MTV')
        cy.get('#select2-billing_country-container').click().type('Brasil').get('[aria-selected="true"]').click()
        cy.get('#billing_address_1').clear().type('Rua dos Bobos')
        cy.get('#billing_address_2').clear().type('0')
        cy.get('#billing_city').clear().type('Jarangonhonha')
        cy.get('#select2-billing_state-container').click().type('Minas Gerais' + '{enter}')
        cy.get('#billing_postcode').clear().type('89000000')
        cy.get('#billing_phone').clear().type('3169587870')
        cy.get('#billing_email').clear().type('charlinho@batata.com.br')

        // Finalizacao da compra

        cy.get('#payment_method_cod').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()

        // Confirmacao da compra

        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')












    });


})