describe("Navigation", () => {
  
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    //visit homepage
    cy.visit("/");

    cy
      .contains("[data-testid=day]", "Tuesday")
      .click()//click on it
      .should("have.class", "day-list__item--selected");//check bckgrnd color


  });

});