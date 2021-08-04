// Create a file with our component name
// Create & Export the component function
// Add the base HTML in the return statement of our component
// Create & Import a CSS / SCSS file holding the style of our component
// Write stories for Storybook to render our component in isolation
// Refactor the hardcoded content to use props & state

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
        setInterviewer={event => props.setInterviewer(interview.id)}
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