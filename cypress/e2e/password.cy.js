///<reference types="Cypress"/>
//Step number 9 is in the lookup file, since we are starting in the first login page
//I tried to make step 13 with the intercept methos, but time was out and I didn't succeed it- left what I tried in a comment

describe("Password", () => {
    beforeEach(() => {
      cy.fixture("valid_user.json").as("user");
      //cy.intercept("POST", "https://stgchrome.paradox.ai/api/v1/auth").as('after_password');
      cy.visit("/");
      cy.get('@user').then((user) => {
        const {email, password}= user;
        cy.signin_email(email);
    });
});
    it("should confirm the following elements exist", () => {
      cy.get('@user').then((user) => {
        const {email, password}= user;
        cy.contains(email);
        cy.get('[data-test="password-input"]').should('be.visible');
        cy.get('[data-test="signin-button"').should('be.visible');
        cy.get('[data-test="submit-password-cancel"]').should('be.visible');
        cy.get('[data-test="keep-me-signed-in-checkbox"]').should('be.visible');
        cy.get('[data-test="forgot-password"]').should('be.visible');
      });
    });
    it("should confirms the cancel button works", () => {
        cy.get('[data-test="submit-password-cancel"]').click();
        cy.get('[data-test="email-login-input"]').should('be.visible');
    });
    it("should check the URL that forgot your password button leads to", () => {
        cy.get('[data-test="forgot-password"]').click()
        .invoke("attr", "target", "_self")
        .click();
        cy.url().should('include', 'https://stg.paradox.ai/forgot-password');
    });
    /*
    it("should make sure that the remember_me field value has a proper value in the API call", () => {
        cy.get('@user').then((user) => {
            const {email, password}= user;
            cy.get('[data-test="password-input"]').type(password);
            cy.get('[data-test="keep-me-signed-in-checkbox"]').check();
            cy.get('[data-test="signin-button"').click();
            cy.wait('@after_password');
            });
        });
    });
    */
  });