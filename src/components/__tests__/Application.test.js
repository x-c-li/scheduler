import React from "react";

import {
  render, 
  cleanup, 
  waitForElement, 
  fireEvent, 
  getByText, 
  getAllByTestId, 
  getByAltText, 
  getByPlaceholderText, 
  prettyDOM, 
  queryByText, 
  queryByAltText
} from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    //left alone bc only needs getByText function within scope of this test

    const { getByText } = render(<Application />);
    //asynchronous function has been defined as one using the async keyword.
    // Promise chain can be hidden by using the await keyword
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // Render the Application.
    const { container, debug } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // Click the "Add" button on the first empty appointment
    fireEvent.click(getByAltText(appointment, "Add"));
    
    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //updating appointment, if saves, we'll see saving 
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    console.log(prettyDOM(day));
  })

  it("loads data, cancel an interview and increase the spots remaining for the first day by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"))

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    //it has to be one spot bc of the test above, and not 2 spots
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

    console.log(prettyDOM(day));

  })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // Render the Application.
    const { container } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // Change the name and click the SAVE button on the appointment
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Tori Malcolm"))

    fireEvent.click(getByText(appointment, "Save"));
    
    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    // Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
    console.log(prettyDOM(day));
  })

  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
    //use mockRejectedValueOnce() because we want the mock to revert to the default behaviour 
    //after the single request that this test generates is complete


  })

  it("shows the delete error when failing to delete an existing appointment", async () => {
    // Render the Application.
    const { container } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    // Click the "Delete" button on the appointment
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    // Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"))

    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    axios.delete.mockRejectedValueOnce();

    // Check that the error message is shown.
    expect(getByText(appointment, "Error: Cannot save appointment")).toBeInTheDocument();
    
    //Click the "X" button on the error 
    fireEvent.click(queryByAltText(appointment, "Close"))

    

  })

})