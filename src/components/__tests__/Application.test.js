import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";
import { forceReRender } from "@storybook/react";

afterEach(cleanup);

describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    //asynchronous function has been defined as one using the async keyword.
    // Promise chain can be hidden by using the await keyword
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // Render the Application.
    const { getByText } = render(<Application />);
    
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Monday"))
  
    ex[ect]
    
    // Click the "Add" button on the first empty appointment.
    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    // Click the first interviewer in the list.
    // Click the "Save" button on that same appointment.
    // Check that the element with the text "Saving" is displayed.
    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
  
  
    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  
  })

})

