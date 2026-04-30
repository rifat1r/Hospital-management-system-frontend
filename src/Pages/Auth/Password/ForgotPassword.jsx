import { forgotPassword } from "../../../api/userApi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { swal } from "../../../utils/notify";
import { useState } from "react";
import PasswordForm from "./PasswordForm";

const ForgotPassword = () => {
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsloading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsloading(true);
      const res = await forgotPassword(axiosSecure, data);
      setEmailSent(true);

      // console.log("res", res);
      if (res.status === 200) {
        setIsloading(false);
        swal("success", "Success!", res.data.message, true);
      }
    } catch (error) {
      if (error.response.status === 404) {
        setIsloading(false);
        swal("error", "Could not send email", error.response.data.message);
      }
      // console.log("error", error);
    }
  };

  return (
    <div className="m-auto">
      <h2 className="text-center text-3xl font-semibold my-5">
        Please provide your email and role <br /> to proceed
      </h2>
      <PasswordForm
        type="forgot"
        onSubmit={onSubmit}
        isLoading={isLoading}
        emailSent={emailSent}
      />
    </div>
  );
};

export default ForgotPassword;
