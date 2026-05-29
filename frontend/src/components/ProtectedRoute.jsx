import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// AuthGuard - only logged in users can access
export const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// GuestGuard - only guests (not logged in) can access
export const GuestGuard = ({ children }) => {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    if (userRole === "customer") return <Navigate to="/user-dashboard" replace />;
    if (userRole === "seller") return <Navigate to="/seller-dashboard" replace />;
    if (userRole === "admin") return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

// RoleGuard - only users with specific role can access
export const RoleGuard = ({ children, allowedRole }) => {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (userRole !== allowedRole) {
    if (userRole === "customer") return <Navigate to="/user-dashboard" replace />;
    if (userRole === "seller") return <Navigate to="/seller-dashboard" replace />;
    if (userRole === "admin") return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};