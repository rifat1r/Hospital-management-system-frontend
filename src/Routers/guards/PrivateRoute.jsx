import { Navigate } from "react-router-dom";
import auth from "../../hooks/useAuth";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = auth();
  if (loading) {
    return <h1>loading...</h1>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
