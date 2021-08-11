import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText} from "@testing-library/react";

import Application from "components/Application";
import { forceReRender } from "@storybook/react";

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
    const { container } = render(<Application />);
    
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // fireEvent.click(getByText("Monday"))
    console.log("CONTAINER: ", prettyDOM(container));

    const appointments = getAllByTestId(container, "appointment");
    console.log(prettyDOM(appointments));

    const appointment = getAllByTestId(container, "appointment")[0];
    console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    
    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    // expect(getByText("Leopold Silvers")).toBeInTheDocument();
  
  })

})

