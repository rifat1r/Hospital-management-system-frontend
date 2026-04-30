import { timeToMinutes } from "./time&dateConversions";

// formating the schedule as schema defined
const scheduleFormatter = ({
  daysOfWeek,
  slots,
  appointmentDuration,
  appointmentFee,
}) => {
  // console.log("days of week ---", typeof daysOfWeek, daysOfWeek);
  const availableDays = daysOfWeek.map((day) => {
    return {
      dayOfWeek: day,
      slots: slots.map((slot) => ({
        // all index has the same start time and end time
        startTime: timeToMinutes(slot.startTime),
        endTime: timeToMinutes(slot.endTime),
      })),
    };
  });
  return { availableDays, appointmentFee, appointmentDuration };
};

export default scheduleFormatter;
