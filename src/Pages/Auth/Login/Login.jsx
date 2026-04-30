import { useForm } from "react-hook-form";
import { Button, Card, Label, TextInput, Select } from "flowbite-react";
import useAuth from "../../../hooks/useAuth";
import { notify, swal } from "../../../utils/notify";
import { useNavigate } from "react-router-dom";
import errorMessage from "../../../utils/errorMessage";

const Login = () => {
  const navigate = useNavigate();

  const { loginUser, fetchUser } = useAuth();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      console.log(res.data);
      if (res.status === 200) {
        reset();
        // fetch the user data
        swal("success", "Login Successful", res.data.message);
        await fetchUser();
        navigate("/");
      }
    } catch (error) {
      // console.log(error);
      swal("error", "Error!!!", errorMessage(error));
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-sm text-gray-600">Enter your information to login</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <Label>Email</Label>
            <TextInput
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label>Password</Label>
            <TextInput
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must be under 20 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Label>User role</Label>
            <Select
              {...register("role", {
                validate: (value) => {
                  if (value === "select") {
                    return "Select Role";
                  }
                },
              })}
            >
              <option value="select">Select role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
