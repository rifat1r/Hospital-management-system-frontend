import { Button, Label, Select, TextInput } from "flowbite-react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import scheduleFormatter from "../../../../utils/scheduleFormatter";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SelectWeekDay from "./SelectWeekDay";
import { Clock, Plus, Save, Trash2, Watch } from "lucide-react";
import { swal } from "../../../../utils/notify";
import formatOverlapError from "../../../../utils/formatOverlapError";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TimeFields from "../../../../Components/Doctor/TimeFields";
import ScheduleSettings from "./ScheduleSettings";
import { createSchedule, getSchedules } from "../../../../api/doctorApi";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import errorMessage from "../../../../utils/errorMessage";

const MakeSchedule = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [conflictingSlots, setConflictingSlots] = useState([]);

  const { data: scheduleData, refetch } = useQuery({
    queryKey: ["schedule", user],
    queryFn: async () => {
      const res = await getSchedules(axiosSecure, user._id);
      return res;
    },
  });

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      slots: [{ startTime: "", endTime: "" }],
      daysOfWeek: [],
    },
  });
  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    if (scheduleData?.schedule) {
      reset((prev) => ({
        ...prev,
        appointmentFee: scheduleData?.schedule?.appointmentFee,
        appointmentDuration: scheduleData?.schedule?.appointmentDuration,
      }));
    }
  }, [scheduleData, reset]);

  const onSubmit = async (data) => {
    // removing duration and fee when they already exist
    let formattedData = { ...data };
    if (scheduleData) {
      delete formattedData.appointmentDuration;
      delete formattedData.appointmentFee;
    }
    // formating the schedule as schema defined
    const payload = scheduleFormatter({ ...formattedData });
    try {
      const res = await createSchedule(axiosSecure, payload);

      if (res.success) {
        swal("success", "Success!!!", res.message, true);
      }

      reset({ daysOfWeek: [], slots: [{ startTime: "", endTime: "" }] });

      if (!scheduleData) {
        refetch();
      }
      setConflictingSlots([]);
    } catch (error) {
      // console.log("error--", error);

      if (error.response.data.conflictedDays) {
        const { conflictingDays, conflictingSlotIndex } = formatOverlapError(
          error.response.data,
          data.slots,
        );

        setConflictingSlots(conflictingSlotIndex);

        const res = await swal(
          "error",
          error.response.data.message,
          `The red marked time slots overlaps with the existing schedule on days: ${conflictingDays.join(
            ",",
          )}`,
          false,
          "View existing schedule",
        );

        if (res.isConfirmed) {
          navigate("/dashboard/doctor/schedule");
        }
      } else {
        // all other errors here
        swal("error", "Error!!!", errorMessage(error));
      }
    }
  };

  const { fields, append, remove } = useFieldArray({
    name: "slots",
    control,
  });

  const handleAddSLots = () => {
    append({ startTime: "", endTime: "" });
  };

  const removeSlot = (id) => {
    // remove the last input slot
    if (fields.length > 1) {
      remove(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Set Your Availability
        </h1>
        <p className="text-gray-600">
          Configure your weekly schedule, appointment duration, and consultation
          fees.
        </p>
      </div>
      <div className="">
        {/* appointment duration and appointment fee */}

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* schedule settings */}
            <ScheduleSettings scheduleData={scheduleData} />

            {/* select week days */}
            <SelectWeekDay />

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="text-indigo-600" size={24} />
                    <h2 className="text-xl font-semibold text-gray-800">
                      Available Time Slots
                    </h2>
                  </div>
                  <button
                    onClick={handleAddSLots}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Plus size={18} />
                    Add Slot
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Define your working hours for the selected days
                </p>
              </div>
              <div className="">
                {fields.map((field, index) => (
                  <div
                    className="flex justify-between p-2 gap-5"
                    key={field.id}
                  >
                    <TimeFields conflicts={conflictingSlots} index={index} />

                    {fields.length > 1 && (
                      <button
                        onClick={() => removeSlot(index)}
                        type="button"
                        className="mt-6 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove slot"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className=" mx-2 mt-4">
                <button
                  type="submit"
                  className="flex items-center justify-center   bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md font-medium w-full h-14"
                >
                  <Save className="mr-2" size={20} />
                  Save Schedule
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default MakeSchedule;
