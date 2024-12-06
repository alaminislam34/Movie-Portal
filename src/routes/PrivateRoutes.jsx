import { useContext } from "react";
import { ProviderContext } from "../Provider/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../loader/Loader";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useContext(ProviderContext);
  if (user) {
    return children;
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Navigate state={location.pathname} to={`/signin`}></Navigate>
    </>
  );
};

export default PrivateRoutes;
