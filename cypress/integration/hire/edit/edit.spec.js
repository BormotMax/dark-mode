import { Auth } from '@aws-amplify/auth';
import { Storage } from 'aws-amplify';
import Amplify from 'aws-amplify';
import awsconfig from '../../../../src/aws-exports.js';
import { getHireMeInfoByFreelancer, deleteHireMeInfoById } from './cleanUp.js';

before(() => {
	// This causes an error in the console "Cannot set property 'err' of undefined"
	// I don't know why, but the tests still do what they're supposed to.
	Amplify.configure(awsconfig);
})

describe("hire page editor", () => {

	let user;

	beforeEach(() => {
		return Auth.signIn("matthew.watts.mw@gmail.com", "password").then(u => user = u)
	})

	afterEach(async () => {
		// Delete the HireMeInfo entry that is created during this test
		// First, find the object by the freelancerID
		const getCmd = getHireMeInfoByFreelancer(user)
		const getResult = await cy.exec(getCmd, {failOnNonZeroExit: false})
		const hireMeInfo = JSON.parse(getResult.stdout).Items[0]
		const hireMeInfoId = hireMeInfo.id.S

		// Then, delete the object by primary key
		const deleteCmd = deleteHireMeInfoById(hireMeInfoId)
		await cy.exec(deleteCmd)

		// Also, delete the images that were uploaded to S3
		Storage.remove(hireMeInfo.bannerImage.M.key.S)

		hireMeInfo.portfolioImages.L.forEach((img) => {
			Storage.remove(img.M.key.S)
		})
	})

	it("saves form information and images", () => {
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

		// Select images
		cy.get('input[name="banner"]').attachFile('images/hire.png');
		cy.get('input[name="portfolio-1"]').attachFile('images/portfolio_1.png');
		cy.get('input[name="portfolio-2"]').attachFile('images/portfolio_2.png');
		cy.get('input[name="portfolio-3"]').attachFile('images/portfolio_3.png');
		cy.get('input[name="portfolio-4"]').attachFile('images/portfolio_4.png');
		cy.get('input[name="portfolio-5"]').attachFile('images/portfolio_5.png');
		cy.get('input[name="portfolio-6"]').attachFile('images/portfolio_6.png');

		checkImagesAreDisplayed();

		cy.contains('SAVE')
			.click()
			.should("be.disabled")
			.and("have.class", "is-loading")

		// Waiting for S3 uploads
		cy.wait(7000)

        cy.contains('Your changes have been saved')

        // Reload the page and see that the data was persisted and populated in the form
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

		checkImagesAreDisplayed()

		// Check that saving without changing the images keeps the images
		cy.contains('SAVE').click()
        cy.contains('Your changes have been saved')
		cy.visit('/hire/edit')
		checkImagesAreDisplayed()
	})
})


const checkImagesAreDisplayed = () => {
		cy.get('[data-cy="img-banner"]').and($img => {
			expect($img[0].naturalWidth).to.be.greaterThan(0)
		})

		cy.get('[data-cy="img-portfolio-1"]').and($img => {
			expect($img[0].naturalWidth).to.be.greaterThan(0)
		})

		cy.get('[data-cy="img-portfolio-2"]').and($img => {
			expect($img[0].naturalWidth).to.be.greaterThan(0)
		})

		cy.get('[data-cy="img-portfolio-3"]').and($img => {
			expect($img[0].naturalWidth).to.be.greaterThan(0)
		}

		cy.get('[data-cy="img-portfolio-4"]').and($img => {
			expect($img[0].naturalWidth).to.be.greaterThan(0)
		})

		cy.get('[data-cy="img-portfolio-5"]').and($img => {
			expect($img[0].naturalWidth).to.be.greaterThan(0)
		})

		cy.get('[data-cy="img-portfolio-6"]').and($img => {
			expect($img[0].naturalWidth).to.be.greaterThan(0)
		})
}