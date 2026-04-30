import {
  Check,
  CircleX,
  Edit,
  FileText,
  Mail,
  Phone,
  User,
  X,
} from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import errorMessage from "../../../../utils/errorMessage";
import { notify, swal } from "../../../../utils/notify";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import RescheduleModal from "../../../../Components/Shared/RescheduleModal";

const DoctorAppointmentDropdown = ({
  patientInfo,
  appointmentId,
  status,
  refetch,
  doctorId,
}) => {
  const axiosSecure = useAxiosSecure();
  const handleStatusUpdate = async (newStatus) => {
    try {
      const res = await axiosSecure.patch(
        `/doctor/appointments/${appointmentId}/status`,
        {
          status: newStatus,
        },
      );
      if (res.data.success) {
        refetch();
        notify(`Apointment status updated to ${newStatus}!`, "success");
      }
    } catch (error) {
      swal("error", "Error!!!", errorMessage(error));
    }
  };
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="border-t p-4 flex flex-col md:flex-row justify-between gap-4">
      <RescheduleModal
        {...{
          openModal,
          setOpenModal,
          doctorId,
          appointmentId,
          role: "doctor",
          buttonText: "Reschedule",
          refetchSlots: refetch,
        }}
      />
      <div className="w-1/2">
        <h1 className="my-2 text-sm  font-medium flex items-center gap-3">
          <User color="blue" size={17} />
          Patient Information
        </h1>
        <div className="border rounded-xl p-4">
          <h2 className="text-sm font-medium text-gray-500 mb-2">Contacts</h2>
          <p className="flex items-center gap-3 text-sm">
            <Phone color="gray" size={16} />
            {patientInfo.phoneNo}
          </p>
          <p className="flex items-center gap-3 text-sm">
            <Mail color="gray" size={16} />
            {patientInfo.email}
          </p>

          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase mb-2">
              Patient's Notes
            </p>

            {patientInfo.notes ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-gray-700">{patientInfo.notes}</p>
              </div>
            ) : (
              <div className="bg-gray-200 border  rounded-lg p-3">
                <p className="text-sm ">Patient's note was not provided</p>
              </div>
            )}
          </div>
        </div>
        {/* update status */}
      </div>
      <div className="w-1/2 ">
        <h2 className="my-2 text-sm  font-medium flex items-center gap-3">
          <FileText size={16} color="blue" />
          Appointment Actions
        </h2>
        {status === "requested" && (
          <div className="mb-2 border rounded-lg p-4">
            <p className="my-2 ">
              Review the appointment request and take action
            </p>

            <div className="flex flex-col gap-2">
              <Button
                onClick={() => handleStatusUpdate("scheduled")}
                className="bg-green-500 rounded-lg w-full hover:bg-green-600 h-12"
              >
                <Check className="mr-1" size={25} />
                Accept & Schedule Appointment
              </Button>
              <Button
                onClick={() => setOpenModal(true)}
                outline
                className="w-full h-12 flex items-center gap-2 hover:bg-blue-200 bg-opacity-20"
              >
                <Edit color="black" size={20} />
                <span className=" font-semibold text-black">Reschedule</span>
              </Button>
              <Button
                color="red"
                outline
                onClick={() => handleStatusUpdate("cancelled")}
                className="rounded-lg w-full hover:bg-red-500 h-12"
              >
                <X className="mr-1" size={25} />
                Cancel
              </Button>
            </div>
          </div>
        )}
        {(status === "scheduled" || status === "rescheduled") && (
          <div className="mb-2 border rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Actions</h2>
            <div className="border border-blue-500 rounded-lg p-3 bg-blue-300 bg-opacity-20 mb-1">
              <h2 className="text-sm font-medium">Appointment Scheduled</h2>

              <p className="text-sm font-light">
                Ready to start consultation with patient
              </p>
            </div>
            <div className="my-2 flex flex-col gap-2">
              <Link
                to={`/dashboard/doctor/appointments/${appointmentId}/consultation`}
              >
                <Button className="w-full h-12 flex items-center gap-2">
                  <FileText color="white" size={20} />
                  <span className=" font-semibold">Start Consultation</span>
                </Button>
              </Link>
              <Button
                onClick={() => setOpenModal(true)}
                outline
                className="w-full h-12 flex items-center gap-2 hover:bg-blue-200 bg-opacity-20"
              >
                <Edit color="black" size={20} />
                <span className=" font-semibold text-black">Reschedule</span>
              </Button>
              <Button
                color="red"
                outline
                onClick={() => handleStatusUpdate("cancelled")}
                className="rounded-lg w-full hover:bg-red-500 h-12"
              >
                <X className="mr-1" size={25} />
                Cancel
              </Button>
            </div>
          </div>
        )}
        {status === "cancelled" && (
          <div className="border border-red-500 rounded-lg p-3 bg-red-300 bg-opacity-20 mb-1 flex items-center gap-3">
            <div>
              <CircleX color="red" size={30} />
            </div>
            <div>
              <h2 className="text-sm font-medium">Appointment Cancelled</h2>

              <p className="text-sm font-light">
                This appointment has been cancelled. No further actions can be
                taken.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointmentDropdown;
