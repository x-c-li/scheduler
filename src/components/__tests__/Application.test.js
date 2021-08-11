import React from "react";

import {render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText} from "@testing-library/react";

import Application from "components/Application";

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
    // console.log("CONTAINER: ", prettyDOM(container));

    const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));

    const appointment = getAllByTestId(container, "appointment")[0];
    // console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
    debug()
    //updating appointment, if saves, we'll see saving 
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

  })

})

