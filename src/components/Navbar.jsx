import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { API_URL } from "../config";
import { clearSession } from "../helpers/auth";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      // El backend limpia la cookie con el JWT
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      clearSession();
      setIsLoading(false);
      navigate("/login", {
        state: { message: "Sesión cerrada correctamente." },
      });
    }
  };

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link to="/home" className="text-lg font-bold text-slate-900">
          Mi Blog
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/home"
            className="text-sm text-slate-600 hover:text-teal-700"
          >
            Home
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoading}
            className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {isLoading ? "Saliendo..." : "Logout"}
          </button>
        </div>
      </div>
    </nav>
  );
};
