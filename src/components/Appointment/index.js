import React from "react";

import "./styles.scss"

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"

import useVisualMode from "../../hooks/useVisualMode"

//-------------------STATES---------------------------------------------------------------------------
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


//-------------------EXPORTS---------------------------------------------------------------------------

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
    .catch(() => transition(ERROR_SAVE, true))
  };

  function deleting() {
    transition(DELETE, true);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(() => transition(ERROR_DELETE, true))
  };

  function confirm() {
    transition(DELETE);
    transition(CONFIRM, true);
  };

  function edit() {
    transition(EDIT);
  };

  return (
    <article className="appointment" data-testid="appointment">
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
        name={props.interview.student}
        interviewers={props.interviewers} 
        interviewer={props.interview.interviewer} 
        // setInterviewer={setInterviewer} 
        onCancel={back}
        onSave={save}
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
          onSave={save}
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
      {mode === ERROR_DELETE && (
        <Error
        message={"Error: Cannot delete appointment"}
        onClose={() => back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
        message={"Error: Cannot save appointment"}
        onClose={() => back()}
        />
      )}
    </article>
  );
};