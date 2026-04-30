import { Button, Label, Select, TextInput } from "flowbite-react";
import { Clock, Edit, Edit2, Upload, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { updateScheduleSettings } from "../../../../api/doctorApi";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { swal } from "../../../../utils/notify";

const ScheduleSettings = ({ scheduleData }) => {
  const axiosSecure = useAxiosSecure();
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (scheduleData) {
      setDisable(true);
    } else if (!scheduleData) {
      // if doctor doesnt have schedule then the form will be enabled
      setDisable(false);
    }
  }, [scheduleData]);

  const {
    register,
    formState: { errors },
    getValues,
    trigger,
  } = useFormContext();

  // toggles the disability
  const handleDisable = () => {
    setDisable(!disable);
  };

  const onSubmit = async () => {
    // validate "appointmentDuration", "appointmentFee" while updating
    const isValid = await trigger(["appointmentDuration", "appointmentFee"]);
    if (isValid) {
      const { appointmentDuration, appointmentFee } = getValues();
      const res = await updateScheduleSettings(axiosSecure, {
        appointmentDuration,
        appointmentFee,
      });
      if (res.success) {
        swal("success", "success!", res.message, true);
        setDisable(true);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-indigo-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">
            Schedule Settings
          </h2>
        </div>
        {/* shows up only when doctor already has schedule */}
        {scheduleData && (
          <div>
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => handleDisable()}
            >
              {disable ? <Edit /> : <X />}
            </button>
          </div>
        )}
      </div>

      {/* disable the form when */}
      <fieldset disabled={disable}>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full block">
              <div className="">
                <Label color="gray">Appointment duration</Label>
              </div>
              <Select
                {...register("appointmentDuration", {
                  validate: (value) => {
                    if (!value) {
                      return "Please select duration";
                    }
                    return true;
                  },
                })}
              >
                <option value="">Select duration</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
              </Select>

              <p className="text-red-500 text-sm font-semibold px-1">
                {errors?.appointmentDuration?.message}
              </p>
            </div>
            <div className="w-full block">
              <div className="">
                <Label color="gray">Appointment fee</Label>
              </div>
              <TextInput
                {...register("appointmentFee", {
                  required: "Appointment fee is required",
                })}
                type="number"
                placeholder="e.g. 500"
                min="0"
                step="50"
              />
              <p className="text-red-500 text-sm font-semibold px-1">
                {errors?.appointmentFee?.message}
              </p>
            </div>
          </div>

          {!disable && !!scheduleData && (
            <div className="flex justify-end  mt-5">
              <Button onClick={onSubmit}>
                Save changes
                <Upload className="w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </fieldset>
    </div>
  );
};

export default ScheduleSettings;
