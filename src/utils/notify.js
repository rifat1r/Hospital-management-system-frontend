import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const notify = (message, type) => {
  toast(message, {
    position: "top-center",
    autoClose: 3000,
    type: type || "default",
    hideProgressBar: true,
  });
};

export const swal = async (
  icon,
  title,
  text = null,
  autoClose = false,
  btnTxt,
) => {
  const res = await Swal.fire({
    icon: icon || "info",
    title,
    text,
    showConfirmButton: !autoClose,
    confirmButtonText: btnTxt || "Ok",
    timer: autoClose ? 2000 : undefined,
    draggable: true,
    showCancelButton: btnTxt && true,
  });
  return res;
};

export const swalConfirm = async (name) => {
  // asks the user to confirm an action
  const res = await Swal.fire({
    title: "Are you sure?",
    text: `Its going to delete ${name}'s profile permanently!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
  // stops execution if the user does not confirm
  if (!res.isConfirmed) return;
};
