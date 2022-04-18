/// <reference types="cypress" />

import { generateRandomString } from "../../utils/helpers"

context('Cypress Mailmunch - User Journey Tests', () => {

  const addListOrTag = ({ type, itemName, sendAutoResponders = false }) => {
    cy.get(`[data-attribute="select-subscriber-upsert-add-to-${type}"]`).click()
    cy.get(`[data-attribute="select-subscriber-upsert-add-to-${type}"]`).within(() => {
      cy.get('[class$=-MenuList]').children().contains(itemName).click()
    })
    if(sendAutoResponders && type === "list"){
      cy.get(`[data-attribute="button-subscriber-upsert-send-autoresponders-yes"]`).click()
    }
    else if(!sendAutoResponders && type === "list"){
      cy.get(`[data-attribute="button-subscriber-upsert-send-autoresponders-no"]`).click()
    }
  }

  const addCustomField = ({ fieldName, fieldValue='' }) => {
    cy.get(`[data-attribute="dropdown-subscriber-upsert-add-custom-field"]`).click()
    cy.get(`[data-attribute="dropdown-subscriber-upsert-add-custom-field"]`).within(() => {
      cy.get('li').contains(fieldName).click()
    })
    cy.get(`[data-attribute="input-subscriber-upsert-${fieldName?.split(' ')?.join('_')?.toLowerCase()}"]`).type(fieldValue)
  }

  beforeEach(() => {
    cy.visit('http://localhost:3001/sites/74/subscribers/144?user_token=CsTahvRfib9Egg1Cxf5L5EL1')
    cy.url().should('include', 'subscribers/')
    cy.wait(5000)
  });

  it('User Journey Page', () => {
    cy.url().should('include', '/subscribers/');
    cy.contains('User Journey');
  })

  it('User Journey Page - Edit (Empty Submit)', () => {
    cy.get('[data-attribute="button-edit-contact-modal"]').click()

    cy.get('input').each(($el, index, $list) => {
      if(!($el.is(':disabled'))){
        cy.wrap($el).clear({force: true})
      }
    })

    cy.get('[data-attribute="button-subscriber-upsert-save"]').click()
  })

  it('User Journey Page - Edit (Dummy Submit)', () => {
    cy.get('[data-attribute="button-edit-contact-modal"]').click()

    cy.get('input#first_name').clear().type(generateRandomString())
    cy.get('input#last_name').clear().type(generateRandomString())
    cy.get('input#email').should('be.disabled')

    addListOrTag({
      type: 'list',
      itemName: 'General' || 'abc',
      sendAutoResponders: true
    })

    addListOrTag({
      type: 'tag',
      itemName: 'qwer' || '',
    })

    cy.get('[data-attribute="button-subscriber-upsert-save"]').click()
  })

  it('User Journey Page - Edit (Add Custom Field)', () => {
    cy.get('[data-attribute="button-edit-contact-modal"]').click()

    addCustomField({ 
      fieldName: 'Weight',
      fieldValue: '100'
     })
    addCustomField({ 
      fieldName: 'Age',
      fieldValue: '100'
     })
    addCustomField({ 
      fieldName: 'Company',
      fieldValue: 'Mailmunch'
     })
    addCustomField({ 
      fieldName: 'Website',
      fieldValue: 'https://mailmunch.com'
     })
    addCustomField({ 
      fieldName: 'Zip Code',
      fieldValue: '54000'
     })
    addCustomField({ 
      fieldName: 'Phone Number',
      fieldValue: '03001234567'
     })
    addCustomField({ 
      fieldName: 'Name',
      fieldValue: 'John Doe'
     })

    cy.get('[data-attribute="button-subscriber-upsert-save"]').click()
  })
  it('User Journey Page - Contains (Custom Field)', () => {
    cy.get('body').contains('Weight')
    cy.get('body').contains('Age')
    cy.get('body').contains('Company')
    cy.get('body').contains('Website')
    cy.get('body').contains('Zip Code')
    cy.get('body').contains('Phone Number')
    cy.get('body').contains('Name')
  })

})