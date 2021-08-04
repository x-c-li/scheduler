import React from 'react'
import "components/InterviewerListItem.scss";
import classNames from  'classnames';

// props needed for InterviewerListItem: 
//   key={interviewer.id}
//   name={interviewer.name}
//   avatar={interviewer.avatar}
//   setInterviewer={interviewer.setInterviewer}
//   selected={interviewer.id === interviewer}

export default function InterviewerListItem({
  name,
  avatar,
  setInterviewer, 
  selected
}) {
  
  const InterviewerListClass = classNames("interviewers__item", {
    'interviewers__item--selected': selected,
  });

  return (
    <div>
      <li className={InterviewerListClass} onClick={() => {setInterviewer(name)}}>
        <img
          className='interviewers__item-image'
          src={avatar}
          alt={name}
        />
        {selected && name}
      </li>
    </div>
  );
}