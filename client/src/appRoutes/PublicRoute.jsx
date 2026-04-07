import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../app/slices/auth.slice";

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
