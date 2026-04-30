import { Calendar } from "lucide-react";

const MakeAppointmentHeader = ({ doctorName, designation }) => {
  return (
    <div className="bg-blue-600 text-white rounded-md py-5 pl-8 my-5 border  w-full ">
      <h1 className="text-3xl flex items-center gap-2 font-semibold mb-3">
        <Calendar size={32} />
        Book Appointment
      </h1>
      <p>
        Booking with {doctorName} - {designation}
      </p>
    </div>
  );
};

export default MakeAppointmentHeader;
