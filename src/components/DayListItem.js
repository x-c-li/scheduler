import React from "react";

export default function DayListItem(props) {
  return (
    // <li> represents the entire day item
    <li> 
      {/* <h2> should display the day name </h2>   */}
      <h2 className="text--regular">Day Name</h2> 
      {/* <h3> should display the spots remaining for a day </h3> */}
      <h3 className="text--light">X spots remaining</h3>
    </li>
  );
}