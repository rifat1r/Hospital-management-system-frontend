import React, { useState } from "react";
import RescheduleModal from "../../../../Components/Shared/RescheduleModal";
import { Button } from "flowbite-react";
import { Edit } from "lucide-react";

const PatientAppointmentDropdown = ({
  doctorId,
  appointmentId,
  status,
  refetch,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const buttonText =
    status === "scheduled" || status === "rescheduled"
      ? "Reschedule"
      : "Change Time";

  return (
    <div className="border-t p-4 flex flex-col md:flex-row justify-between gap-4">
      <RescheduleModal
        {...{
          openModal,
          setOpenModal,
          doctorId,
          appointmentId,
          role: "patient",
          status,
          buttonText,
          refetchSlots: refetch,
        }}
      />
      {status !== "cancelled" && status !== "completed" && (
        <div className="mb-2 border rounded-lg p-4">
          <Button
            onClick={() => setOpenModal(true)}
            outline
            className="w-full h-12 flex items-center gap-2 hover:bg-blue-200 bg-opacity-20"
          >
            <Edit color="black" size={20} />
            <span className=" font-semibold text-black">{buttonText}</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PatientAppointmentDropdown;
