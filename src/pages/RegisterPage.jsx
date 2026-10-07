import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";
import { API_URL } from "../config";
import { getErrorMessages } from "../helpers/errors";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { formState, handleInputChange, handleReset } = useForm(initialValues);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
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

      handleReset();
      navigate("/login", {
        state: { message: "Registro exitoso. Ya podés iniciar sesión." },
      });
    } catch (error) {
      console.error(error);
      setErrors(["No se pudo conectar con el servidor."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Crear cuenta</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          autoComplete="username"
          value={formState.username}
          onChange={handleInputChange}
          required
          className="rounded-md border border-slate-300 px-3 py-2 focus:border-teal-600 focus:outline-none"
        />
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
          autoComplete="new-password"
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
          {isLoading ? "Registrando..." : "Registrarme"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="font-medium text-teal-700 underline">
          Iniciá sesión
        </Link>
      </p>
    </main>
  );
};
