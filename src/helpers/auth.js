export const isUserLogged = () => localStorage.getItem("isLogged") === "true";

export const saveSession = () => localStorage.setItem("isLogged", "true");

export const clearSession = () => localStorage.removeItem("isLogged");