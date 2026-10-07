import { useCallback, useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    try {
      const response = await fetch(url, { credentials: "include" });
      const body = await response.json();

      if (!response.ok) {
        setError(body.message ?? "No se pudo obtener la información.");
        return;
      }

      setError(null);
      setData(body);
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, isLoading, error };
};