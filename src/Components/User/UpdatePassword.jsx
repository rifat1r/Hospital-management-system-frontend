import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import ErrorMsg from "../ErrorMsg";
import { updatePassword } from "../../api/userApi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { notify } from "../../utils/notify";

const UpdatePassword = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    try {
      const res = await updatePassword(axiosSecure, data);
      if (res.success) {
        notify(res.msg, "success");
      }
    } catch (error) {
      if (error.response) {
        notify(error.response.data.msg, "error");
      }
    }
  };

  return (
    <div className="lg:w-2/5 w-full">
      <h1 className="text-2xl font-bold mb-6">Change Your Password</h1>
      <div>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">Old Password</Label>
              </div>
              <TextInput
                {...register("password", {
                  required: "Please provide old password",
                })}
                placeholder="Old password here"
                type="password"
              />
              {/* error message */}
              <ErrorMsg msg={errors?.oldPassword} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">New Password</Label>
              </div>
              <TextInput
                {...register("newPassword", {
                  required: "Please provide new password",
                })}
                placeholder="New password here"
                type="password"
              />
              {/* error message */}
              <ErrorMsg msg={errors?.newPassword} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">Confirm new password</Label>
              </div>
              <TextInput
                {...register("confirmPassword", {
                  required: "Please provide new password again to confirm",
                })}
                placeholder="confirm new password here"
                type="password"
              />
              {/* error message */}
              <ErrorMsg msg={errors?.confirmPassword} />
            </div>
            <div className="flex justify-end">
              <Button type="submit" color="blue">
                Change Password
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
