import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { notify } from "../../../utils/notify";
import { useNavigate } from "react-router-dom";

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
    <div className="flex justify-center items-center min-h-screen max-w-md  mx-auto">
      <div className="w-full md:w-3/4 px-4">
        <div className="my-4 space-y-2  ">
          <h1 className="text-2xl font-bold">Please Login </h1>
          <p className="text-md">Enter your information to continue</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-5">
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
          <div className="relative z-0 w-1/3 mb-5 group">
            <select
              {...register("role", {
                validate: (value) => {
                  if (value === "select role") {
                    return "Select Role";
                  }
                },
              })}
              id="underline_select"
              className="disabled block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="select role" selected>
                select Role
              </option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
            <label htmlFor="underline_select" className="sr-only">
              Underline select
            </label>
            {errors.role && (
              <p className="text-sm text-red-400" role="alert">
                {errors.role.message}
              </p>
            )}
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

export default Login;
