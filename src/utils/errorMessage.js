const errorMessage = (error) => {
  return typeof error.response?.data?.message === "object"
    ? Object.values(error.response?.data?.message).join(", ") //this line will extracts error messages from nested objects and joins them
    : error.response?.data?.message || error.message || "Something went wrong";
};

export default errorMessage;
