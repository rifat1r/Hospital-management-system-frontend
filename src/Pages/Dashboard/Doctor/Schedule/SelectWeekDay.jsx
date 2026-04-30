import { Calendar } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { replace, useSearchParams } from "react-router-dom";
import weekdays from "../../../../constants/weekDays";

const SelectWeekDay = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const selectedDays = watch("daysOfWeek", []);

  const handleSelect = (index) => {
    const updated = selectedDays.includes(index)
      ? selectedDays.filter((d) => d !== index)
      : [...selectedDays, index];

    setValue("daysOfWeek", updated);
  };

  // navigated from schedule page to add slot for a dayOfWeek
  const [searchParams, setSearchParams] = useSearchParams();
  const dayOfWeek = searchParams.get("dayOfWeek");
  // console.log("day of week from params --", dayOfWeek);

  useEffect(() => {
    if (dayOfWeek) {
      setValue("daysOfWeek", [Number(dayOfWeek)]);

      // removing the query parameter after using it
      setSearchParams(
        {},
        {
          replace: true,
        },
      );
    }
  }, [dayOfWeek, setValue, setSearchParams]);
  // console.log("day of week", dayOfWeek, selectedDays);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-indigo-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-800">
          Select Working Days
        </h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Choose the days you'll be available for appointments
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {weekdays.map((day, index) => (
          <div
            className={`
                    py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200
                    ${
                      selectedDays.includes(index)
                        ? "bg-indigo-600 text-white shadow-md transform scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }
                  `}
            onClick={() => handleSelect(index)}
            key={index}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full mt-2">
        <p className=" pl-2 text-red-500  text-center ">
          {errors?.daysOfWeek?.message}
        </p>
      </div>
      <div>
        {/* we registered days of week in form with this hidden input */}
        <input
          type="hidden"
          {...register("daysOfWeek", {
            required: "Please select at least one day",
          })}
        />
      </div>
    </div>
  );
};

export default SelectWeekDay;
