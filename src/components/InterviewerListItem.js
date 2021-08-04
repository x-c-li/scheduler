import React from 'react'
import "components/InterviewerListItem.scss";
import classNames from  'classnames';

// props needed for InterviewerListItem: 
//   key={interviewer.id}
//   name={interviewer.name}
//   avatar={interviewer.avatar}
//   setInterviewer={interviewer.setInterviewer}
//   selected={interviewer.id === interviewer}

export default function InterviewerListItem(props) {
  
  const InterviewerListClass = classNames("interviewers__item", {
    'interviewers__item--selected': props.selected,
  });

  return (
    <li className={InterviewerListClass} onClick={props.setInterviewer}>
      <img
        className='interviewers__item-image'
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}