import { Outlet } from "react-router-dom";
import DashboardDrawer from "../../Components/Navigation/DashboardDrawer";

const DashboardLayout = () => {
  return (
    <div>
      <DashboardDrawer />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
