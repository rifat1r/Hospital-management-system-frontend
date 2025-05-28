import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import AdminDashboard from "../../Pages/Dashboard/Admin/AdminDashboard";
import AllUsers from "../../Pages/Dashboard/Admin/AllUsers/AllUsers";
import UserProfile from "../../Components/User/UserProfile";
import PrivateRoute from "../guards/PrivateRoute";

const adminRoutes = {
  path: "/dashboard/admin",
  element: (
    <PrivateRoute allowedRoles={["admin"]}>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    {
      index: true,
      element: <AdminDashboard />,
    },
    {
      path: "all-users",
      element: <AllUsers />,
    },
    {
      path: "profile",
      element: <UserProfile />,
    },
  ],
};

export default adminRoutes;
