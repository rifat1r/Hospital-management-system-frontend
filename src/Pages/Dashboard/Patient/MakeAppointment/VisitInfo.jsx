import { FileText, UserPlus } from "lucide-react";

const VisitInfo = ({ visitType, setVisitType, setNotes, errors }) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/*  */}
      <div className=" border rounded-lg shadow p-5">
        <h1 className="flex items-center gap-2 font-medium mb-3">
          <UserPlus size={20} />
          Visit Type *
        </h1>
        <div className="flex justify-center gap-2">
          <div
            onClick={() => setVisitType("first visit")}
            className={`border px-4 py-3 rounded-lg shadow  font-medium w-full text-center transition-colors duration-300 ease-in-out ${visitType === "first visit" && "bg-blue-500 text-white"}`}
          >
            First Visit
          </div>
          <div
            onClick={() => setVisitType("follow-up")}
            className={`border px-4 py-3 rounded-lg shadow  font-medium w-full text-center transition-colors duration-300 ease-in-out ${visitType === "follow-up" && "bg-blue-500 text-white"}`}
          >
            Follow up
          </div>
        </div>
        {/* errors */}
        <p className="text-center pt-3 text-red-500">{errors?.visitType}</p>
      </div>
      {/*  */}
      <div className="w-full border rounded-lg shadow p-4">
        <h1 className="font-medium flex items-center gap-2 pb-3">
          <FileText size={20} />
          Additional Notes (Optional)
        </h1>
        <div className="">
          <textarea
            onBlur={(e) => setNotes(e.target.value)}
            placeholder="Any specific concerns or requirements ..."
            className="border w-full rounded p-2"
            rows={5}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default VisitInfo;
