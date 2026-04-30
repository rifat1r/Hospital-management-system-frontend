import { Label, TextInput } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import { timeToMinutes } from "../../utils/time&dateConversions";

// index will not be passed when used in edit slot modal
const TimeFields = ({ conflicts, index, slotId }) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  // fieldsPrefix
  const fieldPrefix = index !== undefined && `slots.${index}`;

  // -- validating that the end time is after start time and meets the duration requirement ---
  const validateTimeOrder = () => {
    const startTimePath = fieldPrefix
      ? `${fieldPrefix}.startTime`
      : "startTime";
    const endTimePath = fieldPrefix ? `${fieldPrefix}.endTime` : "endTime";

    const startTime = getValues(startTimePath);
    const endTime = getValues(endTimePath);

    const duration = getValues("appointmentDuration");
    const durationNum = Number(duration);

    // if either time is missing, skip validation
    if (!startTime || !endTime) return true;

    // Validate that end time is after start time and meets duration requirement
    if (timeToMinutes(endTime) <= timeToMinutes(startTime)) {
      return "End time must be after start time";
    }

    if (timeToMinutes(endTime) - timeToMinutes(startTime) <= durationNum) {
      return `End time must be at least equal to appointment duration ${duration} minutes`;
    }
    return true;
  };

  // this functions sets the input color to red when there is a overlap of the provided slots with the existing ones
  const inputColor = () => {
    if (fieldPrefix) {
      // this one for make schedule slot
      return conflicts.includes(index) ? "failure" : "gray";
    } else {
      // this one for edit slot
      return conflicts === slotId ? "failure" : "gray";
    }
  };
  // console.log("input color", inputColor());

  return (
    // enforcing one column for edit slot modal
    <div
      className={`grid  gap-5 flex-1 ${
        index === undefined ? " grid-cols-1 " : "grid-cols-1 md:grid-cols-2 "
      } `}
    >
      <div className="w-full block">
        <div className="">
          <Label color="gray">Start time</Label>
          <span className="text-xs text-gray-500 ml-2">(e.g. 9:00 AM)</span>
        </div>
        <TextInput
          {...register(
            `${fieldPrefix ? `${fieldPrefix}.startTime` : "startTime"}`,
            {
              required: "Start time is required",
            },
          )}
          color={inputColor()}
          type="time"
          placeholder="e.g. 10:00 AM"
        />
        <p className="text-red-500 text-sm font-semibold px-1">
          {fieldPrefix
            ? errors?.slots?.[index]?.startTime?.message
            : errors?.startTime?.message}
          {/* {index !== undefined
            ? errors?.slots?.[index]?.startTime?.message
            : errors?.startTime?.message} */}
        </p>
      </div>
      <div className="w-full block">
        <div className="">
          <Label color="gray">End time</Label>
          <span className="text-xs text-gray-500 ml-2">(e.g. 5:00 PM)</span>
        </div>
        <TextInput
          {...register(
            `${fieldPrefix ? `${fieldPrefix}.endTime` : "endTime"}`,
            {
              required: "End time is required",
              validate: () => validateTimeOrder(index),
            },
          )}
          type="time"
          placeholder="e.g. 12:00 PM"
          color={inputColor()}
        />
        <p className="text-red-500 text-sm font-semibold px-1">
          {fieldPrefix
            ? errors?.slots?.[index]?.endTime?.message
            : errors?.endTime?.message}
        </p>
      </div>
    </div>
  );
};

export default TimeFields;
