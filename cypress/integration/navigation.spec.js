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

    //should book an interview
      // Visits the root of our web server
      // Clicks on the "Add" button in the second appointment
      // Enters their name
      // Chooses an interviewer
      // Clicks the save button
      // Sees the booked appointment


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

});