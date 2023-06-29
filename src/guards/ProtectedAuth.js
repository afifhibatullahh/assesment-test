import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedAuth = ({ children }) => {
  const { token } = useAuth();
  const { location, pathname } = useLocation();

  const isLoggedIn = pathname === "/login" || pathname === "/register";

  if (isLoggedIn && Boolean(token)) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedAuth;
