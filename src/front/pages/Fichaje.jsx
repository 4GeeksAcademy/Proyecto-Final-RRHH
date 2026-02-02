import { useEffect, useState } from "react";

export default function Fichaje() {
  const [fichajes, setFichajes] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const token = localStorage.getItem("jwt-token");

  // Cargar fichajes del usuario
  const cargarFichajes = async () => {
    if (!token) return;
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/mis-fichajes", {
        headers: { Authorization: "Bearer " + token },
      });
      if (!res.ok) throw new Error("Error al cargar fichajes");
      const data = await res.json();
      setFichajes(data.fichajes);
    } catch (error) {
      console.error("Error cargando fichajes:", error);
    }
  };

  // Cargar datos del usuario
  const cargarUsuario = async () => {
    if (!token) return;
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/usuario", {
        headers: { Authorization: "Bearer " + token },
      });
      if (!res.ok) throw new Error("Error al cargar usuario");
      const data = await res.json();
      setUsuario(data.usuario);
    } catch (error) {
      console.error("Error cargando usuario:", error);
    }
  };

  useEffect(() => {
    cargarFichajes();
    cargarUsuario();
  }, [token]);

  return (
    /* 1. Fondo de sección: bg-white -> dark:bg-gray-900 */
    <section className="p-4 md:p-8 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      
      {/* Título de sección (opcional, si lo añades luego) */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Registro de Actividad</h2>

      {/* Contenedor de la tabla */}
      <div className="relative overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-6 py-4 font-semibold">Fecha</th>
              <th className="px-6 py-4 font-semibold">Entrada</th>
              <th className="px-6 py-4 font-semibold">Salida</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {fichajes.length > 0 ? (
              fichajes.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  {/* Fecha */}
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                    {f.hora_entrada
                      ? new Date(f.hora_entrada).toLocaleDateString()
                      : "—"}
                  </td>

                  {/* Entrada */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                      <span>
                        {f.hora_entrada
                          ? new Date(f.hora_entrada).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : "—"}
                      </span>
                    </div>
                  </td>

                  {/* Salida */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                      <span>
                        {f.hora_salida
                          ? new Date(f.hora_salida).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : "—"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                  No hay fichajes todavía
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-6 space-x-3">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
        >
          Anterior
        </button>
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}
