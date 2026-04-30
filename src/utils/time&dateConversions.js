// converts the time to minutes
export const timeToMinutes = (time) => {
  let isPM = time.includes("PM");
  let isAM = time.includes("AM");

  time = time.replace("AM", "").replace("PM", "").trim();

  let [hours, minutes] = time.split(":").map(Number);

  // convert 12-hour → 24-hour
  if (isAM || isPM) {
    if (isPM && hours !== 12) {
      hours = hours + 12;
    }
    if (isAM && hours === 12) {
      hours = 0;
    }
  }

  return hours * 60 + minutes;
};

export const minutesToTime = (minutes) => {
  const hrs24 = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const hrs = hrs24 % 12 || 12;
  const ampm = hrs24 >= 12 ? "PM" : "AM";
  return `${hrs.toString()}:${mins.toString().padStart(2, "0")} ${ampm}`;
};

export const twelveHourToTwentyFourHour = (time12h) => {
  if (!time12h) return;

  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");
  hours = parseInt(hours);

  if (modifier === "AM") {
    if (hours === 12) hours = 0;
  } else {
    if (hours !== 12) hours += 12;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
};

// e.g. 2 weeks, 1 month =====>> date from today
export const durationToDate = (duration) => {
  const [time, unit] = duration.split(" ");
  const value = parseInt(time);
  const date = new Date();

  switch (unit) {
    case "Day":
    case "Days":
      date.setDate(date.getDate() + value);
      break;

    case "Week":
    case "Weeks":
      date.setDate(date.getDate() + value * 7);
      break;

    case "Month":
    case "Months":
      date.setMonth(date.getMonth() + value);
      break;
    case "Year":
    case "Years":
      date.setFullYear(date.getFullYear() + value);
      break;

    default:
      return null;
  }
  return date;
};
