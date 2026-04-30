import { useNavigate, useParams } from "react-router-dom";
import PasswordForm from "./PasswordForm";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { resetPassword } from "../../../api/userApi";
import { useState } from "react";
import { swal } from "../../../utils/notify";

const ResetPassword = () => {
  const { token } = useParams();
  console.log("token", token);
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsloading(true);
      const res = await resetPassword(axiosSecure, { ...data, token });
      console.log("response", res);
      if (res.status === 200) {
        // notify(res.data.message, "success");

        swal("success", "Success!", res.data.message);
        setIsloading(false);
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status) {
        swal("error", "Could not reset password", error.response.data.message);
        setIsloading(false);
      }
    }
  };
  return (
    <div>
      <h1 className="text-center text-3xl font-semibold my-7 ">
        Reset your password from here
      </h1>
      <PasswordForm type="reset" onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
};

export default ResetPassword;
