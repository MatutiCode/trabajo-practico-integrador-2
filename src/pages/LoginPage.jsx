import { Link } from "react-router";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
  const { formState, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Iniciar sesión</h1>

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

        <button
          type="submit"
          className="rounded-md bg-teal-700 px-3 py-2 font-medium text-white hover:bg-teal-800"
        >
          Ingresar
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
