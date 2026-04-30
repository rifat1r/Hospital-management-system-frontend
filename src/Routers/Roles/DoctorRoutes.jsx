import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import DoctorDashboard from "../../Pages/Dashboard/Doctor/DoctorOverview";
import UserProfile from "../../Components/User/UserProfile";
import PrivateRoute from "../guards/PrivateRoute";
import Schedule from "../../Pages/Dashboard/Doctor/Schedule/Schedule";
import MakeSchedule from "../../Pages/Dashboard/Doctor/Schedule/MakeSchedule";
import Services from "../../Pages/Dashboard/Doctor/Services/Services";
import AllAppointments from "../../Pages/Dashboard/Doctor/Appointments/AllAppointments";
import Consultation from "../../Pages/Dashboard/Doctor/Appointments/Consultation/Consultation";

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
    // schedule routes here
    {
      path: "schedule",
      element: <Schedule />,
    },
    {
      path: "make-schedule",
      element: <MakeSchedule />,
    },
    {
      path: "services",
      element: <Services />,
    },
    // appointment routes here
    {
      path: "appointments",
      element: <AllAppointments />,
    },
    {
      path: "appointments/:appointmentId/consultation",
      element: <Consultation />,
    },
  ],
};

export default doctorRoutes;
