// Create a file with our component name
// Create & Export the component function
// Add the base HTML in the return statement of our component
// Create & Import a CSS / SCSS file holding the style of our component
// Write stories for Storybook to render our component in isolation
// Refactor the hardcoded content to use props & state

import React from "react";
import InterviewerListItem from "./InterviewerListItem.js";

export default function Component(props) { 
  
  const interviewPerson = props.interviewer.map((interview) => {
    return (
      <InterviewerListItem
        key={interview.id}
        name={interview.name}
        avatar={interview.avatar}
        setInterviewer={interview.setInterviewer}
      />
    )
  });

  return interviewPerson;

}
