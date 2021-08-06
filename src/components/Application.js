import React, { useEffect, useState } from "react";
import axios from 'axios';
import DayList from "./DayList";

import "components/Application.scss";
import Appointment from "./Appointment";

import getAppointmentsForDay from "helpers/selectors"

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [], 
    appointments: {}
  })

  // const state = { day: "Monday", days: []};
  const setDay = day => setState({...state, day}); //sets day in state
  const setDays = (days) => setState(prev => ({ ...prev, days})); 

  //set to state bc react only listens to changes to state vars vs reg js vars
  const [dailyAppointments, setDailyAppointments] = useState([]);

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
      // console.log(all);
      setState(prev => ({ ...prev, days:all[0].data, appointments:all[1].data}))
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    setDailyAppointments(getAppointmentsForDay(state, state.day));
    // console.log("DAILY APPOINTMENTS: ", dailyAppointments)
  },[JSON.stringify(state.appointments), state.day])

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
        {dailyAppointments.map((appointment) =>
            <Appointment 
              key={appointment.id}
              {...appointment}
            />
          )
        }
        {<Appointment key="last" time="5pm" />}
      </section>
    </main>
  );
}
