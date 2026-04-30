import useGetUsersByRole from "../../../hooks/useGetUsersByRole";
import DoctorCard from "./DoctorCard";

const AvailableDoctors = () => {
  const { users: doctors } = useGetUsersByRole("doctor");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default AvailableDoctors;
