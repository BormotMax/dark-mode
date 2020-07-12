describe('signing in', () => {
  context('successful sign in', () => {
    // happy path
    it('should sign user in', () => {
      cy.visit('/signIn')

      cy.contains('Sign in to Continuum')

      cy.get('input[placeholder="Email"]')
        .type("matthew.watts.mw@gmail.com")
        .should("have.value", "matthew.watts.mw@gmail.com")
        .and("have.attr", "type")
        .should("equal", "email")

      cy.get('input[placeholder="Password"]')
        .type("password")
        .should("have.value", "password")
        .and("have.attr", "type")
        .should("equal", "password")

      cy.get('form')
        .contains("Sign In")
        .click()

      cy.get('form')
        .contains("Sign In")
        .should("be.disabled")
        .and("have.class", "is-loading")

      cy.url().should('equal', `${Cypress.config().baseUrl}/dashboard`)
    })

    it('works by hitting enter in password field', () => {
      cy.visit('/signIn')

      cy.get('input[placeholder="Email"]')
        .type("matthew.watts.mw@gmail.com")

      cy.get('input[placeholder="Password"]')
        .type("password{enter}")

      cy.url().should('equal', `${Cypress.config().baseUrl}/dashboard`)
    })


    it('works by hitting enter in email field', () => {
      cy.visit('/signIn')

      cy.get('input[placeholder="Password"]')
        .type("password")

      cy.get('input[placeholder="Email"]')
        .type("matthew.watts.mw@gmail.com{enter}")

      cy.url().should('equal', `${Cypress.config().baseUrl}/dashboard`)
    })
  })

  context('unsuccessful sign in', () => {
    it('user does not exist', () => {
      cy.visit('/signIn')

      cy.get('input[placeholder="Email"]')
        .type("matt@continuum.works")

      cy.get('input[placeholder="Password"]')
        .type("password")

      cy.get('form')
        .contains("Sign In")
        .click()

      cy.contains('User does not exist')
    })

    it('incorrect password', () => {
      cy.visit('/signIn')

      cy.get('input[placeholder="Email"]')
        .type("matthew.watts.mw@gmail.com")

      cy.get('input[placeholder="Password"]')
        .type("wrong password")

      cy.get('form')
        .contains("Sign In")
        .click()

      cy.contains('Incorrect username or password.')
    })
  })

  context('navigation', () => {
    it('navigates to forgot password page', () => {
      cy.visit('/signIn')
      cy.get('a[href="/forgotPassword"]').click()
      cy.url().should('equal', `${Cypress.config().baseUrl}/forgotPassword`)
    })

    it('navigates to sign in page', () => {
      cy.visit('/signIn')
      cy.contains('Sign Up').click()
      cy.url().should('equal', `${Cypress.config().baseUrl}/signUp`)
    })
  })
})
