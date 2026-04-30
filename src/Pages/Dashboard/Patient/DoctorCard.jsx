import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  console.log("doctor", doctor);

  return (
    <Card className="max-w-xs">
      <div className="flex flex-col items-center ">
        <img
          alt="Bonnie image"
          src="https://res.cloudinary.com/dfnvhgj5q/image/upload/v1746632424/453178253_471506465671661_2781666950760530985_n_atdla7.png"
          height="120"
          width="120"
          className="mb-3 rounded-full shadow-lg"
        />

        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {doctor.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {doctor.designation}
        </span>
        <div className="text-md font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <div className="bg-green-500 w-3 h-3 rounded-full"></div>
          Available today
        </div>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <Link to={`/dashboard/patient/make-appointment/${doctor._id}`}>
            <Button className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;
