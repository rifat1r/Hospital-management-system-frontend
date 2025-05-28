import { useForm } from "react-hook-form";
import auth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../utils/notify";

const Register = () => {
  //function to notify user

  const { createUser, fetchUser } = auth();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  //handle the form
  const onSubmit = async (data) => {
    try {
      const res = await createUser(data);
      console.log(res);
      //notify on  success
      if (res.status === 201) {
        reset();
        notify(res.data.msg, "success");
        await fetchUser();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        notify(error.response.data.msg, "error");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" rounded-lg shadow-xl py-3 px-5">
        <div className="my-4 space-y-2">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p className="text-md">Enter your information to create an account</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto space-y-5 "
        >
          {/* email */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("email", { required: "Email is Required" })}
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              for="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {/* erros for email */}
            {errors.email && (
              <p className="text-sm text-red-400" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* password */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("password", {
                // password validation rules
                required: "Password is Required",
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {/*password validation erros */}
            {errors.password?.type === "required" ? (
              <p className="text-sm text-red-400" role="alert">
                {errors.password?.message}
              </p>
            ) : (
              <p className="text-sm text-red-400" role="alert">
                {errors.password?.message}
              </p>
            )}
          </div>
          {/* full name */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name should be 3 character or more",
                },
                maxLength: {
                  value: 20,
                  message: "Name should be 20 character or less",
                },
              })}
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
            {errors.name && (
              <p className="text-sm text-red-400" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register("number", {
                  minLength: {
                    value: 8,
                    message: "Phone number should be more than 8 characters",
                  },
                })}
                type="text"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>

              {errors.number && (
                <p className="text-sm text-red-400" role="alert">
                  {errors.number?.message}
                </p>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register("age")}
                type="number"
                name="age"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Age
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register("address")}
                type="text"
                name="address"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Address
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <select
                {...register("role")}
                disabled
                id="underline_select"
                className="disabled block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option value="patient" selected>
                  Patient
                </option>
              </select>
              <label htmlFor="underline_select" className="sr-only">
                Underline select
              </label>
            </div>
          </div>
          <button
            type="submit"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
