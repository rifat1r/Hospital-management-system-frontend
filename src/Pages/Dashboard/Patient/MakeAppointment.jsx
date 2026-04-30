import { useState } from "react";
import SelectSlot from "../../../Components/Shared/SelectSlot";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { swal } from "../../../utils/notify";
import { minutesToTime } from "../../../utils/time&dateConversions";
import errorMessage from "../../../utils/errorMessage";
import SelectService from "./MakeAppointment/SelectService";
import MakeAppointmentHeader from "./MakeAppointment/MakeAppointmentHeader";
import VisitInfo from "./MakeAppointment/VisitInfo";
import AppointmentSummary from "./MakeAppointment/AppointmentSummary";

const MakeAppointment = () => {
  const axiosSecure = useAxiosSecure();

  const { doctorId } = useParams();

  const [appointmentDate, setAppointmentDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [visitType, setVisitType] = useState(null);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  // validations before posting appointment
  const validations = () => {
    const newErrors = {};
    if (!selectedSlot) {
      newErrors.slot = "Please select a time slot.";
    }
    if (!visitType) {
      newErrors.visitType = "Please select a visit type.";
    }
    if (!selectedService) {
      newErrors.service = "Please select a service.";
    }

    setErrors(newErrors);

    return newErrors;
  };

  // fetching slots for selected day
  const {
    data: { dividedSlots = [], duration, fee } = {},
    refetch: refetchSlots,
  } = useQuery({
    // fetch again when date changes
    queryKey: ["doctorId", doctorId, appointmentDate],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/patient/doctorAvailability?doctorId=${doctorId}&appointmentDate=${appointmentDate}`,
      );
      return res.data;
    },
    enabled: appointmentDate !== null,
  });

  const {
    data: {
      doctor: { services = [], name: doctorName, designation } = {},
    } = {},
  } = useQuery({
    queryKey: ["doctorInfo", doctorId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/patient/doctorInfo/${doctorId}`);
      return res.data;
    },
  });

  const modifiendServices = services.map((service) =>
    service.name === "General Consultation" ? { ...service, fee } : service,
  );

  const selectedServiceObj = selectedService
    ? modifiendServices.find((s) => s._id === selectedService)
    : null;

  const handlePostAppointment = async () => {
    // stop if theres validation errors
    const validationErrors = validations();
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await axiosSecure.post("/patient/appointment", {
        doctorId,
        appointmentDate,
        appointmentStartTime: selectedSlot.time,
        appointmentEndTime: selectedSlot.time + duration,
        notes,
        visitType,
        serviceId: selectedService,
        designation,
      });
      if (res.data.data.id) {
        refetchSlots();
        setSelectedSlot(null);
        const {
          message,
          data: { formattedAppointmentDate, appointmentStartTime },
        } = res.data;
        // console.log("res data", formattedAppointmentDate, appointmentStartTime);
        swal(
          "success",
          message,
          `Your appointment is booked for ${minutesToTime(
            appointmentStartTime,
          )} on ${formattedAppointmentDate}`,
        );
      }
      // console.log("appointment post response:", res.data);
    } catch (error) {
      swal("error", errorMessage(error));
    }
  };
  // console.log("doctorid--", doctorId);

  return (
    <div className="flex flex-col  gap-5 items-center justify-center  border border-red-400">
      <MakeAppointmentHeader
        doctorName={doctorName}
        designation={designation}
      />
      <div className="flex flex-col items-start md:flex-row  gap-5">
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
        <div className="flex flex-col items-center gap-5 w-[296px] md:w-full">
          <SelectService
            {...{
              selectedService,
              setSelectedService,
              services: modifiendServices,
              errors,
              fee,
            }}
          />
          <VisitInfo {...{ visitType, setVisitType, setNotes, errors }} />
          <AppointmentSummary
            {...{
              appointmentDate,
              selectedSlot,
              visitType,
              duration,
              doctorName,
              designation,
              selectedServiceObj,
            }}
          />
          <Button className="w-full" onClick={handlePostAppointment}>
            Book appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MakeAppointment;
