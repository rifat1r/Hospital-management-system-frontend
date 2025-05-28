const ErrorMsg = ({ msg }) => {
  // console.log("msg", msg);
  return msg ? <p className="text-red-500 text-sm">{msg.message}</p> : null;
};

export default ErrorMsg;
