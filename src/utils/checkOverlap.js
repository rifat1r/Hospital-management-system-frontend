import { timeToMinutes } from "./timeToMinutes";

const checkOverlap = (slots) => {
  
  const overlaps = slots.filter((slot)=> {
    return
  })
 
 
  // // new slot
  // const newSlot = slots[slots.length - 1];

  // // dont compare with the last one and get the index of the slot that overlaps with new slot
  // const hasOverlap = slots.slice(0, -1).findIndex((slot) => {
  //   return (
  //     timeToMinutes(newSlot.startTime) < timeToMinutes(slot.endTime) &&
  //     timeToMinutes(newSlot.endTime) > timeToMinutes(slot.startTime)
  //   );
  // });
  // return hasOverlap;
}

export default checkOverlap;
