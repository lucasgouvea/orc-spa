import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

export const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  if (!auth.user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
