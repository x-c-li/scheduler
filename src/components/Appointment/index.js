import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import useVisualMode from "hooks/useVisualMode"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  
  const { mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
  }

  function deleting() {
    transition(DELETE);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
  }

  function confirm() {
    transition(DELETE);
    transition(CONFIRM);
  }

  function edit() {
    transition(CREATE)
  }

  return (
    <article className="appointment">
      <Header 
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CONFIRM && (
        <Confirm 
        message={"Are you sure you would like to delete?"}
        onCancel={back}
        onConfirm={deleting}
        />
      )}
      {mode === EDIT && (
        <Form 
        interviewers={props.interviewers} 
        interviewer={props.interviewer} 
        // setInterviewer={setInterviewer} 
        onCancel={back}
        save={save}
      />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          interviewer={props.interviewer} 
          // setInterviewer={setInterviewer} 
          onCancel={back}
          save={save}
        />
      )}
      {mode === SAVING && (
        <Status 
        message={"Saving"}
        />
      )}
      {mode === DELETE && (
        <Status 
        message={"Deleting"}
        />
      )}
    </article>
  );
};