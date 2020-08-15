import { Auth } from '@aws-amplify/auth';
import Amplify from 'aws-amplify';
import awsconfig from '../../../src/aws-exports.js';
import { addUserToGroup, removeUserFromGroup } from "./cli.js";

before(() => {
	// This causes an error in the console "Cannot set property 'err' of undefined"
	// I don't know why, but the tests still do what they're supposed to.
	Amplify.configure(awsconfig);
})

describe("routing authorization", () => {

	let user;

	context('signedIn', () => {

		beforeEach(() => {
			cy.exec(removeUserFromGroup("ADMIN"))
				.then(() => cy.exec(removeUserFromGroup("FREELANCER")))
				.then(() => cy.exec(removeUserFromGroup("CLIENT")))
		})

		afterEach(() => {
			cy.exec(removeUserFromGroup("ADMIN"))
				.then(() => cy.exec(removeUserFromGroup("FREELANCER")))
				.then(() => cy.exec(removeUserFromGroup("CLIENT")))
				.then(() => cy.exec(addUserToGroup("FREELANCER")))
		})

		context('/hire/edit', () => {
			it('allows FREELANCER role', () => {
				cy.exec(addUserToGroup("FREELANCER"))
					.then(() => Auth.signIn("matthew.watts.mw@gmail.com", "password"))
					.then(() => {
						cy.visit('/hire/edit')
						cy.contains('Hire Page Editor')
					})
			})

			it('allows ADMIN role', () => {
				cy.exec(addUserToGroup("ADMIN"))
					.then(() => Auth.signIn("matthew.watts.mw@gmail.com", "password"))
					.then(() => {
						cy.visit('/hire/edit')
						cy.contains('Hire Page Editor')
					})
			})
		})
	})

	context('signedOut', () => {
		it('should show signIn page', () => {
			cy.visit('/hire/edit')
			cy.url().should('equal', `${Cypress.config().baseUrl}/signIn`)
		})
	})
})
