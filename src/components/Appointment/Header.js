import React from "react";
// import classNames from "classnames";
// import "components/Appointment/styles.scss"


// time:String
export default function Header(props) {
  
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
};
