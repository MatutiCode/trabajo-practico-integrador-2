import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";
import { API_URL } from "../config";
import { getErrorMessages } from "../helpers/errors";
import { saveSession } from "../helpers/auth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { formState, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });
      const body = await response.json().catch(() => null);

      if (!response.ok) {
        setErrors(getErrorMessages(response.status, body));
        return;
      }

      saveSession();
      navigate("/home", {
        state: { message: "Sesión iniciada correctamente." },
      });
    } catch (error) {
      console.error(error);
      setErrors(["No se pudo conectar con el servidor."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Iniciar sesión</h1>

      {state?.message && (
        <p className="mb-4 rounded-md bg-teal-50 p-3 text-sm text-teal-800">
          {state.message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={formState.email}
          onChange={handleInputChange}
          required
          className="rounded-md border border-slate-300 px-3 py-2 focus:border-teal-600 focus:outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          autoComplete="current-password"
          value={formState.password}
          onChange={handleInputChange}
          required
          className="rounded-md border border-slate-300 px-3 py-2 focus:border-teal-600 focus:outline-none"
        />

        {errors.length > 0 && (
          <ul className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {errors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-teal-700 px-3 py-2 font-medium text-white hover:bg-teal-800 disabled:opacity-50"
        >
          {isLoading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        ¿No tenés cuenta?{" "}
        <Link to="/register" className="font-medium text-teal-700 underline">
          Registrate
        </Link>
      </p>
    </main>
  );
};
