import {
  CalendarRange,
  ChevronDown,
  ChevronUp,
  Clock,
  Dot,
} from "lucide-react";
import ProfilePicture from "../../../../Components/ProfilePicture";
import { minutesToTime } from "../../../../utils/time&dateConversions";
import DoctorAppointmentDropdown from "./DoctorAppointmentDropdown";
import useAuth from "../../../../hooks/useAuth";
import PatientAppointmentDropdown from "../../Patient/Appointments/PatientAppointmentDropdown";
import dateFormatter from "../../../../utils/dateFormatter";
import formatDate from "../../../../utils/formatReadableDate";

const AppointmentCard = ({
  appointment,
  refetch,
  openDropDown,
  setOpenDropDown,
}) => {
  const {
    user: { role, _id },
  } = useAuth();

  const getBadgeColor = (value) => {
    const colors = {
      // appointment status
      requested: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      scheduled: "bg-blue-100 text-blue-800 border border-blue-200",
      completed: "bg-green-100 text-green-800 border border-green-200",
      cancelled: "bg-red-100 text-red-800 border border-red-200",
      rescheduled: "bg-orange-100 text-orange-800 border border-orange-200",

      // payment status
      paid: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      failed: "bg-red-100 text-red-700",

      // visit type
      "first visit": "bg-violet-100 text-violet-800 border-violet-200",
      "follow-up": "bg-cyan-100 text-cyan-800 border-cyan-200",
    };
    return colors[value];
  };

  // if the user is doctor show patient info , if the user is patient show doctor info
  const userInfo = role === "doctor" ? appointment.patient : appointment.doctor;
  const primaryInfo =
    role === "doctor" ? `${userInfo?.age} years` : `${userInfo?.designation}`;
  const secondaryInfo =
    role === "doctor"
      ? `${userInfo?.gender}`
      : `${userInfo?.yearsOfExperience} years of experience`;

  return (
    <div className="w-full border-2 rounded-xl">
      <div
        onClick={() =>
          setOpenDropDown((prev) => {
            if (prev && prev === appointment._id) return null; //close the previous one or current one when clicked twice
            return appointment._id;
          })
        }
        className=" p-4"
      >
        <div className="flex justify-between items-top">
          <div className="flex items-center">
            <ProfilePicture size="sm" user={userInfo} />
            <div className="ml-2 capitalize">
              <h1 className="font-semibold text-lg">{userInfo?.name}</h1>
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  {primaryInfo}
                  <Dot className="-mb-1 -mx-1" /> {secondaryInfo}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize ${getBadgeColor(
                appointment.status,
              )}`}
            >
              <span>{appointment.status}</span>

              {appointment.status === "scheduled" &&
                appointment.appointmentDate < dateFormatter(new Date()) && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-medium">
                    missed
                  </span>
                )}
            </span>
            {openDropDown ? (
              <ChevronUp color="gray" />
            ) : (
              <ChevronDown color="gray" />
            )}
          </div>
        </div>
        <div className="flex justify-between  py-2 text-sm">
          <div className="flex  items-center gap-2">
            <CalendarRange color="gray" size={16} />
            {formatDate(appointment.appointmentDate)}
          </div>

          <div className="flex items-center gap-2 ">
            <Clock color="gray" size={16} />{" "}
            <div className="flex items-center gap-2">
              {minutesToTime(appointment.appointmentStartTime)}
            </div>{" "}
            -
            <div className="flex items-center gap-2">
              {minutesToTime(appointment.appointmentEndTime)}
            </div>
          </div>
          {/* this div helps to keep the time in the middle */}
          <div></div>
        </div>
        <div className="flex justify-between ">
          <div className="flex gap-2">
            <h1 className="font-semibold">{appointment.service?.name}</h1>
            <div
              title="Payment status"
              className={`px-2 py-1 text-center rounded-md capitalize text-xs font-medium ${getBadgeColor(appointment.paymentStatus)}`}
            >
              {appointment.paymentStatus}
            </div>
          </div>
          <div
            className={`px-2 py-1   capitalize text-xs rounded-md ${getBadgeColor(appointment.visitType)}`}
          >
            {appointment.visitType}
          </div>
        </div>
      </div>
      {/* doctor dropdown */}
      {openDropDown === appointment._id && role === "doctor" && (
        <DoctorAppointmentDropdown
          patientInfo={userInfo}
          doctorId={_id}
          appointmentId={appointment._id}
          status={appointment.status}
          refetch={refetch}
        />
      )}
      {/* patient dropdown */}
      {openDropDown === appointment._id && role === "patient" && (
        <PatientAppointmentDropdown
          doctorId={appointment.doctor._id}
          appointmentId={appointment._id}
          status={appointment.status}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AppointmentCard;
