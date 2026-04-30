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
import useGetUsersByRole from "../../../hooks/useGetUsersByRole";

const UserTable = ({ userType }) => {
  // this hook fetches users based on the userType (doctor, admin, patient)
  const { users, refetch } = useGetUsersByRole(userType);

  console.log("page rendering");

  return (
    <div className="-mt-2">
      {/* admins dont create patients */}
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
              {userFieldConfig[userType]?.row(user).map((field, i) => (
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
