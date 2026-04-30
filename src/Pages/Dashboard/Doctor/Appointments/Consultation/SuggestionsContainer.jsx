import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { Spinner } from "flowbite-react";

const SuggestionsContainer = ({
  watch,
  fieldName,
  setValue,
  setTagsArr,
  setIsFocused,
}) => {
  const axiosSecure = useAxiosSecure();
  const searchText = watch(fieldName);

  let type;
  switch (fieldName) {
    case "complaints":
      type = "complaint";
      break;
    case "diagnosis":
      type = "diagnosis";
      break;
    case "tests":
      type = "lab_test";
      break;
    default:
      type = "";
  }

  const { data: { suggestions = [] } = {}, isLoading } = useQuery({
    queryKey: ["suggestions", fieldName, searchText],
    queryFn: async () => {
      if (setTagsArr) {
        // for all input tags suggestion
        const res = await axiosSecure.get(
          `/doctor/suggestions?type=${type}&searchText=${searchText}`,
        );
        return res.data;
      } else {
        // it fetches medicine name . in this case we are not passing setTagsArr
        const res = await axiosSecure.get(
          `/doctor/suggestions/medicine?searchText=${searchText}`,
        );
        return res.data;
      }
    },
    enabled: !!searchText?.trim(),
  });

  if (isLoading) {
    return (
      <div className="w-full z-10 border rounded absolute p-2 bg-white shadow-2xl flex justify-center">
        <Spinner aria-label="Loading suggestions..." />
      </div>
    );
  }

  if (suggestions.length === 0) return null;

  // shows up when theres atleast one suggestion available
  return (
    <div
      onMouseDown={(e) => e.preventDefault()}
      className="w-full z-10 border rounded absolute p-2 bg-white shadow-2xl"
    >
      <div>
        {suggestions.map((suggestion, i) => (
          <p
            key={suggestion._id}
            onClick={() => {
              if (setTagsArr) {
                setTagsArr((prev) => [...prev, suggestion.name]); // clicking an option would make it a tag
                setValue(fieldName, ""); // input is empmty and then the suggestion container disappears
              } else {
                setValue(fieldName, suggestion.name);
                setIsFocused(null); //closes the suggestions
              }
            }}
            className={`p-1 cursor-pointer rounded ${i % 2 === 0 ? "bg-slate-300 bg-opacity-40" : ""}
  hover:bg-blue-100 hover:text-blue-700 `}
          >
            {suggestion.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsContainer;
