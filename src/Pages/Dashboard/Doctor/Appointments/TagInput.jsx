import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const TagInput = ({
  watch,
  register,
  setValue,
  fieldName,
  tagsArr,
  setTagsArr,
}) => {
  const inputTexts = watch(`${fieldName}`);

  // add texts to tags array
  const handleAddTag = useCallback(() => {
    // const newComplaint = inputTexts.slice(0, -1);
    const newTag = inputTexts.split(",")[0]; // split works for both cases when user types comma at the end and onBlur event when theres no comma

    if (newTag) {
      setTagsArr((prev) => {
        return [...prev, newTag];
      });
    }

    // empty the input field
    setValue(`${fieldName}`, "");
  }, [inputTexts, setValue, fieldName, setTagsArr]);

  useEffect(() => {
    if (inputTexts && inputTexts.slice(-1) === ",") {
      handleAddTag();
    }
  }, [handleAddTag, inputTexts, setValue]);
  return (
    <div className=" px-4 py-3 flex items-center gap-2 border rounded">
      <div className="flex gap-1">
        {tagsArr.map((tag, i) => {
          return (
            <div
              key={i}
              className="flex items-center gap-2 px-2  bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-800 w-full"
            >
              <p className="capitalize whitespace-nowrap">{tag}</p>

              <span
                onClick={() =>
                  setTagsArr(tagsArr.filter((_, index) => index !== i))
                }
                size={12}
                className="cursor-pointer opacity-60 hover:opacity-100 text-lg mb-1 "
              >
                x
              </span>
            </div>
          );
        })}
      </div>
      <input
        {...register(`${fieldName}`, {
          validate: () => {
            if (inputTexts.length === 0) {
              // only for complaints diagnosis this is required
              if (tagsArr.length === 0) {
                if (fieldName === "complaints")
                  return `Please provide one complaint`;
                if (fieldName === "diagnosis")
                  return `Please provide one diagnosis`;
              }
            }
          },
        })}
        onBlur={() => handleAddTag()}
        className="outline-none w-full"
        placeholder="Type and press comma"
        type="text"
      />
    </div>
  );
};

export default TagInput;
