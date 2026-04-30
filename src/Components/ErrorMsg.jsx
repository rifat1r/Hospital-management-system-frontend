const Errormessage = ({ message }) => {
  // console.log("message", message);
  return message ? (
    <p className="text-red-500 text-sm">{message.message}</p>
  ) : null;
};

export default Errormessage;
