import MakeServices from "./MakeServices";
import ManageServices from "./ManageServices";

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <MakeServices />
      <ManageServices />
    </div>
  );
};

export default Services;
