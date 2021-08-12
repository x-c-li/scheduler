describe("Navigation", () => {
  
  it("should book an interview", () => {
    cy
      .visit("/")// Visits the root of our web server
      .contains("[data-testid=day]", "Monday")//check dom for text Monday
    
    cy
      .get("[alt=Add")
      .first()
      .click();
  });

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