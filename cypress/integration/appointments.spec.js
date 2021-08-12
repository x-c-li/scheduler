describe("Navigation", () => {

  beforeEach(()=>{
    cy.request("GET", "/api/debug/reset")//need bc we're changing state, resets to original state
    cy.visit("/");// Visits the root of our web server
    cy.contains("Monday");//check dom for text Monday
  })
  
  it("should book an interview", () => {
    
    cy // Clicks on the "Add" button in the second appointment
    .get("[alt=Add]")
    .first() //the second one is for the 5pm one
    .click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones"); // Enters their name
    cy.get("[alt='Sylvia Palmer']").click(); // click on interviewer Sylvia Palmer

    cy.contains("Save").click() // Clicks the save button

    cy.contains(".appointment__card--show", "Sylvia Palmer") //verify student names
    cy.contains(".appointment__card--show", "Lydia Miller-Jones") //verify student names

  });

    //should edit an interview (edit for Archie Cohen)
      // Visits the root of our web server
      // Clicks the edit button for the existing appointment
      // Changes the name and interviewer
      // Clicks the save button
      // Sees the edit to the appointment

      
    //should cancel an interview
      // Visits the root of our web server
      // Clicks the delete button for the existing appointment
      // Clicks the confirm button
      // Sees that the appointment slot is empty

});