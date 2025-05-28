import { useForm } from "react-hook-form";
import ErrorMsg from "../ErrorMsg";
import { Button, FileInput, Label, TextInput } from "flowbite-react";

const UserForm = ({ role, onSubmit, profile }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: role,
    },
    values: profile,
  });

  // one column for self profile and two column for other cases
  const gridClass = `grid ${
    profile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
  } gap-2 items-baseline mb-2`;
  return (
    <div className={`${profile && "lg:w-3/5"} w-full`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={gridClass}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name"> Name</Label>
            </div>
            <TextInput
              {...register("name", { required: "Please provide name" })}
              placeholder="Name here"
              type="text"
            />
            {/* error message */}
            <ErrorMsg msg={errors?.name} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name"> Email</Label>
            </div>
            <TextInput
              {...register("email", {
                required: "Please provide email",
              })}
              type="email"
              placeholder="Email here"
            />
            {/* error message */}
            <ErrorMsg msg={errors?.email} />
          </div>
          {/* dont show password field when visit profile */}
          {!profile && (
            <div>
              <div className="my-2 block">
                <Label htmlFor="email">Password</Label>
              </div>
              <TextInput
                {...register("password", {
                  required: "please provide password",
                })}
                placeholder="Password here"
              />
              {/* error message */}
              <ErrorMsg msg={errors?.password} />
            </div>
          )}
          <div>
            <div className="mb-2 block">
              <Label>Phone no</Label>
            </div>
            <TextInput
              {...register("number")}
              type="text"
              placeholder="Phone number"
            />
            {/* error message */}
            <ErrorMsg msg={errors?.number} />
          </div>
        </div>

        {/* fields specific to doctor */}
        {role === "doctor" && (
          <div className={gridClass}>
            <div>
              <div className="mb-2 block">
                <Label> Designation</Label>
              </div>
              <TextInput
                {...register("designation", {
                  required: role === "doctor" && "Please provide designation",
                })}
                type="text"
                placeholder="Designation here"
              />
              {/* error message */}
              <ErrorMsg msg={errors?.designation} />
            </div>

            <div>
              <div className="mb-2 block">
                <Label>Passing year</Label>
              </div>
              <TextInput
                {...register("passingYear", {
                  required: role === "doctor" && "Please provide passing year",
                })}
                type="number"
                placeholder="Passing year here"
              />
              {/* error message */}
              <ErrorMsg msg={errors?.passingYear} />
            </div>
          </div>
        )}

        {/* role and image upload */}
        <div className={gridClass}>
          <div>
            <div className="mb-2 block">
              <Label>User role</Label>
            </div>
            <TextInput readOnly type="text" {...register("role")} />
          </div>
          <div>
            <Label className="mb-2 block" htmlFor="file-upload">
              Select Photo
            </Label>
            <FileInput {...register("image")} id="file-upload" />
          </div>
        </div>

        <div className="flex justify-end  text-gray-500 py-4 dark:text-gray-300 ">
          <Button type="submit" color="blue">
            {profile ? "Update Profile" : "Create Account"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
