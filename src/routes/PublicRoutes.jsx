import { Navigate, Outlet } from "react-router";
import { isUserLogged } from "../helpers/auth";

export const PublicRoutes = () => {
  if (isUserLogged()) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};
