import { useForm } from "react-hook-form";
import { Button, Card, Label, TextInput, Select } from "flowbite-react";
import auth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { notify, swal } from "../../../utils/notify";
import errorMessage from "../../../utils/errorMessage";

const Register = () => {
  const { createUser, fetchUser } = auth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await createUser(data);
      if (res.status === 201) {
        reset();
        notify(res.data.message, "success");
        await fetchUser();
        navigate("/");
      }
    } catch (error) {
      // console.log("register error --", error);
      swal("error", "Error!!!", errorMessage(error));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-sm text-gray-600">
          Enter your information to create an account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          {/* Full name */}
          <div>
            <Label>Name</Label>

            <TextInput
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Phone & Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Phone number</Label>

              <TextInput
                type="number"
                placeholder="Enter your phone number"
                {...register("phoneNo", {
                  required: "Phone number is required",
                  minLength: {
                    value: 8,
                    message: "Phone number too short",
                  },
                })}
              />
              {errors.phoneNo && (
                <p className="text-sm text-red-500">{errors.phoneNo.message}</p>
              )}
            </div>

            <div>
              <Label>Date of Birth</Label>

              <TextInput
                type="date"
                placeholder="Select your birth date"
                {...register("birthDate", {
                  required: "Birth date is required",
                  validate: (value) =>
                    new Date(value) < new Date() ||
                    "Birth date must be in the past",
                })}
              />
              {errors.birthDate && (
                <p className="text-sm text-red-500">
                  {errors.birthDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Gender & Role */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Gender</Label>
              <Select
                id="gender"
                {...register("gender", {
                  validate: (value) => value !== "select" || "Select a gender",
                })}
              >
                <option value="select">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
              {errors.gender && (
                <p className="text-sm text-red-500">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <Label>Role</Label>

              <Select
                id="role"
                disabled
                {...register("role")}
                defaultValue="patient"
              >
                <option value="patient">Patient</option>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
