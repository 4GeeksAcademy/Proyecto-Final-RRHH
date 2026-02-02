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
          throw new Error(
            `Error ${response.status}: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Reuniones recibidas:", data);
        const link = data.reuniones.link

        // 🔥 ADAPTADOR BACKEND → FRONTEND
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

  // 🟢 MISMA LÓGICA QUE SHEETBEST
  const datosFiltrados = datos.filter(
    (fila) =>
      fila.ORGANIZADOR_BUENO?.toLowerCase() === emailUsuario ||
      fila.INVITADO_BUENO?.toLowerCase().includes(emailUsuario)
  );

  return (
    <section>
      <h1 className="text-3xl mb-4 text-black">
        Página de Reuniones
      </h1>

      <Link
        to="/calendario"
        className="
          inline-flex items-center gap-2
          rounded-xl
          bg-gradient-to-r from-blue-600 to-indigo-600
          px-6 py-3
          text-white font-semibold
          shadow-lg shadow-blue-500/30
          transition-all duration-300
          hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40
          active:scale-95
        "
      >
        📅 Agendar una reunión
      </Link>

      <h1
        className="
          text-4xl mb-6 mt-6 font-bold
          text-gray-900
          transition-all duration-300
          hover:text-blue-500
        "
      >
        Reuniones de Lázaro
      </h1>

      <table className="w-full text-sm rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
          <tr>
            <th className="p-3 text-left">FECHA</th>
            <th className="p-3 text-left">Tiempo (min)</th>
            <th className="p-3 text-left">Organizador</th>
            <th className="p-3 text-left">Invitados</th>
            <th className="p-3 text-left">link</th>
          </tr>
        </thead>

        <tbody>
          {datosFiltrados.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="p-4 text-center text-gray-500"
              >
                No hay reuniones
              </td>
            </tr>
          ) : (
            datosFiltrados.map((fila, i) => (
              <tr
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition-colors`}
              >
                <td className="p-3">{fila.FECHA_BUENA}</td>
                <td className="p-3">{fila.TIEMPO_BUENO}</td>
                <td className="p-3">{fila.INVITADO_BUENO}</td>
                <td className="p-3">{fila.ORGANIZADOR_BUENO}</td>
                <td className="p-3">{fila.INVITADO_BUENO}</td>
                <td className="p-3">{fila.LINK}</td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}


























/*export default function Reuniones() {
  
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch("https://api.sheetbest.com/sheets/e953b3bf-6eb2-424a-93b9-9e272aab7e92")
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos:", data);
        setDatos(data);
      })
      .catch((err) => console.error("Error al bajar datos:", err));
  }, []);

  const datosFiltrados = datos.filter(
    fila =>
      fila.EMAIL_ORGANIZADOR?.toLowerCase() === "fillaux33@gmail.com" ||
      fila.EMAIL_INVITADO?.toLowerCase() === "fillaux33@gmail.com"
  );
  return (
    <section className="">
      <h1 className="text-3xl mb-4 text-black">
        Página de Reuniones
      </h1>
      <Link
        to="/calendario"
        className="
    inline-flex items-center gap-2
    rounded-xl
    bg-gradient-to-r from-blue-600 to-indigo-600
    px-6 py-3
    text-white font-semibold
    shadow-lg shadow-blue-500/30
    transition-all duration-300
    hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    active:scale-95
  "
      >
        📅 Agendar una reunión
      </Link>
      <h1
        className="
    text-4xl mb-6 font-bold
    text-gray-900
    animate-fadeInGlow
    transition-all duration-300
    hover:text-blue-500
    hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]
  "
      >
        Reuniones de Lázaro
      </h1>

      <table className="w-full text-sm rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
          <tr>
            <th className="p-3 text-left">FECHA</th>
            <th className="p-3 text-left">Tiempo Reunión "minutos"</th>
            <th className="p-3 text-left">Email del organizador</th>
            <th className="p-3 text-left">Email del invitado</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((fila, i) => (
            <tr
              key={i}
              className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}
            >
              <td className="p-3">{fila.FECHA_BUENA}</td>
              <td className="p-3">{fila.TIEMPO_BUENO}</td>
              <td className="p-3">{fila.ORGANIZADOR_BUENO}</td>
              <td className="p-3">{fila.INVITADO_BUENO}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>




  );
}
*/


