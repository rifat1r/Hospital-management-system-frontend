import { useQuery } from "@tanstack/react-query";
import { fetchUsersByRole } from "../../../api/userApi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import userFieldConfig from "../../../Pages/Dashboard/Admin/AllUsers/userFieldConfig";
import TableActions from "./TableActions";
import CreateRoleBasedUserModal from "../../../Pages/Dashboard/Admin/CreateRoleBasedUser/CreateRoleBasedUserModal";

const UserTable = ({ userType }) => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, refetch } = useQuery({
    queryKey: [userType, "all-users"],
    queryFn: async () => {
      const res = await fetchUsersByRole(axiosSecure, userType);
      return res;
    },
  });

  const userTypeKeyMap = {
    doctor: "doctors",
    admin: "admins",
    patient: "patients",
  };

  // users key like doctors,patiets, etc.
  const key = userTypeKeyMap[userType];
  const users = data[key] || [];

  return (
    <div className=" -mt-2">
      {userType !== "patient" && <CreateRoleBasedUserModal role={userType} />}

      <Table>
        <TableHead>
          <TableRow>
            {userFieldConfig[userType]?.headers.map((header, i) => (
              <TableHeadCell key={i}>{header}</TableHeadCell>
            ))}
            <TableHeadCell>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              {userFieldConfig[userType].row(user).map((field, i) => (
                <TableCell key={i}>{field}</TableCell>
              ))}
              {/* actions */}
              <TableActions refetch={refetch} user={user} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default UserTable;
