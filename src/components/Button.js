import React from "react";

import "components/Button.scss";

export default function Button(props) {
   let buttonClass = "button";

   if (props.confirm) {
      buttonClass += " button--confirm";
   } 
   
   if (props.danger) {
      buttonClass += " button--danger";
   }

   if (props.disabled) {
      buttonClass += " button-disabled";
   }

   return <button className={buttonClass}>{props.children}</button>;
}
