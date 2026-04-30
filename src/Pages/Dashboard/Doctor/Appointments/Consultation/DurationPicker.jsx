import { useEffect } from "react";
import numbers from "../../../../../constants/numbers";
import units from "../../../../../constants/units";

const DurationPicker = ({
  setDurationText,
  durationText,
  fieldName,
  setValue,
}) => {
  useEffect(() => {
    if (durationText.number === null && durationText.unit === null) return; // dont set value while reopening the picker cus it deletes the input value

    setValue(
      fieldName,
      `${durationText.number ?? ""} ${durationText.unit ?? ""}`.trim(),
    );
  }, [fieldName, durationText, setValue]);
  return (
    <div className="flex flex-col  items-start gap-2  border rounded p-1 w-full bg-green-500">
      <div className="flex gap-2 w-full">
        {/* pick numbers */}
        <div className="grid grid-cols-3 gap-2  w-full">
          {numbers.map((num, i) => (
            <div
              key={i}
              onClick={() =>
                setDurationText((prev) => ({
                  number:
                    prev.number !== null ? `${prev.number}${num}` : `${num}`,
                }))
              }
              className={`${num === 0 ? "col-span-3 w-full" : "w-12"} border-2 rounded p-1  h-8 text-center font-medium hover:bg-slate-200 bg-opacity-10`}
            >
              {num}
            </div>
          ))}
        </div>
        {/* pick unit */}
        <div className="flex flex-col gap-2 h-full  ">
          {/* units */}
          {units.map((unit, i) => (
            <div
              key={i}
              onClick={() =>
                setDurationText((prev) => {
                  // select number first
                  if (prev.number === null) return prev;

                  const fullUnit = prev.number > 1 ? "plural" : "singular"; // e.g. Day/Days

                  return { ...prev, unit: `${unit[fullUnit]}` };
                })
              }
              className="border-2 rounded  p-1 text-center w-12 h-8 font-medium hover:bg-slate-300 bg-opacity-20"
            >
              {unit.short}
            </div>
          ))}
        </div>
      </div>
      {/* clear texts */}
      <div
        onClick={() => setDurationText({ number: "", unit: "" })}
        className="w-full p-2 border-2 rounded flex items-center justify-center hover:bg-slate-200 bg-opacity-10"
      >
        <span className="font-medium">Clear</span>
      </div>
    </div>
  );
};

export default DurationPicker;
