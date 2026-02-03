import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Reuniones() {
  const [datos, setDatos] = useState([]);
  const emailUsuario = "fillaux33@gmail.com";

  useEffect(() => {
    const getReuniones = async () => {
      try {
        const token = localStorage.getItem("jwt-token");

        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/reuniones",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        const reunionesFormateadas = data.reuniones.map((r) => {
          const organizador = r.usuarios?.[0]?.email || "—";

          const invitados =
            r.usuarios && r.usuarios.length > 1
              ? r.usuarios
                  .slice(1)
                  .map((u) => u.email)
                  .join(", ")
              : "—";

          return {
            FECHA_BUENA: new Date(r.fecha).toLocaleString(),
            TIEMPO_BUENO: r.duracion,
            ORGANIZADOR_BUENO: organizador,
            INVITADO_BUENO: invitados,
            LINK: r.link,
          };
        });

        setDatos(reunionesFormateadas);
      } catch (error) {
        console.error("Error al obtener reuniones:", error);
      }
    };

    getReuniones();
  }, []);

  const datosFiltrados = datos.filter(
    (fila) =>
      fila.ORGANIZADOR_BUENO?.toLowerCase() === emailUsuario ||
      fila.INVITADO_BUENO?.toLowerCase().includes(emailUsuario)
  );

  return (
    <section className="min-h-screen bg-gray-50 p-4 md:p-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">
        Página de Reuniones
      </h1>

      {/* BOTÓN */}
      <Link
        to="/calendario"
        className="
          inline-flex items-center gap-2
          rounded-lg
          bg-blue-100
          px-5 py-2.5
          text-blue-700 font-medium
          border border-blue-200
          hover:bg-blue-200
          transition
        "
      >
        📅 Agendar una reunión
      </Link>

      <h2 className="text-2xl font-semibold mt-8 mb-6">
        Reuniones de Lázaro
      </h2>

      {/* TABLA */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Duración (min)</th>
              <th className="px-4 py-3">Organizador</th>
              <th className="px-4 py-3">Invitados</th>
              <th className="px-4 py-3">Link</th>
            </tr>
          </thead>

          <tbody>
            {datosFiltrados.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No hay reuniones
                </td>
              </tr>
            ) : (
              datosFiltrados.map((fila, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-3">
                    {fila.FECHA_BUENA}
                  </td>
                  <td className="px-4 py-3">
                    {fila.TIEMPO_BUENO}
                  </td>
                  <td className="px-4 py-3">
                    {fila.ORGANIZADOR_BUENO}
                  </td>
                  <td className="px-4 py-3">
                    {fila.INVITADO_BUENO}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={fila.LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Abrir
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
