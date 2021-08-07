//selector is to help compute new data from existing state in app 

export function getAppointmentsForDay(state, day) {

  const daysArray = state.days
  let dayAppointments = false;
  const results = [];

  for (const item of daysArray) {
    if (item.name === day) {
      dayAppointments = [...item.appointments]
    }
  }

  if (dayAppointments) {
    for (const key in state.appointments) {
      if (dayAppointments.includes(state.appointments[key].id)) {
        results.push(state.appointments[key]);
      }

    }
  }

  return results;
}

export function getInterviewersForDay(state, day) {

  let dayInterviewers = false;
  const results = [];

  for (const item of state.days) {
    if (item.name === day) {
      dayInterviewers = [...item.interviewers]
    }
  }

  if (dayInterviewers) {
    for (const key in state.interviewers) {
      if (dayInterviewers.includes(state.interviewers[key].id)) {
        results.push(state.interviewers[key]);
      }

    }
  }

  return results;
}

export function getInterview(state, interview) {
  if (interview === null) return null;

  const found = state.interviewers[interview.interviewer];
  const finalFound = {...interview, interviewer:found}

  return finalFound;
}
