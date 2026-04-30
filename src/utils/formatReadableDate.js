const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
export default formatDate;
