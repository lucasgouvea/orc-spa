import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

export const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  console.log(auth);
  if (!auth.user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
