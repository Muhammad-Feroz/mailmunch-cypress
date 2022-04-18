class DashboardPage {
  constructor(){
    cy.intercept('POST', 'http://localhost:4000/', (req) => {
      if (req.body.operationName === 'UserSites'){
        req.alias = "UserSites"
      }
    })
    cy.wait('@UserSites')
    .its('response.body.data.sites').should('exist')
    .then(sites => {
      cy.visit(`/sites/${sites[0].id}`)
    })
  }

  runTests(){
    this.test1()
  }

  test1(){
    cy.log("done")
  }
}

export default DashboardPage