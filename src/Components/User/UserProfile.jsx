import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { getUser, updateUser } from "../../api/userApi";
import useAuth from "../../hooks/useAuth";
import UserForm from "../Shared/UserForm";
import ProfileHeader from "../../Components/User/ProfileHeader";
import UpdatePassword from "./UpdatePassword";
import { notify, swal } from "../../utils/notify";

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Get the userId and userType from the URL search params
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("role");
  const userId = searchParams.get("id");

  // for querying user data
  const userInfo =
    userType && userId
      ? // admin checks other users profile
        {
          _id: userId,
          role: userType,
        }
      : // for self profile only
        null;

  console.log("userinfo", !!userInfo);
  // Fetch user data based on userType and userId
  const { data: profile = {}, refetch } = useQuery({
    queryKey: ["userProfile", userType, userId],
    queryFn: async () => {
      const res = await getUser(axiosSecure, userInfo);
      return res.user;
    },
  });

  // update user profile
  const handleUpdateProfile = async (data) => {
    // console.log("data", data);
    try {
      const res = await updateUser(axiosSecure, data);
      console.log("res", res.error);
      if (res.success) {
        refetch();
        notify(res.msg, "success");
      }
    } catch (error) {
      // console.log("error--", error.response.data.msg);
      if (error.response) {
        swal("error", "Could not Update Profile ", error.response.data.msg);
        refetch();
        // notify(error.response.data.msg, "error");
      }
    }
  };

  // getting role for condititionally rendering the user form
  const role = userType || user.role;

  return (
    <div className="flex flex-col items-center justify-center w-1/2 lg:w-3/4 mx-auto ">
      <ProfileHeader />
      <div className="flex justify-center items-center my-5">
        <div className="">
          <img
            loading="lazy"
            className="rounded-full"
            src="https://res.cloudinary.com/dfnvhgj5q/image/upload/v1746632424/453178253_471506465671661_2781666950760530985_n_atdla7.png"
            alt=""
          />
        </div>
      </div>
      {/* profile info */}
      <div
        className={`flex ${
          userInfo ? `justify-center` : `justify-between`
        } flex-col lg:flex-row lg:gap-8 w-full `}
      >
        <UserForm
          onSubmit={handleUpdateProfile}
          profile={profile}
          role={role}
          userInfo={userInfo}
        />
        {/* user can only update their own password */}
        {!userInfo && <UpdatePassword />}
      </div>
    </div>
  );
};

export default UserProfile;
