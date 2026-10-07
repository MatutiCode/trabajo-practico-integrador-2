const toText = (item) => {
  if (typeof item === "string") return item;
  if (item?.msg) return item.path ? `${item.path}: ${item.msg}` : item.msg;
  return "Dato inválido";
};

export const getErrorMessages = (status, body) => {
  switch (status) {
    case 400: {
      
      if (Array.isArray(body?.errors) && body.errors.length > 0) {
        return [...new Set(body.errors.map(toText))];
      }
      return [body?.message ?? "Los datos enviados no son válidos."];
    }
    case 401:
      return [body?.message ?? "Credenciales incorrectas o sesión inexistente."];
    case 403:
      return ["No tenés permisos para realizar esta acción."];
    default:
      return ["Ocurrió un error en el servidor. Intentá de nuevo más tarde."];
  }
};