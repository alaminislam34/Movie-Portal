import { useContext } from "react";
import { ProviderContext } from "../Provider/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user } = useContext(ProviderContext);
  if (user) {
    return children;
  } else {
    return <Navigate to="/signin"></Navigate>;
  }
};

export default PrivateRoutes;
