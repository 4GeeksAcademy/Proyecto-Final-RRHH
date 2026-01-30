const API_URL = import.meta.env.VITE_BACKEND_URL;

// Fichar entrada
export const ficharEntrada = async () => {
  const token = localStorage.getItem("jwt-token");
  if (!token) throw new Error("Sin token");

  const res = await fetch(`${API_URL}/api/fichaje/entrada`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Error al fichar entrada");

  const data = await res.json(); // devuelve { horaEntrada: "...", id: ... }
  return data;
};

// Fichar salida
export const ficharSalida = async () => {
  const token = localStorage.getItem("jwt-token");
  if (!token) throw new Error("Sin token");

  const res = await fetch(`${API_URL}/api/fichaje/salida`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Error al fichar salida");

  const data = await res.json(); // devuelve { horaSalida: "...", id: ... }
  return data;
};

// Obtener fichaje activo (para temporizador)
export const obtenerFichajeActivo = async () => {
  const token = localStorage.getItem("jwt-token");
  if (!token) return null;

  const res = await fetch(`${API_URL}/api/fichaje/activo`, {
    headers: { Authorization: "Bearer " + token },
  });

  if (res.status === 204) return null; // no hay fichaje activo
  if (!res.ok) throw new Error("Error al obtener fichaje activo");

  const data = await res.json(); // { id: ..., horaEntrada: "..." }
  return data;
};
