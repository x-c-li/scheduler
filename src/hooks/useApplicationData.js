import { useState, useEffect } from "react";
import axios from 'axios';

const useApplicationData = function() {  

  const [state, setState] = useState({
    day: "Monday",
    days: [], 
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({...state, day}); //sets day in state

  const updateSpots = function (requestType) {
    
    const dayIndex = state.days.findIndex(day => day.name === state.day)
    const days = state.days; 

    if (requestType === `create`) {
      days[dayIndex].spots -= 1 
    } else {
      days[dayIndex].spots += 1
    }

    return days;
  };

  function bookInterview(id, interview) {
    
    let days = state.days;
    let requireUpdate = false;
    const appointment = {
      ...state.appointments[id]
    };
    if (!appointment.interview) {
      requireUpdate = true;
    }
    
    appointment.interview = {...interview}

    //replace prev existing data w new data
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview}) 
    .then((results) => {
      if (requireUpdate) {
        days = updateSpots('create');
      }
      setState({...state, appointments, days})
    });
  }
  
  function cancelInterview(id) {
    let days = state.days;
    let requireUpdate = false;

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
      days = updateSpots();
      setState({...state, appointments, days})
    });
  };

  const getDaysURL = '/api/days';
  const getAppointmentsURL = '/api/appointments';
  const getInterviewersURL = '/api/interviewers';

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
  }, []);
 
  return {state, setState, setDay, bookInterview, cancelInterview};

}

export default useApplicationData;