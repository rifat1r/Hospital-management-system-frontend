import { Button } from "flowbite-react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/userApi";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProfileHeader = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const handleLogout = async () => {
    const res = await logoutUser(axiosSecure);
    if (res.success) {
      console.log("logged out");
    }
  };
  return (
    <div className="flex flex-row justify-between border w-full px-2 py-2 rounded-lg lg:w-3/5">
      <div className="flex items-center ">
        <Button onClick={() => navigate(-1)} color="alternative">
          <IoArrowBack className="text-xl mr-2" />
          Go Back
        </Button>
        <h1 className="text-2xl ml-4">Profile</h1>
      </div>
      <div>
        <Button onClick={handleLogout} color="dark" outline>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
