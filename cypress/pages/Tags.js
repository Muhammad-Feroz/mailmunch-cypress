import { generateRandomName, generateRandomNumber, interceptGqlRequest } from "../utils/helpers"

class TagsPage {
  constructor(){
    cy.intercept('POST', 'http://localhost:4000/', (req) => {
      if (req.body.operationName === 'UserSites'){
        req.alias = "UserSites"
      }
    })
    cy.wait('@UserSites')
    .its('response.body.data.sites').should('exist')
    .then(sites => {
      cy.visit(`/sites/${sites[0].id}/tags`)
    })
  }

  runTests(){
      cy.log("uzair")
    //   this.verifyCreateNewTag()
    //   this.verifySuccessfulDeleteTag()
    //   this.verifySuccessfulUpdateTag()
    //   this.verifySuccessfulUpdateTag()
    //   this.verifyPreventEmptyTagCreation()
      this.verifyPreventEmptyTagNameOnUpdate()
  }

  verifyCreateNewTag = () => {
    interceptGqlRequest({ alias: 'createSiteTag' })

    cy.get("[data-attribute=button-tag-create-new]").click()
    cy.get("[data-attribute=input-tag-upsert-name]").type(generateRandomName())
    cy.get("[data-attribute=button-tag-upsert]").click()

    cy.wait('@createSiteTag')
    .its("response.body.data.createSiteTag.success").should("eq", true)
  }
  verifyPreventEmptyTagCreation(){
    cy.get("[data-attribute=button-tag-create-new]").click()
    cy.get('[data-attribute="input-tag-upsert-name"]').clear()
    cy.get('[data-attribute="button-tag-upsert"]').click()
    cy.get('[data-attribute="tooltip-tag-upsert-name"]').should("exist")
    cy.get('[data-attribute="modal-close-tag-upsert"]').click()
    
  }

  verifyPreventEmptyTagNameOnUpdate(){
      cy.get('[data-attribute="icon-tag-upsert-0"]').click()
      cy.get('[data-attribute="input-tag-upsert-name"]').clear()
      cy.get('[data-attribute="button-tag-upsert"]').click()
      cy.get('[data-attribute="tooltip-tag-upsert-name"]').should("exist")
      cy.get('[data-attribute="modal-close-tag-upsert"]').click()
    
  }

  verifySuccessfulDeleteTag = () => {
    interceptGqlRequest({ alias: 'deleteSiteTag' })

    cy.get('[data-attribute="icon-tag-delete-1"]').click()
    // cy.get("[data-attribute='button-list-delete']").click()
    cy.get('[data-attribute="button-tag-delete"]').click()
    cy.wait('@deleteSiteTag')
    .its("response.body.data.deleteSiteTag.success").should("eq", true)
  }

  verifySuccessfulUpdateTag(){
    interceptGqlRequest({ alias: 'updateSiteTag' })

    cy.get('[data-attribute="icon-tag-upsert-1"]').click()

    // cy.get('[data-attribute="input-tag-upsert-name"]').clear()
    cy.get('[data-attribute="input-tag-upsert-name"]').clear()
    cy.get('[data-attribute="input-tag-upsert-name"]').type(generateRandomName())
    cy.get('[data-attribute="button-tag-upsert"]').click()
    
    cy.wait('@updateSiteTag')
    .its("response.body.data.updateSiteTag.success").should("eq", true)



}

  

}

export default TagsPage