import { useFetch } from "../hooks/useFetch";
import { API_URL } from "../config";

export const HomePage = () => {
  const { data, isLoading, error } = useFetch(`${API_URL}/articles`);

  const articles = (data ?? []).filter(
    (article) => article.status === "published",
  );

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        Artículos publicados
      </h1>

      {isLoading && (
        <p className="animate-pulse text-slate-500">Cargando artículos...</p>
      )}

      {error && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      {!isLoading && !error && articles.length === 0 && (
        <p className="text-slate-500">Todavía no hay artículos publicados.</p>
      )}

      <ul className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <li
            key={article.id}
            className="rounded-lg border border-slate-200 bg-white p-5"
          >
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              {article.title}
            </h2>
            <p className="mb-3 text-slate-600">
              {article.excerpt ?? article.content.slice(0, 150)}
            </p>
            <p className="text-sm text-slate-500">
              Por {article.author?.username ?? "autor desconocido"}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
};
