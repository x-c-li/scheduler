import React, { useEffect, useState } from "react";
import axios from 'axios';
import DayList from "./DayList";

import "components/Application.scss";
import Appointment from "./Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
    interview: {
      student: "John",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Will",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Joe",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Bob",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg"
      }
    }
  }
];

export default function Application(props) {
  
  const [days, setDays] = useState([]);
  const [day, setDay] = useState([]);


  useEffect(() => {
    //get request using axios to update days state
    axios('http://localhost:8001/api/days')
      .then((response) => {
        // console.log("RESPONSE.DATA: ", response.data)
        setDays([...response.data]);
      })
      .catch((error) => {
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
            days={days}
            day={day}
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
        {appointments.map((appointment) =>
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
