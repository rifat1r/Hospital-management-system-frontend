export const createSchedule = async (axios, payload) => {
  const res = await axios.post("/doctor/schedule", payload);
  return res.data;
};

export const getSchedules = async (axios, doctorId) => {
  const res = await axios.get(`/doctor/schedule?doctorId=${doctorId}`);
  return res.data;
};

export const updateScheduleSlot = async (axios, dayOfWeek, slotId, newSlot) => {
  const res = await axios.patch("/doctor/schedule", {
    dayOfWeek,
    slotId,
    newSlot,
  });
  return res.data;
};

export const updateScheduleSettings = async (axios, data) => {
  const res = await axios.patch("/doctor/schedule/settings", data);
  console.log("settings data is here --", res);

  return res.data;
};
