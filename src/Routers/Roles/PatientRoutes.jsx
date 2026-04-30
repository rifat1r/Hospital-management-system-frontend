import UserProfile from "../../Components/User/UserProfile";
import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import Appointments from "../../Pages/Dashboard/Patient/Appointments/Appointments";
import AvailableDoctors from "../../Pages/Dashboard/Patient/AvailableDoctors";
import MakeAppointment from "../../Pages/Dashboard/Patient/MakeAppointment";
import PatientOverview from "../../Pages/Dashboard/Patient/PatientOverview";
import PrivateRoute from "../guards/PrivateRoute";

const patientRoutes = {
  path: "/dashboard/patient",
  element: (
    <PrivateRoute allowedRoles={["patient"]}>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    {
      index: true,
      element: <PatientOverview />,
    },
    {
      path: "doctors",
      element: <AvailableDoctors />,
    },
    {
      path: "make-appointment/:doctorId",
      element: <MakeAppointment />,
    },
    {
      path: "appointments",
      element: <Appointments />,
    },
    {
      path: "profile",
      element: <UserProfile />,
    },
  ],
};

export default patientRoutes;
