import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import SelectSlot from "./SelectSlot";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FileText } from "lucide-react";
import { swal } from "../../utils/notify";
import { minutesToTime } from "../../utils/time&dateConversions";
import errorMessage from "../../utils/errorMessage";

const RescheduleModal = ({
  openModal,
  setOpenModal,
  doctorId,
  appointmentId,
  role,
  status,
  buttonText,
  refetchSlots,
}) => {
  const axiosSecure = useAxiosSecure();
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({});

  // fetching slots for selected day
  const { data: { dividedSlots = [], duration } = {} } = useQuery({
    // fetch again when date changes
    queryKey: ["doctorId", doctorId, appointmentDate],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/patient/doctorAvailability?doctorId=${doctorId}&appointmentDate=${appointmentDate}`,
      );
      return res.data;
    },
    enabled: appointmentDate !== null && !!openModal,
  });

  const validations = () => {
    const newErrors = {};
    if (!selectedSlot) {
      newErrors.slot = "Please select a time slot.";
    }
    if (!appointmentDate) {
      newErrors.date = "Please select a date";
    }
    if (!reason) {
      newErrors.reason = "Please provide a reason for rescheduling ";
    }
    if (reason && reason.length < 10) {
      newErrors.reason = "Reason is too short";
    }

    setErrors(newErrors);

    return newErrors;
  };

  const handlePostReschedule = async () => {
    if (Object.keys(validations()).length > 0) return;

    try {
      const res = await axiosSecure.patch(`/${role}/appointment/reschedule`, {
        newAppointmentStartTime: selectedSlot.time,
        newAppointmentEndTime: selectedSlot.time + duration,
        newAppointmentDate: appointmentDate,
        appointmentId,
        reason,
      });
      // console.log("res -", res);
      if (res.data.success) {
        refetchSlots();
        const { appointmentStartTime, formattedDate } = res.data.data;
        setSelectedSlot(null);
        setReason("");
        setOpenModal(false);
        swal(
          "success",
          res.data.message,
          `Your appointment is booked for ${minutesToTime(appointmentStartTime)} on ${formattedDate} `,
        );
      }
    } catch (error) {
      // console.log("errors --", error);
      swal("error", "Error!!!", errorMessage(error));
    }
  };

  return (
    <Modal
      dismissible
      show={openModal}
      onClose={() => setOpenModal(false)}
      size="md"
    >
      <ModalHeader>
        {role === "patient" && status === "requested"
          ? "Change Time for Requested Appointment" // patient want to change time for requested appointment
          : "Reschedule Appointment"}
      </ModalHeader>
      <ModalBody className="flex justify-center">
        <div className="flex flex-col items-center">
          <SelectSlot
            {...{
              appointmentDate,
              setAppointmentDate,
              selectedSlot,
              setSelectedSlot,
              dividedSlots,
              errors,
              doctorId,
            }}
          />
          <div className=" w-full my-3 border p-2 rounded bg-white shadow">
            <h2 className=" font-medium mb-1">
              <FileText className="inline mb-1 mr-1" size={18} />
              Reason for Rescheduling
            </h2>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Not available"
              rows={4}
              className="w-full p-2 border rounded"
            />
            <p className="text-center pt-3 text-red-500 text-wrap">
              {errors?.reason}
            </p>
          </div>

          <div className="border w-full mb-4">
            <Button className="w-full" onClick={handlePostReschedule}>
              {buttonText}
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default RescheduleModal;
