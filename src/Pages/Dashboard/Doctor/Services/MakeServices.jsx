import { Button, Label, TextInput } from "flowbite-react";
import { Plus, Save, Stethoscope, Trash2 } from "lucide-react";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { swal } from "../../../../utils/notify";
import ServiceInputFields from "./ServiceInputFields";
import errorMessage from "../../../../utils/errorMessage";

const MakeServices = () => {
  const axiosSecure = useAxiosSecure();

  const methods = useForm({
    defaultValues: {
      services: [{ name: "", fee: "" }],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const addService = () => {
    append({ name: "", fee: "" });
  };

  const removeService = (index) => {
    remove(index);
  };

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/doctor/services", data);
      if (res.data.success) {
        reset();
        swal("success", res.data.message, "", true);
      }
      // console.log("res ---", res.data);
    } catch (error) {
      // console.error("Error submitting services:", error);

      swal("error", "Failed to save services", errorMessage(error));
    }
  };

  return (
    <div className="  ">
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-3xl font-semibold mb-1">
          <Stethoscope color="skyblue" size={40} />
          Manage Your services
        </h2>
        <p>Create and manage your medical services</p>
      </div>
      <div className="mb-4 text-blue-600">
        <h2 className="text-2xl flex items-center gap-1 font-medium mb-2">
          <span>
            <Plus size={25} />
          </span>
          Add New Services
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 ">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex justify-between items-center my-4 gap-4 w-full"
              >
                {/* input fields here */}
                <ServiceInputFields index={index} />

                {fields.length > 1 && (
                  <button
                    onClick={() => removeService(index)}
                    type="button"
                    className="mt-6 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove slot"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}
            <div className="flex  justify-between mt-8">
              <Button
                className="flex gap-3"
                color="alternative"
                type="button"
                onClick={addService}
              >
                <Plus className="text-blue-600" size={20} />
                <span className="text-blue-600">Add Another Service</span>
              </Button>

              <Button className="flex gap-4" type="submit">
                <Save size={20} />
                <span>Save Service</span>
              </Button>
            </div>
          </div>
        </FormProvider>
      </form>
    </div>
  );
};

export default MakeServices;
