import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import Amplify from '@aws-amplify/core';
import awsconfig from '../../../../src/aws-exports.js';
import { getHireMeInfoById, deleteHireMeInfoById } from './cleanUp.js';

before(() => {
  // This causes an error in the console "Cannot set property 'err' of undefined"
  // I don't know why, but the tests still do what they're supposed to.
  Amplify.configure(awsconfig);
});

describe('hire page editor', () => {
  let user;

  beforeEach(() => {
    return Auth.signIn('matthew.watts.mw@gmail.com', 'password').then((u) => (user = u));
  });

  afterEach(() => {
    // Delete the HireMeInfo entry that is created during this test
    // Then, delete the associated images
    let hireMeInfo;
    cy.exec(getHireMeInfoById(user.username), { failOnNonZeroExit: false })
      .then((getResult) => {
        hireMeInfo = JSON.parse(getResult.stdout).Item;
        const hireMeInfoId = hireMeInfo.freelancerID.S;
        return cy.exec(deleteHireMeInfoById(hireMeInfoId));
      })
      .then(() => {
        Storage.remove(hireMeInfo.bannerImage.M.key.S);
        hireMeInfo.portfolioImages.L.forEach((img) => {
          Storage.remove(img.M.key.S);
        });
      });
  });

  it('saves form information and images', () => {
    cy.visit('/hire-page-editor');
    cy.contains('Hire Page Editor');

    // Fill everything out
    cy.contains('Name');
    cy.get('input[name="name"]').type('Matt Watts').should('have.value', 'Matt Watts').should('have.attr', 'type').and('equal', 'text');
    cy.get('input[name="name"]').should('have.attr', 'maxlength').and('equal', '48');

    cy.contains('Title');
    cy.get('input[name="title"]')
      .type('Awesome Freelancer')
      .should('have.value', 'Awesome Freelancer')
      .should('have.attr', 'type')
      .and('equal', 'text');
    cy.get('input[name="title"]').should('have.attr', 'maxlength').and('equal', '32');

    cy.contains('Button Text');
    cy.get('input[name="buttonText"]').type('Hire Me').should('have.value', 'Hire Me').should('have.attr', 'type').and('equal', 'text');
    cy.get('input[name="buttonText"]').should('have.attr', 'maxlength').and('equal', '24');

    cy.contains('Blurb');
    cy.get('textArea[name="blurbText"]')
      .type('20 years of Freelancing experience')
      .should('have.value', '20 years of Freelancing experience')
      .should('have.attr', 'maxlength')
      .and('equal', '255');

    cy.contains('About');
    cy.get('textArea[name="aboutText"]')
      .type('This is everything about me.')
      .should('have.value', 'This is everything about me.')
      .should('have.attr', 'maxlength')
      .and('equal', '1000');

    cy.contains('Twitter URL');
    cy.get('input[name="twitterUrl"]').type('http://testurl.com').should('have.value', 'http://testurl.com');

    cy.contains('Dribbble URL');
    cy.get('input[name="dribbbleUrl"]').type('http://testurl.com').should('have.value', 'http://testurl.com');

    cy.contains('Instagram URL');
    cy.get('input[name="instagramUrl"]').type('http://testurl.com').should('have.value', 'http://testurl.com');

    cy.contains('LinkedIn URL');
    cy.get('input[name="linkedInUrl"]').type('http://testurl.com').should('have.value', 'http://testurl.com');

    cy.contains('Built-in Domain');
    cy.get('input[name="domainSlugID"]').type('testslug').should('have.value', 'continuum.works/hire/testslug');

    // Select images
    cy.get('input[name="banner"]').attachFile('images/hire.png');
    cy.get('input[name="portfolio-1"]').attachFile('images/portfolio_1.png');
    cy.get('input[name="portfolio-2"]').attachFile('images/portfolio_2.png');
    cy.get('input[name="portfolio-3"]').attachFile('images/portfolio_3.png');
    cy.get('input[name="portfolio-4"]').attachFile('images/portfolio_4.png');
    cy.get('input[name="portfolio-5"]').attachFile('images/portfolio_5.png');
    cy.get('input[name="portfolio-6"]').attachFile('images/portfolio_6.png');

    checkImagesAreDisplayed();

    cy.contains('SAVE').click().should('be.disabled').and('have.class', 'is-loading');

    cy.url().should('equal', `${Cypress.config().baseUrl}/hire/testslug`);
    cy.contains('Your changes have been saved');

    // Reload the page and see that the data was persisted and populated in the form
    cy.visit('/hire-page-editor');

    cy.get('input[name="name"]').should('have.value', 'Matt Watts');

    cy.get('input[name="title"]').should('have.value', 'Awesome Freelancer');

    cy.get('input[name="buttonText"]').should('have.value', 'Hire Me');

    cy.get('textArea[name="blurbText"]').should('have.value', '20 years of Freelancing experience');

    cy.get('textArea[name="aboutText"]').should('have.value', 'This is everything about me.');

    checkImagesAreDisplayed();

    // Check that saving without changing the images keeps the images
    cy.contains('SAVE').click();
    cy.url().should('equal', `${Cypress.config().baseUrl}/hire/testslug`);
    cy.contains('Your changes have been saved');

    cy.visit('/hire-page-editor');
    checkImagesAreDisplayed();
  });

  it('works when using drag and drop', () => {
    cy.visit('/hire-page-editor');

    cy.get('input[name="domainSlugID"]').type('testslug').should('have.value', 'continuum.works/hire/testslug');

    cy.get('[data-cy="drop-area-banner"]').attachFile('images/hire.png', { subjectType: 'drag-n-drop' });
    cy.get('[data-cy="drop-area-portfolio-1"]').attachFile('images/portfolio_1.png', { subjectType: 'drag-n-drop' });
    cy.get('[data-cy="drop-area-portfolio-2"]').attachFile('images/portfolio_2.png', { subjectType: 'drag-n-drop' });
    cy.get('[data-cy="drop-area-portfolio-3"]').attachFile('images/portfolio_3.png', { subjectType: 'drag-n-drop' });
    cy.get('[data-cy="drop-area-portfolio-4"]').attachFile('images/portfolio_4.png', { subjectType: 'drag-n-drop' });
    cy.get('[data-cy="drop-area-portfolio-5"]').attachFile('images/portfolio_5.png', { subjectType: 'drag-n-drop' });
    cy.get('[data-cy="drop-area-portfolio-6"]').attachFile('images/portfolio_6.png', { subjectType: 'drag-n-drop' });

    checkImagesAreDisplayed();
    cy.contains('SAVE').click();
    cy.url().should('equal', `${Cypress.config().baseUrl}/hire/testslug`);
    cy.contains('Your changes have been saved');

    cy.visit('/hire-page-editor');
    checkImagesAreDisplayed();
  });
});

const checkImagesAreDisplayed = () => {
  cy.get('[data-cy="img-banner"]').and(($img) => {
    expect($img[0].naturalWidth).to.be.greaterThan(0);
  });

  cy.get('[data-cy="img-portfolio-1"]').and(($img) => {
    expect($img[0].naturalWidth).to.be.greaterThan(0);
  });

  cy.get('[data-cy="img-portfolio-2"]').and(($img) => {
    expect($img[0].naturalWidth).to.be.greaterThan(0);
  });

  cy.get('[data-cy="img-portfolio-3"]').and(($img) => {
    expect($img[0].naturalWidth).to.be.greaterThan(0);
  });

  cy.get('[data-cy="img-portfolio-4"]').and(($img) => {
    expect($img[0].naturalWidth).to.be.greaterThan(0);
  });

  cy.get('[data-cy="img-portfolio-5"]').and(($img) => {
    expect($img[0].naturalWidth).to.be.greaterThan(0);
  });

  cy.get('[data-cy="img-portfolio-6"]').and(($img) => {
    expect($img[0].naturalWidth).to.be.greaterThan(0);
  });
};
