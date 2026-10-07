import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { isUserLogged } from "../helpers/auth";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<HomePage />} />
        </Route>

        <Route
          path="*"
          element={
            <Navigate to={isUserLogged() ? "/home" : "/login"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
