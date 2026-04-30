import { useQuery } from "@tanstack/react-query";
import { Datepicker } from "flowbite-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect } from "react";
import { minutesToTime } from "../../utils/time&dateConversions";
import dateFormatter from "../../utils/dateFormatter";
import { Clock } from "lucide-react";

const SelectSlot = ({
  appointmentDate,
  setAppointmentDate,
  selectedSlot,
  setSelectedSlot,
  dividedSlots,
  errors,
  doctorId,
}) => {
  const axiosSecure = useAxiosSecure();

  // fetching available days
  const { data: { availableDays = [] } = {} } = useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/patient/appointmentDays?doctorId=${doctorId}`,
      );
      return res.data;
    },
  });

  // selectable dates
  const filterFn = (date) => {
    return availableDays.includes(date.getDay());
  };

  useEffect(() => {
    if (availableDays.length === 0) return;

    // it gets the nearest available day from today and sets as selected date
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      if (availableDays.includes(checkDate.getDay())) {
        const utcDate = dateFormatter(checkDate);
        return setAppointmentDate(utcDate);
      }
    }
  }, [availableDays, setAppointmentDate]);

  return (
    <div className="flex flex-col gap-3 items-center justify-center border">
      <div>
        <Datepicker
          key={new Date(appointmentDate)?.getDate()} // forces to update the ui
          inline
          filterDate={filterFn}
          onChange={(date) => {
            const utcDate = dateFormatter(date);
            setAppointmentDate(utcDate);
          }}
          showClearButton={false}
          showTodayButton={false}
          value={new Date(appointmentDate)}
        />
      </div>
      <div className="border shadow-md p-3 mt-3 rounded-lg w-full">
        <div>
          {/* errors message */}
          <p className="text-center pt-3 text-red-500">{errors?.slot}</p>
        </div>
        <h1 className=" flex items-center gap-2 text-lg my-3 font-medium">
          <Clock size={24} />
          Available Time Slots
        </h1>
        {dividedSlots.length > 0 ? (
          dividedSlots.map((slotGroup, i) => {
            return (
              <div key={i} className="">
                <h1 className="text-black font-medium mb-2 mt-4">
                  {slotGroup.groupName}
                </h1>
                <div className="grid grid-cols-3 gap-2 ">
                  {slotGroup.slotsWithBookingStatus.map((slot, i) => (
                    <div
                      className={`border flex justify-center text-base   px-2 py-1  rounded-lg shadow-lg cursor-pointer transition-all duration-200 hover:shadow-2xl ${
                        slot.isBooked
                          ? "bg-gray-300 cursor-not-allowed  hover:shadow-lg "
                          : `${
                              selectedSlot === slot
                                ? "bg-blue-600 text-white"
                                : "bg-white"
                            }`
                      } `}
                      key={i}
                      onClick={() => {
                        if (slot.isBooked) return;
                        setSelectedSlot((prevSlot) => {
                          // deselect if the same slot is clicked otherwise select new slot
                          if (prevSlot && prevSlot.time === slot.time) {
                            return null;
                          }
                          return slot;
                        });
                      }}
                    >
                      {slot.isBooked ? (
                        <span className="italic">booked</span>
                      ) : (
                        <span> {minutesToTime(slot.time)}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex  items-center justify-center mt-6">
            <p className="text-red-500">NO slots available for this day</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectSlot;
