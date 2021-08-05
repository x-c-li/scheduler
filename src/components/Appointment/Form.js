import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"

// name={"Student Name"}
//       interviewers={interviewers}
//       interviewer={1}
//       onSave={action("OnSave")}
//       onCancel={action("OnCancel")}


export default function Form(props) {
  
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName("") 
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }
  // Add a cancel function to the Form component that calls reset() and props.onCancel. 
  // We should also update our Form component so it's called 
  // when a user clicks the Cancel button.
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"
          onSubmit={event => event.preventDefault()}
        >
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            // This must be a controlled component
            onChange={(event) => {
              setName(event.target.value); 
            }}
            type="text"
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          interviewer={interviewer} 
          setInterviewer={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};