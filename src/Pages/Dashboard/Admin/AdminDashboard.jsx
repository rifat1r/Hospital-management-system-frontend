import CreateRoleBasedUserModal from "./CreateRoleBasedUser/CreateRoleBasedUserModal";

const AdminDashboard = () => {
  return (
    <div>
      <CreateRoleBasedUserModal role="admin" />
      <div>
        <h1>All Admins</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
