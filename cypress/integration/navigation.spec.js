describe("Navigation", () => {
  
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    //visit homepage
    cy.visit("/");

    cy
      .contains("li", "Tuesday")
      .click()//click on it
      .should("have.css", "background-color", "rgb(242, 242, 242)");//check bckgrnd color


  });

});