import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import AppointmentCard from "./AppointmentCard";
import { useState } from "react";
import AppointmentFilters from "./AppointmentFilters";
import { Pagination, Spinner } from "flowbite-react";
import { CalendarOffIcon } from "lucide-react";
import DoctorAppointmentsHeader from "./DoctorAppointmentsHeader";

const AllAppointments = () => {
  const [openDropDown, setOpenDropDown] = useState(null);

  const [activeDate, setActiveDate] = useState("all");
  const [activeStatus, setActiveStatus] = useState("scheduled");
  const [pickedDate, setPickedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const axiosSecure = useAxiosSecure();
  const {
    data: {
      appointments = [],
      requestedAppointmentsCount = 0,
      allFilteredAppointmentsCount = 0,
    } = {},
    refetch,
    isPending,
  } = useQuery({
    queryKey: [
      "appointments",
      activeDate,
      activeStatus,
      pickedDate,
      currentPage,
    ],
    queryFn: async () => {
      const params = {
        status: activeStatus,
        appointmentDate: activeDate === "pick date" ? pickedDate : activeDate,
        page: currentPage,
      };
      const res = await axiosSecure.get("/doctor/appointments", { params });
      return res.data;
    },
  });

  const onPageChange = (page) => {
    setCurrentPage(page - 1);
  };

  return (
    <div className="w-full mx-auto ">
      <DoctorAppointmentsHeader />
      <AppointmentFilters
        {...{
          activeDate,
          setActiveDate,
          activeStatus,
          setActiveStatus,
          pickedDate,
          setPickedDate,
          appointments,
          requestedAppointmentsCount,
          allFilteredAppointmentsCount,
        }}
      />
      {isPending && (
        <div className="flex items-center justify-center py-20">
          <Spinner />
          {/* <p className="text-sm text-gray-400">Loading appointments...</p> */}
        </div>
      )}
      {!isPending && appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <CalendarOffIcon size={40} />
          <p className="font-medium text-gray-400">No Appointments Found</p>
          <p className="text-sm">
            There are no appointments matching your current filters.
          </p>
        </div>
      ) : (
        <div className="flex  flex-col gap-4 ">
          {appointments.map((appointment, i) => (
            <AppointmentCard
              key={i}
              {...{ openDropDown, setOpenDropDown, refetch, appointment }}
            />
          ))}
        </div>
      )}
      {allFilteredAppointmentsCount > 10 && (
        <div className="flex overflow-x-auto sm:justify-center my-4">
          <Pagination
            currentPage={currentPage + 1}
            totalPages={Math.ceil(allFilteredAppointmentsCount / 10)}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
