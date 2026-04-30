import { Calendar, FileText, TestTube2 } from "lucide-react";
import { useForm } from "react-hook-form";
import TagInput from "../TagInput";
import Medication from "./Medication";
import DurationPicker from "./DurationPicker";
import { useState } from "react";
import { Button } from "flowbite-react";
import SuggestionsContainer from "./SuggestionsContainer";
import { durationToDate } from "../../../../../utils/time&dateConversions";
import dateFormatter from "../../../../../utils/dateFormatter";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PatientInfo from "./PatientInfo";
import ConsultationHeader from "./ConsultationHeader";

const Consultation = () => {
  const { appointmentId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: { appointment = {} } = {}, isPending } = useQuery({
    queryKey: ["appointmentInfo", appointmentId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/doctor/appointment/${appointmentId}`);
      return res.data;
    },
  });

  console.log("appointment data --", appointment);

  const {
    register,
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [openPicker, setOpenPicker] = useState(null);
  const [compalintsArr, setComplaintsArr] = useState([]);
  const [diagnosisArr, setDiagnosisArr] = useState([]);
  const [testsArr, setTestsArr] = useState([]);
  const [durationText, setDurationText] = useState({
    number: null,
    unit: null,
  });

  const onSubmit = async (data) => {
    const consultationData = {
      ...data,
      complaints: compalintsArr,
      diagnosis: diagnosisArr,
      followUp: dateFormatter(durationToDate(data?.followUp)),
      appointment: appointmentId,
      tests: testsArr,
      patient: appointment?.patient?._id,
    };

    const res = await axiosSecure.post(
      `/doctor/appointments/${appointmentId}/consultation`,
      { ...consultationData },
    );

    console.log("consultation res --", res.data);
  };

  if (isPending) return <p>Loading</p>;

  return (
    <div>
      <ConsultationHeader {...{ handleSubmit, onSubmit, appointment }} />

      <PatientInfo appointment={appointment} />

      <form>
        <div>
          <div className="border rounded p-4">
            <h1 className="text-lg font-medium">
              <FileText color="blue" className="inline mr-2 mb-1" size={18} />
              Clinical Assesment
            </h1>
            <div className="space-y-5 mt-4">
              <div className="space-y-2 ">
                <span className="font-medium">Complaints & Symptoms</span>
                <TagInput
                  {...{
                    register,
                    watch,
                    setValue,
                    fieldName: "complaints",
                    tagsArr: compalintsArr,
                    setTagsArr: setComplaintsArr,
                  }}
                />
                {errors.complaints && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.complaints.message}
                  </p>
                )}
                <div className="relative">
                  <SuggestionsContainer
                    {...{
                      watch,
                      fieldName: "complaints",
                      setValue,
                      setTagsArr: setComplaintsArr,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-medium">Diagnosis</span>
                <TagInput
                  {...{
                    register,
                    watch,
                    setValue,
                    fieldName: "diagnosis",
                    tagsArr: diagnosisArr,
                    setTagsArr: setDiagnosisArr,
                  }}
                />
                {errors.diagnosis && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.diagnosis.message}
                  </p>
                )}
                <div className="relative">
                  <SuggestionsContainer
                    {...{
                      watch,
                      fieldName: "diagnosis",
                      setValue,
                      setTagsArr: setDiagnosisArr,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <Medication
            {...{
              durationText,
              setDurationText,
              openPicker,
              setOpenPicker,
              register,
              setValue,
              control,
              errors,
              watch,
            }}
          />
          <div className="border rounded p-4 mt-6 space-y-4">
            <div>
              <h2 className="mb-2 font-medium">
                <TestTube2
                  className="inline mr-2 mb-1"
                  size={20}
                  color="blue"
                />
                Recommend Lab Tests{" "}
              </h2>
              <TagInput
                {...{
                  register,
                  watch,
                  setValue,
                  fieldName: "tests",
                  tagsArr: testsArr,
                  setTagsArr: setTestsArr,
                }}
              />
              <div className="relative">
                <SuggestionsContainer
                  {...{
                    watch,
                    fieldName: "tests",
                    setValue,
                    setTagsArr: setTestsArr,
                  }}
                />
              </div>
            </div>
            <div>
              <h2 className="mb-2 font-medium">
                <Calendar className="inline mr-2 mb-1" size={20} color="blue" />
                Next Follow Up
              </h2>

              <div
                className="relative col-span-1 "
                onBlur={() => {
                  (setOpenPicker(null),
                    setDurationText({ number: null, unit: null })); // clearing the state so that next field using this state doesnt get same value on when opened
                }}
              >
                <div className="border rounded">
                  <input
                    readOnly
                    onFocus={() => {
                      setOpenPicker("followUp");
                    }}
                    {...register("followUp", {
                      validate: (value) => {
                        if (!value) return;

                        if (value.split(" ").length === 1) {
                          // when time unit is not picked
                          return `Please Provide a time unit`;
                        }
                      },
                    })}
                    className="p-3 w-full "
                    placeholder="e.g. 2 Weeks"
                    type="text"
                  />
                </div>
                {errors.followUp && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.followUp.message}
                  </p>
                )}
                {openPicker === "followUp" && (
                  <div
                    onMouseDown={(e) => e.preventDefault()} // this  prevents the input from losing focus when we click on DurationPicker (prevent default cancels the focus shit on mouseDown)
                    className="w-56 absolute z-10"
                  >
                    <DurationPicker
                      {...{
                        durationText,
                        setDurationText,
                        setValue,
                        fieldName: "followUp",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="mb-2 font-medium">
                Clinical Advice & Instruction
              </h2>
              <div>
                <textarea
                  {...register("clinicalAdvice")}
                  className="w-full border rounded p-4"
                  placeholder="Type Clinical Advice & Instruction ..."
                  rows={5}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Consultation;
