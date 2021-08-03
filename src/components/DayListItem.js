import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  
  const DayListClass = classNames("day-list__item", {
    '--selected': props.selected,
    '--full': props.spots
  });

  return (
    <li className={DayListClass} onClick={() => {props.setDay(props.name)}}> 
      <h2>{props.name}</h2> 
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}

export function formatSpots(spots) {
  if (spots === 0) {
    return `no spots remaining`;
  }
  if (spots === 1) {
    return `${spots} spot remaining`;
  } 
  return `${spots} spots remaining`;
}