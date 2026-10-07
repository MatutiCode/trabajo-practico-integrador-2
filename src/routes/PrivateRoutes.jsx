import { Navigate, Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { isUserLogged } from "../helpers/auth";

export const PrivateRoutes = () => {
  if (!isUserLogged()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
