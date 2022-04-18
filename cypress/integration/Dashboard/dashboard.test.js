/// <reference types="cypress" />

context('Cypress Mailmunch - Dashboard Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/sites/63/dashboard?user_token=CsTahvRfib9Egg1Cxf5L5EL1')
    cy.url().should('include', '/dashboard');
    cy.wait(5000)
  });

  it('Dashboard Analytics', () => {
    cy.contains('Impressions');
    cy.contains('Subscribers');
    cy.contains('Conversion')
  })

  it('Dashboard (Date Range)', () => {
    cy.get('[data-attribute="dropdown-date-range"]').click()
    cy.get('li').contains('90 Days').click()
    cy.get('div.grid').within(() => {
      cy.get('div').contains('90 Days')
    })

    cy.get('[data-attribute="dropdown-date-range"]').click()
    cy.get('li').contains('30 Days').click()
    cy.get('div.grid').within(() => {
      cy.get('div').contains('30 Days')
    })

    cy.get('[data-attribute="dropdown-date-range"]').click()
    cy.get('li').contains('7 Days').click()
    cy.get('div.grid').within(() => {
      cy.get('div').contains('7 Days')
    })
  })

  it('Dashboard Widgets', () => {
    cy.get('[data-attribute="dashboard-new-widgets"]').click()
    cy.get('[data-attribute="button-Confirm"]').click()
    cy.contains('required')

    cy.get('[data-attribute="input-campaign-name"]').click().type('Test Campaign');
    cy.get('[data-attribute="button-Confirm"]').click()
  })

  it('Dashboard Landing Pages', () => {
    cy.url().should('include', 'dashboard')
    cy.wait(5000)
    cy.get('[data-attribute="dashboard-new-landing_pages"]').click()
    cy.get('[data-attribute="button-Confirm"]').click()
    cy.contains('required')

    cy.get('[data-attribute="input-campaign-name"]').click().type('Test Campaign');
    cy.get('[data-attribute="button-Confirm"]').click()
    cy.wait(5000)
    cy.get('button').contains('CLOSE').click()
  })
})