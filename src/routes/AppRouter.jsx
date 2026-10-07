import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
