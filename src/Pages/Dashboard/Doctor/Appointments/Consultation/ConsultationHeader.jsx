import { ArrowLeft, Dot, Save, Send } from "lucide-react";
import { minutesToTime } from "../../../../../utils/time&dateConversions";
import { useNavigate } from "react-router-dom";

const ConsultationHeader = ({ handleSubmit, onSubmit, appointment }) => {
  const navigate = useNavigate();
  console.log(
    "appointment?.appointmentSessionDetails",
    appointment?.appointmentSessionDetails,
  );
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Consultation & Treatment
              </h1>
              <p className="text-sm font-medium text-gray-600 mt-1">
                Session:{" "}
                {minutesToTime(
                  appointment?.appointmentSessionDetails?.sessionStartTime,
                )}{" "}
                -{" "}
                {minutesToTime(
                  appointment?.appointmentSessionDetails?.sessionEndTime,
                )}
                <Dot size={30} className="inline -mx-2" /> Appointment{" "}
                {appointment.appointmentSessionDetails?.position} of{" "}
                {appointment.appointmentSessionDetails?.total} in this session{" "}
                <Dot size={30} className="inline -mx-2" />
                Appointment Time:{" "}
                {minutesToTime(appointment.appointmentStartTime)} -{" "}
                {minutesToTime(appointment.appointmentEndTime)}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            {/* <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 font-medium">
              <Save className="w-4 h-4" />
              Save Draft
            </button> */}
            <button
              onClick={handleSubmit(onSubmit)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2 font-medium shadow-sm"
            >
              <Send className="w-4 h-4" />
              Complete & Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationHeader;
