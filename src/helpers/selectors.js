//selector is to help compute new data from existing state in app 

export default function getAppointmentsForDay(state, day) {

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