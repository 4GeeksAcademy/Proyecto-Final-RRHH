import Cards from "../components/Cards";
import Cards2 from "../components/Cards2";
import GraficoTrabajo from "../components/GraficoTrabajo";
import GraficoTareas from "../components/GraficoTareas";
import TemporizadorFichaje from "../components/Temporizador";

export default function Dashboard() {
  return (
    <section className="">
      <h1 className="text-3xl mb-4 text-black">
        Panel de Control
      </h1>
      <p className="mb-6">Vista general de tu actividad</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
        <Cards 
          titulo="Tiempo Trabajado"
          tiempo={<TemporizadorFichaje/>}
          detalle=""

        />
        <Cards to="/tareas"
          titulo="Tareas Activas"
          icon={<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 1 0-18c1.052 0 2.062.18 3 .512M7 9.577l3.923 3.923 8.5-8.5M17 14v6m-3-3h6" />
          </svg>}
          total={3}
          detalle="0 completadas"

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
          total="Inactivo"
          detalle="Sin fichaje activo"

        />

      </div>

      <div className="grid grid-cols-6 md:grid-cols-2 gap-6 w-full mt-8 items-stretch">
        <Cards2
          to=""
          titulo="Horas Trabajadas - Esta Semana"
          detalle=""
          grafico={<GraficoTrabajo />}
        />

        <Cards2
          to=""
          titulo="Estado de Tareas"
          detalle=""
          grafico={<GraficoTareas />}
        />
        

      </div>



    </section>
  );
}