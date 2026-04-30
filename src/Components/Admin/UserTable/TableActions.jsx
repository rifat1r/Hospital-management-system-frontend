import { Dropdown, DropdownItem, TableCell } from "flowbite-react";
import { deleteUser } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { SlOptionsVertical } from "react-icons/sl";
import { swal, swalConfirm } from "../../../utils/notify";

const TableActions = ({ user, refetch }) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // handle delete user
  const handleDeleteUser = async (user) => {
    try {
      await swalConfirm(user.name);
      const res = await deleteUser(axiosSecure, user);
      if (res.data.success) {
        refetch();
        swal("success", "User Deleted!", res.data.message, true);
      }
    } catch (error) {
      if (error.response.status) {
        swal(
          "error",
          "Failed to delete user",
          error.response.data.message,
          true
        );
      }
    }
  };

  // navigate to the doctor profile page
  const getUserProfile = (user) => {
    navigate(`/dashboard/admin/profile?role=${user.role}&id=${user._id}`);
  };
  return (
    <TableCell className="text-gray-900 dark:text-white">
      <Dropdown
        arrowIcon={false}
        dismissOnClick={false}
        placement="right"
        label={<SlOptionsVertical className="text-gray-900 dark:text-white" />}
      >
        <DropdownItem>Appointments</DropdownItem>
        <DropdownItem onClick={() => getUserProfile(user)}>
          Profile{" "}
        </DropdownItem>
        <DropdownItem onClick={() => handleDeleteUser(user)}>
          Delete User
        </DropdownItem>
        {user.role === "doctor" && (
          <DropdownItem>View Appointments</DropdownItem>
        )}
      </Dropdown>
    </TableCell>
  );
};

export default TableActions;
