import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import DurationPicker from "./DurationPicker";
import { Pill, Plus, Table2, Trash } from "lucide-react";
import SuggestionsContainer from "./SuggestionsContainer";

const Medications = ({
  register,
  control,
  setValue,
  openPicker,
  setOpenPicker,
  durationText,
  setDurationText,
  errors,
  watch,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "medications",
  });

  ("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [isFocused, setIsFocused] = useState(null);

  return (
    <div className="border rounded p-4 mt-6">
      <h2 className="text-lg font-medium">
        <Pill color="blue" className="inline mr-2 mb-1" size={20} />
        Medications
      </h2>
      {fields.length === 0 ? (
        // default
        <div className="border-2 border-dashed rounded-lg w-full h-28 flex items-center justify-center ">
          <p className="text-sm font-medium">
            <Table2 className="inline mb-1 mr-2" color="blue" />
            No Medicines Added
          </p>
        </div>
      ) : (
        // medicine rows
        <div>
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-1  "
            >
              <div
                key={field.id}
                className="grid grid-cols-5  gap-2 mt-2 items-start  pb-2  w-full "
              >
                {/* Medicine Name */}
                <div className="col-span-2 ">
                  <label className="block text-sm font-medium mb-1">
                    Medicine Name
                  </label>
                  <input
                    type="text"
                    {...register(`medications.${index}.name`, {
                      required: "Medicine name is required",
                    })}
                    placeholder="Medicine name"
                    className="border rounded p-2 w-full"
                    // toggle the suggestions
                    onFocus={() => setIsFocused(index)}
                    onBlur={() => setIsFocused(null)}
                  />
                  {errors?.medications?.[index]?.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.medications?.[index]?.name?.message}
                    </p>
                  )}
                  <div className="relative">
                    {isFocused === index && (
                      <SuggestionsContainer
                        {...{
                          watch,
                          fieldName: `medications.${index}.name`,
                          setValue,
                          setIsFocused,
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* frequency */}
                <div className="col-span-1 ">
                  <label className="block text-sm font-medium mb-1">
                    Frequency
                  </label>
                  <select
                    {...register(`medications.${index}.frequency`, {
                      required: "Frequency is required",
                    })}
                    className="border rounded p-2 w-full"
                  >
                    <option value="">Select frequency</option>
                    <option value="1-1-1">1-1-1</option>
                    <option value="1-0-1">1-0-1</option>
                    <option value="0-0-1">0-0-1</option>
                    <option value="1-0-0">1-0-0</option>
                    <option value="0-1-0">0-1-0</option>
                    <option value="1-1-0">1-1-0</option>
                    <option value="0-1-1">0-1-1</option>
                  </select>
                  {errors?.medications?.[index]?.frequency && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.medications?.[index]?.frequency?.message}
                    </p>
                  )}
                </div>

                {/* Meal Timing */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1">
                    Timing
                  </label>
                  <select
                    {...register(`medications.${index}.timing`, {
                      required: "Timing is required",
                    })}
                    className="border rounded p-2 w-full"
                  >
                    <option value="">Select timing</option>
                    <option value="after meal">After Meal</option>
                    <option value="before meal">Before Meal</option>
                  </select>
                  {errors?.medications?.[index]?.timing && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.medications?.[index]?.timing?.message}
                    </p>
                  )}
                </div>

                {/* Duration */}
                <div
                  className="relative col-span-1 "
                  onBlur={() => {
                    (setOpenPicker(null),
                      // clearing the state so that next field using this state doesnt get this value
                      setDurationText({ number: null, unit: null }));
                  }}
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Duration
                    </label>
                    <input
                      readOnly
                      {...register(`medications.${index}.duration`, {
                        required: "Duration is required",
                        validate: (value) => {
                          if (value.split(" ").length === 1) {
                            return `Please Provide a time unit`;
                          }
                        },
                      })}
                      onFocus={() => {
                        (setOpenPicker(index), setActiveIndex(index));
                      }}
                      className="border rounded p-2 w-full"
                      type="text"
                      placeholder="Pick duration"
                    />
                    {errors?.medications?.[index]?.duration && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors?.medications?.[index]?.duration?.message}
                      </p>
                    )}
                  </div>
                  {openPicker !== null && openPicker === index && (
                    <div
                      onMouseDown={(e) => e.preventDefault()}
                      className="w-56 absolute z-10"
                    >
                      <DurationPicker
                        {...{
                          durationText,
                          setDurationText,
                          setValue,
                          fieldName: `medications.${activeIndex}.duration`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* remove medication button */}

              <div
                onClick={() => remove(index)}
                className="mt-5 hover:bg-red-200 bg-opacity-10 rounded p-2"
              >
                <Trash color="red" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Medicine Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() =>
            append({ name: "", frequency: "", timing: "", duration: "" })
          }
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          <Plus className="inline mr-1 mb-1" />
          Add Medicine
        </button>
      </div>
    </div>
  );
};

export default Medications;
