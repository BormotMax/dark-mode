describe('signing in', () => {
  context('successful sign in', () => {
    // happy path
    it('should sign user in', () => {
      cy.visit('/sign-in');

      cy.contains('Sign In to Continuum');

      cy.get('input[placeholder="Email"]')
        .type('matthew.watts.mw@gmail.com')
        .should('have.value', 'matthew.watts.mw@gmail.com')
        .and('have.attr', 'type')
        .should('equal', 'email');

      cy.get('input[placeholder="Password"]')
        .type('password')
        .should('have.value', 'password')
        .and('have.attr', 'type')
        .should('equal', 'password');

      cy.get('form').contains('Sign In').click();

      cy.get('form').contains('Sign In').should('be.disabled').and('have.class', 'is-loading');

      cy.url().should('equal', `${Cypress.config().baseUrl}/hire-page-editor`);
    });

    it('works by hitting enter in password field', () => {
      cy.visit('/sign-in');

      cy.get('input[placeholder="Email"]').type('matthew.watts.mw@gmail.com');

      cy.get('input[placeholder="Password"]').type('password{enter}');

      cy.url().should('equal', `${Cypress.config().baseUrl}/hire-page-editor`);
    });

    it('works by hitting enter in email field', () => {
      cy.visit('/sign-in');

      cy.get('input[placeholder="Password"]').type('password');

      cy.get('input[placeholder="Email"]').type('matthew.watts.mw@gmail.com{enter}');

      cy.url().should('equal', `${Cypress.config().baseUrl}/hire-page-editor`);
    });
  });

  context('unsuccessful sign in', () => {
    it('user does not exist', () => {
      cy.visit('/sign-in');

      cy.get('input[placeholder="Email"]').type('matt@continuum.works');

      cy.get('input[placeholder="Password"]').type('password');

      cy.get('form').contains('Sign In').click();

      cy.contains('User does not exist');
    });

    it('incorrect password', () => {
      cy.visit('/sign-in');

      cy.get('input[placeholder="Email"]').type('matthew.watts.mw@gmail.com');

      cy.get('input[placeholder="Password"]').type('wrong password');

      cy.get('form').contains('Sign In').click();

      cy.contains('Incorrect username or password.');
    });
  });

  context('navigation', () => {
    it('navigates to forgot password page', () => {
      cy.visit('/sign-in');
      cy.get('a[href="/forgot-password"]').click();
      cy.url().should('equal', `${Cypress.config().baseUrl}/forgot-password`);
    });

    it('navigates to sign up page', () => {
      cy.visit('/sign-in');
      cy.contains('Sign Up').click();
      cy.url().should('equal', `${Cypress.config().baseUrl}/sign-up`);
    });
  });
});
