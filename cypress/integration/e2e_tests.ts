/// <reference types="cypress" />

describe('E2E_Test_Suite', () => {
    //=====
    //Hooks
    //=====
    beforeEach(() => {
        //Open URL
        cy.visit('http://localhost:3000/');
    });

    afterEach(() => {
        //Will do better later
        cy.wait(2000);
    });

    //=====
    //Tests
    //=====
    it('E2ETest_Candidate_AddCandidate', function() {
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

    it('E2ETest_Candidate_EditCandidate', function() {      
        //Modify customer
        cy.get("[title='Edit']")
        .click();
        cy.get("[placeholder='Last Name']")
            .clear()
            .type("Smith");
        cy.get("[title='Save']")
            .click();
    });

    it('E2ETest_Candidate_DeleteCandidate', function() {
        //Modify customer
        cy.get("[title='Delete']")
            .click();
        cy.get("[title='Save']")
            .click();
    });

    it('E2ETest_Position_AddPosition', function() {       
        //Switch tab
        cy.get("[id='simple-tab-0']")
            .click();

        //Add customer
        cy.get("[title='Add']")
            .click();
        cy.get("[placeholder='Title']")
            .type("Engineer");
        cy.get("[placeholder='Level']")
            .type("4");
        cy.get("[title='Save']")
            .click();
    });

    it('E2ETest_Position_EditPosition', function() {
        //Switch tab
        cy.get("[id='simple-tab-0']")
            .click();

        //Add Position
        cy.get("[title='Edit']")
            .click();   
        cy.get("[placeholder='Level']")
            .type("2");
        cy.get("[title='Save']")
            .click();
    });

    it('E2ETest_Position_DeletePosition', function() {
        //Switch tab
        cy.get("[id='simple-tab-0']")
            .click();
    
        //Delete position
        cy.get("[title='Delete']")
            .click();
        cy.get("[title='Save']")
            .click();
    });
});