import { minutesToTime } from "../../../../utils/time&dateConversions";

const AppointmentSummary = ({
  appointmentDate,
  selectedSlot,
  visitType,
  duration,
  doctorName,
  designation,
  selectedServiceObj,
}) => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-md border border-blue-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Appointment Summary
      </h3>
      <div className="space-y-2 text-sm text-gray-700">
        <h2>
          {" "}
          <span className="font-medium">Selected Doctor:</span>{" "}
          {doctorName || "Not Selected"}
        </h2>
        <h2>
          {" "}
          <span className="font-medium">Designation:</span>{" "}
          {designation || "Not Selected"}
        </h2>
        <h2>
          <span className="font-medium">Selected Date:</span>{" "}
          {appointmentDate
            ? new Date(appointmentDate).toLocaleDateString()
            : "Not Selected"}
        </h2>
        <h2>
          <span className="font-medium">Selected Time: </span>

          {selectedSlot ? minutesToTime(selectedSlot?.time) : "Not Selected"}
        </h2>
        <h2>
          <span className="font-medium">
            <span className="font-medium">Selected Doctor:</span>
          </span>{" "}
          {duration || "Not Selected"} minutes
        </h2>
        <h2>
          <span className="font-medium">
            <span className="font-medium">Service Name:</span>
          </span>{" "}
          {selectedServiceObj?.name || "Not Selected"}
        </h2>
        <h2>
          <span className="font-medium">
            <span className="font-medium">Service Fee: </span>
          </span>
          {selectedServiceObj ? `$ ${selectedServiceObj.fee}` : "Not Selected"}
        </h2>
        <h2>
          <span className="font-medium">Visit Type: </span>
          {visitType
            ? visitType === "first"
              ? "First Visit"
              : "Follow Up"
            : "Not Selected"}
        </h2>
      </div>
    </div>
  );
};

export default AppointmentSummary;
