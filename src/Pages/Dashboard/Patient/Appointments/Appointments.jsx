import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import AppointmentCard from "../../Doctor/Appointments/AppointmentCard";
import { useState } from "react";

const Appointments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [openDropDown, setOpenDropDown] = useState(null);

  const { data: { appointments = [] } = {}, refetch } = useQuery({
    queryKey: ["patient-appointments", user?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/patient/appointments`);
      return res.data;
    },
  });

  return (
    <div>
      <p>pateint all appointments: {appointments.length}</p>
      <div className="flex flex-col gap-2 ">
        {appointments.map((appointment, i) => (
          <AppointmentCard
            key={i}
            {...{ appointment, openDropDown, setOpenDropDown, refetch }}
          />
        ))}
      </div>
    </div>
  );
};

export default Appointments;
