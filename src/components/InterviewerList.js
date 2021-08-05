import React from "react";
import InterviewerListItem from "./InterviewerListItem.js";
import "components/InterviewerList.scss";


export default function InterviewerList(props) { 

  const interviewPerson = props.interviewers.map((interviewer) => {
    return (
    
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={event => props.setInterviewer(interviewer.id)}
        selected={interviewer.id === props.interviewer}
      />
    
    )
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewPerson}</ul>
    </section>
  );

}