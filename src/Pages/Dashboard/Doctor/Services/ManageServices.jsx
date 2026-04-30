import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import ServiceInputFields from "./ServiceInputFields";
import { useForm, FormProvider } from "react-hook-form";
import { swal } from "../../../../utils/notify";
import errorMessage from "../../../../utils/errorMessage";

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();
  const { data: { services = [], count = 0 } = {}, refetch } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/doctor/services");
      return res.data;
    },
  });
  const [updateServiceId, setUpdateServiceId] = useState(null);

  const methods = useForm();

  // console.log("services:", updateServiceId, services);
  const deleteService = async (id) => {
    const permission = await swal(
      "warning",
      "Are you sure to delete this service?",
      "",
      false,
      "Yes, delete it!"
    );
    // console.log("permission:", permission.isConfirmed);
    if (permission.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/doctor/services/${id}`);
        if (res.data.success) {
          refetch();
          swal("success", res.data.message, "", true);
        }
      } catch (error) {
        swal("error", errorMessage(error));
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 p-2">Your Services</h2>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((s, i) =>
            updateServiceId && s._id === updateServiceId ? (
              <div key={i} className=" bg-white p-3 rounded-lg">
                <FormProvider {...methods}>
                  <ServiceInputFields
                    service={s}
                    setUpdateServiceId={setUpdateServiceId}
                    refetch={refetch}
                  />
                </FormProvider>
              </div>
            ) : (
              <div
                key={i}
                className="bg-white rounded-lg px-4 py-2 flex justify-between  shadow-md"
              >
                <div>
                  <h1 className="font-medium col-span-4 ">{s.name}</h1>
                  {!s.isDefault && (
                    <h2 className="col-span-1 mt-1 text-gray-500 text-sm">
                      $ {s.fee} BDT
                    </h2>
                  )}
                </div>
                {!s.isDefault && (
                  <div className="col-span-1 flex justify-center mt-1 gap-4">
                    <button onClick={() => setUpdateServiceId(s._id)}>
                      <Edit2 size={20} color="blue" />
                    </button>
                    <button onClick={() => deleteService(s._id)}>
                      <Trash2 size={20} color="red" />
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageServices;
