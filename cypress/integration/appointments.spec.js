describe("Navigation", () => {

  beforeEach(()=>{
    cy.request("GET", "/api/debug/reset");//need bc we're changing state, resets to original state
    cy.visit("/");// Visits the root of our web server
    cy.contains("Monday");//check dom for text Monday
  });
  
  it("should book an interview", () => {
    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
    .first() //the second one is for the 5pm one
    .click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones"); // Enters their name
    cy.get("[alt='Sylvia Palmer']").click(); // click on interviewer Sylvia Palmer

    cy.contains("Save").click(); // Clicks the save button

    cy.contains(".appointment__card--show", "Sylvia Palmer"); //verify interviewer
    cy.contains(".appointment__card--show", "Lydia Miller-Jones"); //verify student names

  });

  it("should edit an interview", () => {

    cy.get("[alt=Edit]")
    .first()
    .click({force: true}); // Clicks the edit button for the existing appointment
    
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones"); // change their name

    cy.get("[alt='Tori Malcolm']").click(); // click on interviewer Tori Malcolm
    
    cy.contains("Save").click(); // Clicks the save button

    cy.contains(".appointment__card--show", "Lydia Miller-Jones"); //verify interviewer
    cy.contains(".appointment__card--show", "Tori Malcolm"); //verify student names

  });      
      
  it("should cancel an interview", () => {
    // Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]")
    .first()
    .click({ force: true });
    
    // Clicks the confirm button
    cy.contains("Confirm").click();
    
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    
    // Sees that the appointment slot is empty
    cy
    .contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");

  })

});