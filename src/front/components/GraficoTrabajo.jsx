export default function GraficoTrabajo({ data, totalHoras }) {
  const safeData = Array.isArray(data) ? data : [
    { day: "L", hours: 0 }, { day: "M", hours: 0 }, { day: "X", hours: 0 },
    { day: "J", hours: 0 }, { day: "V", hours: 0 },
  ];

  const safeTotalHoras = typeof totalHoras === "number" && !isNaN(totalHoras) ? totalHoras : 0;

  return (
    /* 1. Fondo del contenedor: bg-white -> bg-gray-800 */
    /* 2. Sombra y borde: shadow -> border-gray-700 */
    <div className="w-full h-full min-h-[320px] rounded-xl shadow p-4 md:p-6 bg-white bg-gray-800 border border-transparent border-gray-700">

      {/* Header */}
      <div className="flex justify-between mb-4 md:mb-6 items-center">
        <div>
          {/* Texto principal: text-heading -> text-white */}
          <h5 className="text-2xl font-bold text-gray-900 text-white">
            {safeTotalHoras.toFixed(1)} hrs
          </h5>
          {/* Subtexto: text-body -> text-gray-400 */}
          <p className="text-gray-600 text-gray-400">Horas trabajadas (L–V)</p>
        </div>

        <span className="text-sm font-medium text-green-600 text-green-400">
          Jornada activa
        </span>
      </div>

      {/* Gráfica */}
      <div className="py-4 md:py-6">
        <div className="flex items-end justify-between h-40 gap-2">
          {safeData.map((item) => {
            const horas = Number(item.hours) || 0;
            let color = "bg-blue-500 bg-blue-600";
            if (horas === 0) color = "bg-red-400 bg-red-900/50";
            else if (horas >= 8) color = "bg-green-500 bg-green-600";
            else color = "bg-yellow-400 bg-yellow-600";

            return (
              <div key={item.day} className="flex flex-col items-center w-full">
                <div className="w-full h-full flex items-end">
                  <div
                    className={`${color} w-full rounded-t-md transition-all duration-300`}
                    style={{ height: `${Math.min((horas / 8) * 100, 100)}%` }}
                  />
                </div>
                {/* Etiquetas de días y horas: text-gray-600 -> text-gray-300 */}
                <span className="mt-2 text-sm text-gray-600 text-gray-300">
                  {item.day}
                </span>
                <span className="text-xs text-gray-500 text-gray-500">
                  {horas}h
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 md:pt-6 flex justify-between text-sm text-gray-500 text-gray-400 border-t border-gray-100 border-gray-700">
        <span>Horario: 8h/día</span>
        <a
          href="#"
          className="inline-flex items-center text-blue-600 text-blue-400 hover:underline"
        >
          Informe de Progresos
          <svg className="w-4 h-4 ms-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
          </svg>
        </a>
      </div>
    </div>
  );
}
