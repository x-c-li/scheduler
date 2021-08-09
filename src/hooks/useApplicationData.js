import { useState, useEffect } from "react";
import axios from 'axios';

const useApplicationData = function() {  

  const [state, setState] = useState({
    day: "Monday",
    days: [], 
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({...state, day}); //sets day in state
  
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

 
  return {state, setState, setDay, bookInterview, cancelInterview}


}

export default useApplicationData;

// export {useState, setDay, bookInterview, cancelInterview};