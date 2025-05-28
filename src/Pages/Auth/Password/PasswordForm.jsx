import { Button, Label, Select, Spinner, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";

const PasswordForm = ({ type, onSubmit, isLoading, emailSent }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-md flex-col gap-4 m-auto"
    >
      {type === "forgot" && (
        <div>
          <div className="mb-2 block">
            <Label>Your email</Label>
          </div>
          <TextInput
            {...register("email", { required: "Email is Required" })}
            type="email"
            placeholder="example@mail.com"
          />
          {errors.email && (
            <p className="text-sm text-red-400" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      )}
      {type === "reset" && (
        <>
          <div>
            <div className="mb-2 block">
              <Label>New Password</Label>
            </div>
            <TextInput
              {...register("newPassword", {
                required: "Provide new Password",
                minLength: {
                  value: 6,
                  message: "Password should be 6 character or more",
                },
                maxLength: {
                  value: 20,
                  message: "Password should be 20 character or less",
                },
              })}
              type="password"
              placeholder="New Password"
            />
            {errors.newPassword && (
              <p className="text-sm text-red-400" role="alert">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label>Confirm new password</Label>
            </div>
            <TextInput
              {...register("confirmPassword", {
                required: "Confirm new Password",
                minLength: {
                  value: 6,
                  message: "Password should be 6 character or more",
                },
                maxLength: {
                  value: 20,
                  message: "Password should be 20 character or less",
                },
              })}
              type="password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-400" role="alert">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </>
      )}
      <div className="max-w-md mb-2">
        <div className="mb-2 block">
          <Label htmlFor="countries">Select your Role</Label>
        </div>
        <Select
          {...register("role", {
            validate: (value) => {
              if (value === "default") {
                return "Select a Role";
              }
            },
          })}
        >
          <option value="default">Select Role</option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="admin">Admin</option>
        </Select>
        {errors.role && (
          <p className="text-sm text-red-400" role="alert">
            {errors.role.message}
          </p>
        )}
      </div>
      <Button disabled={isLoading || emailSent} color="blue" type="submit">
        {isLoading ? (
          <>
            <div className=" pb-1">
              <Spinner
                size="sm"
                aria-label="Info spinner example"
                className="me-3"
                light
              />
            </div>
            <span>Please Wait ...</span>
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
};

export default PasswordForm;
