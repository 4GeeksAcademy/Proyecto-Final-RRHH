import Cards from "../components/Cards";
import Cards2 from "../components/Cards2";
import GraficoTrabajo from "../components/GraficoTrabajo";
import GraficoTareas from "../components/GraficoTareas";
import TemporizadorFichaje from "../components/Temporizador";
import { useState, useEffect } from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer";


export default function Dashboard() {
  const token = localStorage.getItem("jwt-token");

  // Refrescar lista de fichajes y estado activo
  const [fichajeActivo, setFichajeActivo] = useState(null);
  const [elapsedSegundos, setElapsedSegundos] = useState(0);

  const refrescarFichajes = async () => {
    await cargarFichajesDashboard();
  };



  // todos los states
  const { store } = useGlobalReducer();
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
      const token = localStorage.getItem("jwt-token");
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

        // Actualizar todos los estados
        setTareasActivas(progreso + porHacer); // Activas = En Proceso + Pendiente
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
  }, []);

  const calcularHorasPorDia = (fichajes) => {
    const diasSemana = ["L", "M", "X", "J", "V"];
    const resultado = {
      L: 0,
      M: 0,
      X: 0,
      J: 0,
      V: 0,
    };

    fichajes.forEach((f) => {
      if (!f.hora_entrada || !f.hora_salida) return;

      const entrada = new Date(f.hora_entrada);
      const salida = new Date(f.hora_salida);

      const horas = (salida - entrada) / (1000 * 60 * 60);

      const dia = entrada.getDay(); // 1=Lunes ... 5=Viernes
      const letra = diasSemana[dia - 1];

      if (letra) resultado[letra] += horas;
    });

    return Object.entries(resultado).map(([day, hours]) => ({
      day,
      hours: Math.round(hours * 100) / 100,
    }));
  };

  const cargarFichajesDashboard = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/mis-fichajes",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) return;

      const data = await res.json();

      const horasPorDia = calcularHorasPorDia(data.fichajes);
      setHorasSemana(horasPorDia);

      const total = horasPorDia.reduce((acc, d) => acc + d.hours, 0);
      setTotalHoras(total);

      // Detectar fichaje activo (sin hora_salida)
      const activo = data.fichajes.find((f) => !f.hora_salida) || null;
      setFichajeActivo(activo);

      if (activo && activo.hora_entrada) {
        const inicioMs = new Date(activo.hora_entrada).getTime();
        setElapsedSegundos(Math.floor((Date.now() - inicioMs) / 1000));
      } else {
        setElapsedSegundos(0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    cargarFichajesDashboard();
  }, []);

  // Actualizar contador de segundos si hay fichaje activo
  useEffect(() => {
    let id;
    if (fichajeActivo && fichajeActivo.hora_entrada) {
      id = setInterval(() => {
        const inicio = new Date(fichajeActivo.hora_entrada).getTime();
        setElapsedSegundos(Math.floor((Date.now() - inicio) / 1000));
      }, 1000);
    } else {
      setElapsedSegundos(0);
    }

    return () => clearInterval(id);
  }, [fichajeActivo]);


  return (
    <section>
      <h1 className="text-3xl mb-4 text-black">Panel de Control</h1>
      <p className="mb-6">Vista general de tu actividad</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
        <Cards
          titulo="Tiempo Trabajado"
          tiempo={
            <TemporizadorFichaje
              token={token}
              refrescarFichajes={refrescarFichajes}
            />
          }
          detalle=""
        />

        <Cards to="/tareas"
          titulo="Proyectos Activos"
          icon={<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 1 0-18c1.052 0 2.062.18 3 .512M7 9.577l3.923 3.923 8.5-8.5M17 14v6m-3-3h6" />
          </svg>}
          total={loadingTareas ? "..." : tareasActivas}
          detalle={`${tareasCompletadas} completados`}
        />

        <Cards to="/reuniones"
          titulo="Reuniones Proximas"
          icon={<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
          </svg>}
          total={1}
          detalle="Esta semana"
        />

        <Cards to="/fichaje"
          titulo="Estado Fichaje"
          icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>}
          total={
            fichajeActivo ? (
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
                Activo
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
                Inactivo
              </span>
            )
          }
          detalle={
            fichajeActivo ? `Iniciado: ${new Date(fichajeActivo.hora_entrada).toLocaleString()} · ${new Date(elapsedSegundos * 1000).toISOString().substr(11, 8)}` : "Sin fichaje activo"
          }
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full mt-8 items-stretch">
        <Cards2
          titulo="Horas Trabajadas - Esta Semana"
          grafico={
            <GraficoTrabajo data={horasSemana} totalHoras={totalHoras}
            />
          }
        />


        <Cards2
          to="/tareas"
          titulo="Estado de Tareas"
          detalle=""
          grafico={<GraficoTareas hecho={store.tareasResumen?.hecho || 0} progreso={store.tareasResumen?.progreso || 0} porHacer={store.tareasResumen?.porHacer || 0} />}
        />
      </div>
    </section>
  );
}