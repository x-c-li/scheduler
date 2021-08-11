import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"

export default function Form(props) {
  
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer && props.interviewer.id || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("") 
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  function validate() {
    if (name === "") {
      setError("student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"
          onSubmit={event => event.preventDefault()}
        >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            // This must be a controlled component
            onChange={(event) => {
              setName(event.target.value); 
            }}
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers} 
          interviewer={interviewer} 
          setInterviewer={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
};