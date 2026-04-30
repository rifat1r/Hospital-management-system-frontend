import { Label, TextInput } from "flowbite-react";
import { Upload, X } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { notify, swal } from "../../../../utils/notify";
import errorMessage from "../../../../utils/errorMessage";

const ServiceInputFields = ({
  service,
  index,
  setUpdateServiceId,
  refetch,
}) => {
  // we dont pass index while updating a service
  const identifier = index !== undefined && `services.${index}`;
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (service) {
      setValue("name", service.name);
      setValue("fee", service.fee);
    }
  }, [service, setValue]);

  const axiosSecure = useAxiosSecure();

  const updateService = async () => {
    const name = getValues("name");
    const fee = parseInt(getValues("fee"));

    try {
      const res = await axiosSecure.patch(`/doctor/services/${service._id}`, {
        name,
        fee,
      });
      if (res.data.success) {
        setUpdateServiceId(null);
        refetch();
        notify(res.data.message, "success");
      }
    } catch (error) {
      swal("error", errorMessage(error));
    }
  };

  return (
    // This component is used for both creating and updating services
    <div className={`w-full ${!identifier && "flex  justify-between gap-2"}`}>
      <div className="grid grid-cols-1  md:grid-cols-5  gap-3 w-full">
        <div className="md:col-span-4">
          <div className="">
            <Label color="gray">Service Name</Label>
          </div>
          <TextInput
            {...register(identifier ? `${identifier}.name` : "name", {
              required: "Service name is required",
            })}
            type="text"
            placeholder="type service name"
          />
          <p className="text-red-500 text-sm font-semibold px-1">
            {identifier
              ? errors?.services?.[index]?.name?.message
              : errors?.name?.message}
          </p>
        </div>
        <div className="md:col-span-1">
          <div className="">
            <Label color="gray">Service fee</Label>
          </div>
          <TextInput
            {...register(identifier ? `${identifier}.fee` : "fee", {
              required: "Service fee is required",
            })}
            type="number"
            placeholder="type service fee"
          />
          <p className="text-red-500 text-sm font-semibold px-1">
            {identifier
              ? errors?.services?.[index]?.fee?.message
              : errors?.fee?.message}
          </p>
        </div>
      </div>

      {!identifier && (
        <div className="flex items-center justify-center gap-6 px-3 pt-5 ">
          <button onClick={() => updateService()}>
            <Upload color="green" />
          </button>
          <button onClick={() => setUpdateServiceId(null)}>
            <X />
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceInputFields;
