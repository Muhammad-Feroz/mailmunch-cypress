import TagsPage from "../../pages/Tags"

context('Cypress Mailmunch - Tags Page Tests', () => {
  beforeEach(() => {
    cy.login()
  });

  it('Tags', () => {
    cy.visit('/sites')
    const tagsPageTestCases = new TagsPage()

    cy.fixture('users').then(users => {
      const { admin } = users
      tagsPageTestCases.runTests({ ...admin })
    })
  })
})