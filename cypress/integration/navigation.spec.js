describe("Navigation", () => {
  
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    //visit homepage
    cy.visit("/");
    
    
    cy.get('li')//find list item
      .contains('Tuesday')//must contain "Tuesday"
      .click()//click on it

    cy
      .contains("li", "Tuesday")
      .should("have.css", "background-color", "rgb(242, 242, 242)");


  });

});