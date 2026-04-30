import { CalendarRange, Dot, Search } from "lucide-react";
import { useState } from "react";
import DatePickerModal from "../DatePickerModal";

const AppointmentFilters = ({
  activeDate,
  setActiveDate,
  activeStatus,
  setActiveStatus,
  appointments,
  pickedDate,
  setPickedDate,
  requestedAppointmentsCount,
  allFilteredAppointmentsCount,
}) => {
  const dateFilters = ["all", "today", "upcoming", "past"];
  const statusFilters = [
    "scheduled",
    "requested",
    "completed",
    "cancelled",
    "all",
  ];
  const statusStyles = {
    completed: "bg-green-50 text-green-800",
    requested: "bg-amber-50 text-amber-800",
    scheduled: "bg-blue-50 text-blue-800",
    cancelled: "bg-red-50 text-red-700",
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full">
      <DatePickerModal
        {...{
          openModal,
          setOpenModal,
          setActiveDate,
          setPickedDate,
          pickedDate,
        }}
      />
      <div className="bg-white border border-gray-300 rounded-xl px-2 py-3 mb-4 ">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {/* Date segment */}
          <div className="flex items-center gap-1 bg-gray-200 rounded-lg p-2">
            {[...dateFilters, "pick date"].map((filter) => (
              <div
                key={filter}
                onClick={() => {
                  setActiveDate(filter);
                  if (filter === "pick date") {
                    setPickedDate(null);
                    setOpenModal(true);
                  }
                }}
                className={`px-3 py-1 rounded-lg   whitespace-nowrap flex items-center gap-1 capitalize cursor-pointer
                  ${
                    activeDate === filter
                      ? "bg-white shadow-sm text-gray-800 font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {filter === "pick date" && <CalendarRange size={15} />}

                {filter}
              </div>
            ))}
          </div>

          {/* Status segment */}
          <div className="flex items-center gap-1 bg-gray-200 rounded-lg p-2">
            {statusFilters.map((filter) => (
              <div
                key={filter}
                onClick={() => setActiveStatus(filter)}
                className={`px-3 py-1 rounded-lg  transition-all whitespace-nowrap flex items-center gap-2 capitalize cursor-pointer
                  ${
                    activeStatus === filter
                      ? `bg-white shadow-sm font-medium ${statusStyles[filter]}`
                      : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {filter}

                {/* count badge */}
                {filter === activeStatus && (
                  <div
                    className={`w-4 h-4 border   px-2 py-1 text-xs flex items-center justify-center rounded -ml-1 bg-gray-400 font-bold bg-opacity-40`}
                  >
                    <span>{allFilteredAppointmentsCount}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400 mt-3 pt-3 border-t border-gray-200">
            Showing{" "}
            <span className="font-medium text-gray-800">
              {appointments.length}
            </span>{" "}
            appointments <Dot className="inline -mr-1 -ml-2" />
            <span className="font-medium text-gray-800">
              {activeDate === "pick date" && pickedDate
                ? new Date(pickedDate).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })
                : activeDate}
            </span>{" "}
            <Dot className="inline -mr-1 -ml-2" />
            <span className="font-medium text-gray-800">
              {activeStatus} statuses
            </span>
          </p>
          {/* Total requested appointments  count */}
          <p className="mt-3 pt-3 border-t border-gray-200">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
              Pending Requests
              <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {requestedAppointmentsCount}
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentFilters;
