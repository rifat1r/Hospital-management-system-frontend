import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import ForgotPassword from "../Pages/Auth/Password/ForgotPassword";
import ResetPassword from "../Pages/Auth/Password/ResetPassword";
import adminRoutes from "./Roles/AdminRoutes";
import doctorRoutes from "./Roles/DoctorRoutes";
import MainLayout from "../Layout/MainLayout/MainLayout";
import patientRoutes from "./Roles/PatientRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/password-forgot",
        element: <ForgotPassword />,
      },
      {
        path: "/password-reset/:token",
        element: <ResetPassword />,
      },
    ],
  },
  { ...adminRoutes },
  { ...doctorRoutes },
  { ...patientRoutes },
]);

export default router;
