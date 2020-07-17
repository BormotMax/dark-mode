import { Auth } from '@aws-amplify/auth';
import Amplify from 'aws-amplify';
import awsconfig from '../../../../src/aws-exports.js';
import { cleanup } from './cleanUp.js';

before(() => {
	// This causes an error in the console "Cannot set property 'err' of undefined"
	// I don't know why, but the tests still do what they're supposed to.
	Amplify.configure(awsconfig);
})

describe("hire page editor", () => {

	let user;

	beforeEach(() => {
		Auth.signIn("matthew.watts.mw@gmail.com", "password").then(u => user = u)
	})

	afterEach(() => {
		// Delete the HireMeInfo entry that is created during this test
		cy.exec(cleanup)
	})

	it("saves form information", () => {
		cy.visit('/hire/edit')
		cy.contains('Hire Page Editor')

		// Fill everything out
		cy.contains("Name")
		cy.get('input[name="name"]')
			.type("Matt Watts")
			.should("have.value", "Matt Watts")
			.should("have.attr", "type")
			.and("equal", "text")
		cy.get('input[name="name"]')
			.should("have.attr", "maxlength")
			.and("equal", "48")

		cy.contains("Title")
		cy.get('input[name="title"]')
			.type("Awesome Freelancer")
			.should("have.value", "Awesome Freelancer")
			.should("have.attr", "type")
			.and("equal", "text")
		cy.get('input[name="title"]')
			.should("have.attr", "maxlength")
			.and("equal", "32")

		cy.contains("Button Text")
		cy.get('input[name="buttonText"]')
			.type("Hire Me")
			.should("have.value", "Hire Me")
			.should("have.attr", "type")
			.and("equal", "text")
		cy.get('input[name="buttonText"]')
			.should("have.attr", "maxlength")
			.and("equal", "24")

		cy.contains("Blurb")
		cy.get('textArea[name="blurbText"]')
			.type("20 years of Freelancing experience")
			.should("have.value", "20 years of Freelancing experience")
			.should("have.attr", "maxlength")
			.and("equal", "255")

		cy.contains("About")
		cy.get('textArea[name="aboutText"]')
			.type("This is everything about me.")
			.should("have.value", "This is everything about me.")
			.should("have.attr", "maxlength")
			.and("equal", "1000")

		// Click SAVE
		cy.contains('SAVE')
			.click().should("be.disabled")
			.and("have.class", "is-loading")

        cy.contains('Your changes have been saved')

        // Reload the page and see that the data was persisted
		cy.visit('/hire/edit')

		cy.get('input[name="name"]')
			.should("have.value", "Matt Watts")

		cy.get('input[name="title"]')
			.should("have.value", "Awesome Freelancer")

		cy.get('input[name="buttonText"]')
			.should("have.value", "Hire Me")

		cy.get('textArea[name="blurbText"]')
			.should("have.value", "20 years of Freelancing experience")

		cy.get('textArea[name="aboutText"]')
			.should("have.value", "This is everything about me.")
	})
})