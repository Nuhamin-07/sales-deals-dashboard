import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
const RouteRedirect = () => {
  const { session } = useAuth();
  if (session === undefined) {
    return <div>Loading...</div>;
  }
  return session ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />;
};

export default RouteRedirect;
