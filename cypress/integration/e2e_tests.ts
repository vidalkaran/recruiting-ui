/// <reference types="cypress" />

describe('E2E_Test_Suite', () => {
    //=====
    //Tests
    //=====
    it('E2ETest_Candidate_AddCandidate', function() {
        cy.visit('http://localhost:3000/');

        //Add customer
        cy.get("[title='Add']")
            .click();
        cy.get("[placeholder='First Name']")
            .type("John");
        cy.get("[placeholder='Last Name']")
            .type("Doe");
        cy.get("[title='Save']")
            .click();   

        
    });
});