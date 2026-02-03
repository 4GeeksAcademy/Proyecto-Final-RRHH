import Cards from "../components/Cards";
import Cards2 from "../components/Cards2";
import GraficoTrabajo from "../components/GraficoTrabajo";
import GraficoTareas from "../components/GraficoTareas";
import TemporizadorFichaje from "../components/Temporizador";
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const token = localStorage.getItem("jwt-token");

  const refrescarFichajes = async () => {
    console.log("Refrescar fichajes desde Dashboard");
  };

  const [tareasActivas, setTareasActivas] = useState(0);
  const [tareasCompletadas, setTareasCompletadas] = useState(0);
  const [tareasHecho, setTareasHecho] = useState(0);
  const [tareasProgreso, setTareasProgreso] = useState(0);
  const [tareasPorHacer, setTareasPorHacer] = useState(0);
  const [loadingTareas, setLoadingTareas] = useState(true);
  const [horasSemana, setHorasSemana] = useState([]);
  const [totalHoras, setTotalHoras] = useState(0);

  useEffect(() => {
    const cargarTareasDashboard = async () => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://supreme-space-dollop-4qjpwxgwxwr2g65-3001.app.github.dev";
      try {
        const response = await fetch(`${backendUrl}/api/proyectos`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) return;
        const data = await response.json();
        const todasLasTareas = data.proyectos.flatMap(p => p.tareas || []);
        const hecho = todasLasTareas.filter(t => t.estado === "Finalizado").length;
        const progreso = todasLasTareas.filter(t => t.estado === "En Proceso").length;
        const porHacer = todasLasTareas.filter(t => t.estado === "Pendiente").length;

        setTareasActivas(progreso + porHacer);
        setTareasCompletadas(hecho);
        setTareasHecho(hecho);
        setTareasProgreso(progreso);
        setTareasPorHacer(porHacer);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      } finally {
        setLoadingTareas(false);
      }
    };
    cargarTareasDashboard();
  }, [token]);

  useEffect(() => {
    const cargarFichajesDashboard = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/mis-fichajes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        const horasPorDia = calcularHorasPorDia(data.fichajes);
        setHorasSemana(horasPorDia);
        setTotalHoras(horasPorDia.reduce((acc, d) => acc + d.hours, 0));
      } catch (e) { console.error(e); }
    };
    cargarFichajesDashboard();
  }, [token]);

  const calcularHorasPorDia = (fichajes) => {
    const diasSemana = ["L", "M", "X", "J", "V"];
    const resultado = { L: 0, M: 0, X: 0, J: 0, V: 0 };
    fichajes.forEach((f) => {
      if (!f.hora_entrada || !f.hora_salida) return;
      const entrada = new Date(f.hora_entrada);
      const salida = new Date(f.hora_salida);
      const horas = (salida - entrada) / (1000 * 60 * 60);
      const dia = entrada.getDay();
      const letra = diasSemana[dia - 1];
      if (letra) resultado[letra] += horas;
    });
    return Object.entries(resultado).map(([day, hours]) => ({
      day,
      hours: Math.round(hours * 100) / 100,
    }));
  };

  return (
    /* CAMBIO CLAVE: min-h-screen y bg-gray-50/bg-gray-900 */
    <section className="p-6 min-h-screen bg-gray-50 transition-colors duration-300">
      <h1 className="text-3xl mb-4 font-bold text-gray-900">Panel de Control</h1>
      <p className="mb-6 text-gray-600">Vista general de tu actividad</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
        <Cards
          titulo="Tiempo Trabajado"
          tiempo={<TemporizadorFichaje token={token} refrescarFichajes={refrescarFichajes} />}
        />

        <Cards to="/tareas"
          titulo="Proyectos Activos"
          icon={<svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 1 0-18c1.052 0 2.062.18 3 .512M7 9.577l3.923 3.923 8.5-8.5M17 14v6m-3-3h6" /></svg>}
          total={loadingTareas ? "..." : tareasActivas}
          detalle={`${tareasCompletadas} completados`}
        />

        <Cards to="/reuniones"
          titulo="Reuniones Próximas"
          icon={<svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          total={1}
          detalle="Esta semana"
        />

        <Cards to="/fichaje"
          titulo="Estado Fichaje"
          icon={<svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
          total="Inactivo"
          detalle="Sin fichaje activo"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full mt-8 items-stretch">
        <Cards2
          titulo="Horas Trabajadas - Esta Semana"
          grafico={<GraficoTrabajo data={horasSemana} totalHoras={totalHoras} />}
        />
        <Cards2
          to="/tareas"
          titulo="Estado de Tareas"
          grafico={<GraficoTareas hecho={tareasHecho} progreso={tareasProgreso} porHacer={tareasPorHacer} />}
        />
      </div>
    </section>
  );
}
