const dateFormatter = (date) => {
  // converts a date to UTC ISO string format (yyyy-mm-ddThh:mm:ss.sssZ)
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  ).toISOString();
};

export default dateFormatter;
