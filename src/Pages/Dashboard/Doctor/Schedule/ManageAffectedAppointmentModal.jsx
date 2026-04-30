import {
  Button,
  Dropdown,
  DropdownItem,
  Modal,
  ModalBody,
  ModalHeader,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { ArrowLeft, CircleX, RefreshCw, X } from "lucide-react";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { minutesToTime } from "../../../../utils/time&dateConversions";
import weekdays from "../../../../constants/weekDays";

const ManageAffectedAppointmentModal = ({
  affectedAppointmentModal,
  setAffectedAppointmentModal,
  affectedInfo,
}) => {
  const {
    dayOfWeek,
    startTime,
    endTime,
    affectedAppointmentsData: { message, affectedAppointmentsCount },
  } = affectedInfo;
  const axiosSecure = useAxiosSecure();

  const [reason, setReason] = useState("");
  const [showError, setShowError] = useState(false);

  const reasons = [
    "Unexpected emergency",
    "Family emergency",
    "Delay in previous appointments",
    "Technical issue",
    "Leave approved",
    "Shift change",
  ];

  const cancelAppointments = async () => {
    if (!reason) {
      setShowError(true);
      return;
    }
    const res = await axiosSecure.patch(
      "/doctor/appointments/cancelAppointments",
      {
        dayOfWeek,
        startTime,
        endTime,
        reason,
      },
    );
    console.log("cancel res -", res.data);
  };

  return (
    <Modal
      size="4xl"
      dismissible
      show={affectedAppointmentModal}
      onClose={() => setAffectedAppointmentModal(false)}
    >
      {/* <ModalHeader>
        <div className="flex items-center gap-2">
          <p>
            Total affected appointments on {weekdays[dayOfWeek]},{" "}
            {minutesToTime(startTime)} - {minutesToTime(endTime)}
          </p>
        </div>
      </ModalHeader> */}
      <ModalBody>
        <div>
          <div className="flex flex-col items-center gap-4">
            <CircleX size={100} color="red" className="" />
            <h2 className="text-center text-xl font-medium text-gray-500">
              You have {affectedAppointmentsCount} affected appointments on{" "}
              {weekdays[dayOfWeek]}, {minutesToTime(startTime)} -{" "}
              {minutesToTime(endTime)}. Please reschedule or cancel them before
              deleting the session
            </h2>
          </div>
          <div className="flex flex-col  items-center justify-center gap-4 m-6 max-w-xs w-full  mx-auto">
            <Button className="w-full mb-5">Manage Individually</Button>

            <div className="w-full">
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option>Select Reason</option>
                {reasons.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              {showError && (
                <p className="text-red-500 text-sm">Please select a reason</p>
              )}
            </div>

            <Button onClick={cancelAppointments} className="w-full" color="red">
              Cancel All Appointments
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ManageAffectedAppointmentModal;
