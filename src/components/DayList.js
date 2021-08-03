import React from "react";
import classNames from "classnames";
// import "components/DayList.scss";
import DayListItem from"./DayListItem.js";


export default function DayList(props) {
  
  const item = props.days.map((day) => {
    return(
      <DayListItem
        key={day.key}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
      />
    )
  })

  console.log("ITEM: ", item);

  return item;

}