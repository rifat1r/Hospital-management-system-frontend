import { CalendarClock, User } from "lucide-react";
import ProfilePicture from "../../../../../Components/ProfilePicture";
import {
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle,
} from "flowbite-react";
import { minutesToTime } from "../../../../../utils/time&dateConversions";
import formatDate from "../../../../../utils/formatReadableDate";

const PatientInfo = ({ appointment }) => {
  console.log("appointment --", appointment.rescheduleHistory);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 my-4 ">
      <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-blue-600" />
        Patient Information
      </h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <ProfilePicture size="sm" user={appointment.patient} />
          <div className="capitalize">
            <p className="font-semibold text-gray-900">
              {appointment.patient?.name}
            </p>
            <p className="text-sm text-gray-600 ">
              {appointment.patient.age} years • {appointment.patient.gender}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100 space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <span className="text-gray-500 w-20">Phone:</span>
            <span className="text-gray-900 font-medium">
              {appointment.patient.phoneNo}
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="text-gray-500 w-20">Email:</span>
            <span className="text-gray-900 font-medium break-all">
              {appointment.patient.email}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase mb-1">
            Visit Type
          </p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              appointment.visitType === "first"
                ? "bg-purple-100 text-purple-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {appointment.visitType === "first" ? "First Visit" : "Follow-up"}
          </span>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase mb-1">
            Service
          </p>
          <p className="text-sm font-medium text-gray-900">
            {appointment.service?.name}
          </p>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase mb-1">
            Designation
          </p>
          <p className="text-sm text-gray-900">{appointment.designation}</p>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase mb-2">
            Patient's Notes
          </p>
          {appointment.notes ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-gray-700">{appointment.notes}</p>
            </div>
          ) : (
            <div className="bg-gray-200 border  rounded-lg p-3">
              <p className="text-sm ">Patient's note was not provided</p>
            </div>
          )}
        </div>
      </div>

      {appointment.rescheduleHistory &&
        appointment.rescheduleHistory.length > 0 && (
          <div className="my-5">
            <h2 className="font-medium ">Reschedule history</h2>
            <div className="p-6 border rounded flex justify-center">
              <Timeline horizontal className="flex gap-10 px-2 flex-wrap ">
                {appointment.rescheduleHistory.map((history, index) => {
                  return (
                    <TimelineItem key={index} className="min-w-[240px]">
                      <TimelinePoint icon={CalendarClock} />

                      <TimelineContent className="-ml-6  p-4 bg-gray-200 rounded">
                        {/* WHEN */}
                        <TimelineTime className="text-xs text-gray-500 mt-1">
                          {formatDate(history.changedAt)}
                        </TimelineTime>
                        {/* WHO */}
                        <TimelineTitle className="capitalize text-sm font-semibold text-gray-800">
                          {history.changedBy} rescheduled
                        </TimelineTitle>

                        {/* WHAT */}
                        <TimelineBody className="mt-3">
                          <p className="text-sm text-gray-700">
                            {formatDate(history.date)} •{" "}
                            {minutesToTime(history.startTime)} -{" "}
                            {minutesToTime(history.endTime)}
                          </p>

                          {/* REASON */}
                          {history.reason && (
                            <p className="text-xs text-gray-500 italic mt-2 border-l-2 pl-2">
                              {history.reason}
                            </p>
                          )}
                        </TimelineBody>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
              </Timeline>
            </div>
          </div>
        )}
    </div>
  );
};

export default PatientInfo;
