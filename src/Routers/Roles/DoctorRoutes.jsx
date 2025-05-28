import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import DoctorDashboard from "../../Pages/Dashboard/Doctor/DoctorDashboard";
import UserProfile from "../../Components/User/UserProfile";
import PrivateRoute from "../guards/PrivateRoute";

const doctorRoutes = {
  path: "/dashboard/doctor",
  element: (
    <PrivateRoute allowedRoles={["doctor"]}>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    {
      index: true,
      element: <DoctorDashboard />,
    },
    {
      path: "profile",
      element: <UserProfile />,
    },
  ],
};

export default doctorRoutes;
