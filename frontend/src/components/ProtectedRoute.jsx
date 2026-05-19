import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Protects pages that require login
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Protects login and register pages from logged in users
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    if (userRole === "customer") return <Navigate to="/user-dashboard" replace />;
    if (userRole === "seller") return <Navigate to="/seller-dashboard" replace />;
    if (userRole === "admin") return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};