import { Calendar, CalendarDays, CalendarPlus } from "lucide-react";
import React from "react";

const DoctorAppointmentsHeader = () => {
  return (
    <div class="flex items-center justify-between py-4  border-b-2 sticky mb-2">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-50 rounded-lg">
          <CalendarDays className="w-6 h-6 text-green-800" />
        </div>
        <div>
          <h1 class="text-2xl font-medium text-gray-900">
            Manage Your Appointments
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
        <CalendarPlus className="w-5 h-5 text-blue-600" />
        <span className="text-sm font-medium text-blue-700">
          All Appointments
        </span>
      </div>
    </div>
  );
};

export default DoctorAppointmentsHeader;
