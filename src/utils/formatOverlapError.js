import { timeToMinutes } from "./time&dateConversions";

// this function will take the overlapping slots from error response then it will match those slots with input slots and will return the matched input slots index and overlapping days
const formatOverlapError = (overlaps, inputSlots) => {
  const convertedInputSlots = inputSlots.map((slot) => {
    return {
      startTime: timeToMinutes(slot.startTime),
      endTime: timeToMinutes(slot.endTime),
    };
  });
  const conflictingSlots = {
    conflictingDays: [],
    conflictingSlotIndex: [],
  };
  overlaps.conflictedDays.forEach((day) => {
    // store conflicting days
    conflictingSlots.conflictingDays.push(day.dayOfWeek);
    // find matching input slots of the conflicting slots
    convertedInputSlots.forEach((slot, index) => {
      if (
        slot.startTime === day.slot.startTime &&
        slot.endTime === day.slot.endTime
      ) {
        conflictingSlots.conflictingSlotIndex.push(index);
      }
      // slot === day.slot ? conflictingSlots.conflictingSlotIndex.push(index) : null;
    });
  });
  // remove duplicates
  conflictingSlots.conflictingDays = [
    ...new Set(conflictingSlots.conflictingDays),
  ];
  conflictingSlots.conflictingSlotIndex = [
    ...new Set(conflictingSlots.conflictingSlotIndex),
  ];

  return conflictingSlots;
};

export default formatOverlapError;
