///<reference types="Cypress"/>
// Prefered to use the custom query of getById.

describe("Lookup", () => {
  beforeEach(() => {
    cy.fixture("valid_user.json").as("user");
    cy.visit("/");
  });
  it("should open the webpage", () => {
    cy.get('.login-header__logo');
    cy.contains("Login");
  });
  it("should confirm the following elements exist", () => {
    cy.get('[data-test="email-login-input"]').should('be.visible');
    cy.get('[data-test="email-login-submit-button"]').should('be.visible');
    cy.get('.text-paddint-top').contains(/Keep Me/);
  });
  it("should confirm the keep me signed in checkbox works", () => {
    cy.get('.checkbox-input').click({force: true});
    cy.get('.checkbox-input').should('be.not.checked');
    cy.get('.checkbox-input').click({force: true});
    cy.get('.checkbox-input').should('be.checked');
  });
  it("should login with a valid email and press enter and redirect to password page", () => {
    cy.get('@user').then((user) => {
     const {email, password}= user;
     cy.signin_email(email);
     cy.contains(email);
     cy.get('[data-test="password-input"]').should('be.visible');
    });
  });
});
