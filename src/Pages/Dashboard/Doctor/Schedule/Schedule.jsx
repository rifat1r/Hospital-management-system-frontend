import { useQuery } from "@tanstack/react-query";
import { getSchedules } from "../../../../api/doctorApi";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import {
  minutesToTime,
  timeToMinutes,
} from "../../../../utils/time&dateConversions";
import { LuEllipsisVertical, LuTrash2, LuSquarePen } from "react-icons/lu";
import { Badge, Button, Dropdown, DropdownItem } from "flowbite-react";
import { swal } from "../../../../utils/notify";
import { useState } from "react";
import SlotEditModal from "./SlotEditModal";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Calendar, Clock, Trash2, User } from "lucide-react";
import weekdays from "../../../../constants/weekDays";
import errorMessage from "../../../../utils/errorMessage";
import ScheduleHeader from "./ScheduleHeader";
import ManageAffectedAppointmentModal from "./ManageAffectedAppointmentModal";

const Schedule = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data = { schedule: { availableDays: [] } },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["schedule", user],
    queryFn: async () => {
      const res = await getSchedules(axiosSecure, user._id);
      return res;
    },
  });
  const getSlotsForADay = (dayIndex) => {
    const targetDay = data.schedule.availableDays.find(
      (day) => day.dayOfWeek === dayIndex,
    );
    const slots = targetDay
      ? targetDay.slots.map((slot) => {
          return {
            startTime: minutesToTime(slot.startTime),
            endTime: minutesToTime(slot.endTime),
            slotId: slot._id,
          };
        })
      : [];
    return slots;
    // return slots || [];
  };

  const deleteScheduleDay = async (dayOfWeek) => {
    // confirmation
    const swalRes = await swal(
      "warning",
      "Are you sure you want to delete this schedule day?",
      " ",
      false,
      "Yes Delete",
    );

    if (swalRes.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/doctor/schedule/${dayOfWeek}`);
        console.log("deleteScheduleDay res--", res.data);
        if (res.data.success) {
          refetch();
          swal(
            "success",
            "Schedule day deleted successfully",
            res.message,
            true,
          );
        }
      } catch (error) {
        swal("error", errorMessage(error));
      }
    }
  };

  const today = new Date().getDay();

  const [openModal, setOpenModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [affectedAppointmentModal, setAffectedAppointmentModal] =
    useState(false);
  const [affectedInfo, setAffectedInfo] = useState({
    affectedAppointmentsData: {},
    startTime: null,
    endTime: null,
    dayOfWeek: null,
  });
  // const [affectedAppointments, setAffectedAppointments] = useState([]);

  const handleSlotEdit = (dayOfWeek, slot) => {
    setSelectedSlot({ dayOfWeek, slot, refetch });
    setOpenModal(true);
    // console.log("slot id--", dayOfWeek);
  };

  const handleSlotDelete = async ({
    dayOfWeek,
    slotId,
    startTime,
    endTime,
  }) => {
    // confirmation
    const swalRes = await swal(
      "warning",
      "Are you sure you want to delete this slot?",
      " ",
      false,
      "Yes Delete",
    );
    // console.log("swal res--", swalRes);

    if (swalRes.isConfirmed) {
      try {
        // const res = await deleteSlot(axiosSecure, dayOfWeek, slotId);

        const res = await axiosSecure.patch("/doctor/schedule/session/delete", {
          dayOfWeek,
          slotId,
          startTime,
          endTime,
        });
        // console.log("delete res---", res);
        if (res.data.success) {
          refetch();
          swal("success", "Slot deleted successfully", res.message, true);
        }
      } catch (error) {
        console.log("error response --", error);
        // check if the error response contains affected appointments
        if (
          error.response.data.affectedAppointmentsCount &&
          error.response.data.affectedAppointmentsCount > 0
        ) {
          setAffectedInfo({
            affectedAppointmentsData: error.response.data,
            startTime: startTime,
            endTime: endTime,
            dayOfWeek: dayOfWeek,
          });
          setAffectedAppointmentModal(true);
          return;
        }

        // other errors
        swal("error", errorMessage(error));
      }
    }
  };

  const navigate = useNavigate();
  const handleAddSlot = (dayOfWeek) => {
    navigate(`/dashboard/doctor/make-schedule?dayOfWeek=${dayOfWeek}`);
  };

  return (
    <div className="">
      <SlotEditModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedSlot={selectedSlot}
      />
      <ManageAffectedAppointmentModal
        {...{
          affectedAppointmentModal,
          setAffectedAppointmentModal,
          affectedInfo,
        }}
      />
      <ScheduleHeader user={user} />
      <div className="my-5">
        <h2 className="text-2xl font-medium flex gap-2 items-center mb-2">
          <Clock color="green" size={25} />
          Available Time Slots
        </h2>
        <p>Manage your weekly availability schedule</p>
      </div>
      <div className="flex flex-col justify-center  gap-5 ">
        {/* weekdays each index represents a day of week  */}
        {weekdays.map((day, dayOfWeek) => (
          <div
            className={` py-4 px-5 rounded-xl ${
              dayOfWeek === today ? "bg-green-100 " : "bg-slate-100"
            }`}
            key={dayOfWeek}
          >
            <div className="flex justify-between items-center ">
              {/* schedule day row */}
              <div className="flex items-center justify-start gap-5">
                <div
                  className={`text-lg font-medium  border text-center w-20 py-1  rounded ${
                    dayOfWeek === today
                      ? "bg-green-400 text-white border-green-400"
                      : "bg-slate-100"
                  }`}
                >
                  {day}
                </div>
                <div className="flex gap-2 ">
                  {getSlotsForADay(dayOfWeek).length > 0 ? (
                    <div className="flex gap-3">
                      {getSlotsForADay(dayOfWeek).map((slot) => (
                        <div
                          key={slot.slotId}
                          className="flex border  bg-white rounded-md items-center px-2 py-1"
                        >
                          <p>{slot.startTime}</p>
                          <span className="px-2">-</span>
                          <p>{slot.endTime}</p>
                          <div>
                            <Dropdown
                              label=""
                              dismissOnClick={true}
                              renderTrigger={() => (
                                <button
                                  // onClick={() => console.log("id", dayId, slotId)}
                                  className="p-1 hover:bg-gray-100 rounded"
                                  type="button"
                                >
                                  <LuEllipsisVertical className="w-5 h-5 text-gray-600" />
                                </button>
                              )}
                              placement="bottom-end"
                            >
                              <DropdownItem
                                onClick={() => handleSlotEdit(dayOfWeek, slot)}
                                icon={LuSquarePen}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  handleSlotDelete({
                                    dayOfWeek,
                                    slotId: slot.slotId,
                                    startTime: timeToMinutes(slot.startTime),
                                    endTime: timeToMinutes(slot.endTime),
                                  })
                                }
                                icon={LuTrash2}
                              >
                                Delete
                              </DropdownItem>
                            </Dropdown>
                          </div>
                        </div>
                      ))}
                      {dayOfWeek === today && <Badge color="gray">today</Badge>}
                    </div>
                  ) : (
                    <div className="border border-gray-200 bg-gray-50 rounded-md px-4 py-3">
                      <p className="text-gray-500 text-sm text-center">
                        No available slots for this day
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2">
                  {getSlotsForADay(dayOfWeek).length > 0 && (
                    <Button
                      onClick={() => deleteScheduleDay(dayOfWeek)}
                      color="red"
                    >
                      <Trash2 size="20" color="white" />
                    </Button>
                  )}
                  <Button
                    className="flex gap-2 items-center"
                    onClick={() => handleAddSlot(dayOfWeek)}
                  >
                    <FaPlus />
                    Add slot
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
