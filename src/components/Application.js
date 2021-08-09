import React, { useEffect, useState } from "react";
import axios from 'axios';
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors"
import {state, setDay, bookInterview, cancelInterview} from "hooks/useApplicationData"

export default function Application(props) {
  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const interviewerArray = getInterviewersForDay(state, state.day)
  
  function bookInterview(id, interview) {
    // console.log(id, interview);
    //find id and add interview to the interview obj
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview } 
    };
    //replace prev existing data w new data
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview}) 
    .then((results) => {
      setState({...state, appointments})
    })
  }
  function cancelInterview(id) {
    //find id and add interview data to the interview obj
    const appointment = {
      ...state.appointments[id],
      interview: null 
    };
    //replace prev existing data w new data
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`) 
    .then((results) => {
      setState({...state, appointments})
    })
  }
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
      key={appointment.id}
      // {...appointment}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewerArray}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
    )
  })

  const getDaysURL = 'http://localhost:8001/api/days'
  const getAppointmentsURL = 'http://localhost:8001/api/appointments'
  const getInterviewersURL = 'http://localhost:8001/api/interviewers'

  useEffect(() => {
    //get request using axios to update days state
    Promise.all([
      axios.get(getDaysURL),
      axios.get(getAppointmentsURL),
      axios.get(getInterviewersURL),
    ]).then((all) => {
      setState(prev => ({ 
        ...prev, 
        days:all[0].data, 
        appointments:all[1].data,
        interviewers:all[2].data
      }))      
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        {<Appointment key="last" time="5pm" />}
      </section>
    </main>
  );
}
