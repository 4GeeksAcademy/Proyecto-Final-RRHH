export default function GraficoTrabajo({ data, totalHoras }) {
  // 🔒 Seguridad: valores por defecto reales
  const safeData = Array.isArray(data)
    ? data
    : [
        { day: "L", hours: 0 },
        { day: "M", hours: 0 },
        { day: "X", hours: 0 },
        { day: "J", hours: 0 },
        { day: "V", hours: 0 },
      ];

  const safeTotalHoras =
    typeof totalHoras === "number" && !isNaN(totalHoras)
      ? totalHoras
      : 0;

  return (
    <div className="w-full h-full min-h-[320px] rounded-xl shadow p-4 md:p-6 bg-white">

      {/* Header */}
      <div className="flex justify-between mb-4 md:mb-6 items-center">
        <div>
          <h5 className="text-2xl font-bold text-heading">
            {safeTotalHoras.toFixed(1)} hrs
          </h5>
          <p className="text-body">Horas trabajadas (L–V)</p>
        </div>

        <span className="text-sm font-medium text-green-600">
          Jornada activa
        </span>
      </div>

      {/* Gráfica */}
      <div className="py-4 md:py-6">
        <div className="flex items-end justify-between h-40 gap-2">

          {safeData.map((item) => {
            const horas = Number(item.hours) || 0;

            let color = "bg-blue-500";
            if (horas === 0) color = "bg-red-400";
            else if (horas >= 8) color = "bg-green-500";
            else color = "bg-yellow-400";

            return (
              <div
                key={item.day}
                className="flex flex-col items-center w-full"
              >
                <div className="w-full h-full flex items-end">
                  <div
                    className={`${color} w-full rounded-t-md transition-all duration-300`}
                    style={{
                      height: `${Math.min((horas / 8) * 100, 100)}%`,
                    }}
                  />
                </div>

                <span className="mt-2 text-sm text-gray-600">
                  {item.day}
                </span>
                <span className="text-xs text-gray-500">
                  {horas}h
                </span>
              </div>
            );
          })}

        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 md:pt-6 flex justify-between text-sm text-gray-500">
        <span>Horario: 8h/día</span>
        <span>Semana actual</span>

        <a
          href="#"
          className="inline-flex items-center text-fg-brand bg-transparent border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium rounded-base text-sm px-3 py-2 focus:outline-none"
        >
          Informe de Progresos
          <svg
            className="w-4 h-4 ms-1.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </a>
      </div>

    </div>
  );
}