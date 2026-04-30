import { Button } from "flowbite-react";
import { Check, X } from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { swal } from "../../../../utils/notify";
import errorMessage from "../../../../utils/errorMessage";

const UpdateStatus = ({ status, appointmentId, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handleStatusUpdate = async (newStatus) => {
    try {
      const res = await axiosSecure.patch(
        `/doctor/appointments/${appointmentId}/status`,
        {
          status: newStatus,
        },
      );
      if (res.data.success) {
        refetch();
      }
    } catch (error) {
      swal("error", "Error!!!", errorMessage(error));
    }
  };
  return (
    <div className="h-full">
      <h2 className="font-medium text-gray-500">Update Status</h2>
      <div className="border rounded-md p-4 mt-3 ">
        <div className="flex gap-4 mt-3">
          {status === "requested" && (
            <>
              <Button
                onClick={() => handleStatusUpdate("scheduled")}
                className="bg-green-500 rounded-lg w-full hover:bg-green-600"
              >
                <Check className="mr-1" size={25} />
                Schedule
              </Button>
              <Button
                onClick={() => handleStatusUpdate("cancelled")}
                className="bg-red-500 rounded-lg w-full hover:bg-red-600"
              >
                <X className="mr-1" size={25} />
                Cancel
              </Button>
            </>
          )}
          {status === "scheduled" && (
            <>
              <Button
                onClick={() => handleStatusUpdate("completed")}
                className="bg-green-500 rounded-lg w-full hover:bg-green-600"
              >
                <Check className="mr-1" size={25} />
                Complete
              </Button>
              <Button
                onClick={() => handleStatusUpdate("cancelled")}
                className="bg-red-500 rounded-lg w-full hover:bg-red-600"
              >
                <X className="mr-1" size={25} />
                Cancel
              </Button>
            </>
          )}
          {status === "completed" && (
            <p className="text-green-500 flex items-center gap-2">
              <Check />
              Appointment Completed
            </p>
          )}
          {status === "cancelled" && (
            <p className="text-red-500 flex items-center gap-2">
              <X />
              Appointment Cancelled
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;
