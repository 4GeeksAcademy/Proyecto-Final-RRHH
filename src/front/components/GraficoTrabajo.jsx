import React, { useState, useEffect } from 'react';

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2 text-xs text-gray-600">
    <span className={`${color} inline-block w-4 h-3 rounded-sm border border-neutral-200`} />
    <span>{label}</span>
  </div>
);

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

  // Animación: hacemos aparecer las barras después del montaje
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(id);
  }, []);

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
        {/* Leyenda de niveles (umbrales ajustados) */}
        <div className="flex items-center gap-3 mb-3">
          <LegendItem color="bg-red-500" label="0 h" />
          <LegendItem color="bg-red-300" label="Muy bajo (0-1h)" />
          <LegendItem color="bg-orange-400" label="Bajo (1-3h)" />
          <LegendItem color="bg-yellow-400" label="Medio (3-5h)" />
          <LegendItem color="bg-lime-400" label="Alto (5-7h)" />
          <LegendItem color="bg-green-600" label="Óptimo (>=7h)" />
        </div>

        <div className="flex items-end justify-between h-40 gap-2">
          {/* Estilos para animación nudge: usa la variable --offset para mover cada barra */}
          <style>{`@keyframes nudge { 0% { transform: translateY(0); } 50% { transform: translateY(var(--offset)); } 100% { transform: translateY(0); } }`}</style>

          {safeData.map((item, idx) => {
            const horas = Number(item.hours) || 0;

            const getColor = (h) => {
              if (h === 0) return "bg-red-500"; // sin horas
              if (h > 0 && h < 1) return "bg-red-300"; // muy bajo
              if (h >= 1 && h < 3) return "bg-orange-400"; // bajo
              if (h >= 3 && h < 5) return "bg-yellow-400"; // medio
              if (h >= 5 && h < 7) return "bg-lime-400"; // alto
              return "bg-green-600"; // >=7 óptimo
            };

            const color = getColor(horas);

            // altura relativa respecto a 8 horas (100% = 8h)
            const targetHeight = Math.min((horas / 8) * 100, 100);
            const heightPct = mounted ? targetHeight : 0;

            // animación con efecto escalonado
            const transition = `height 700ms cubic-bezier(.22,.9,.32,1) ${idx * 90}ms, opacity 400ms ${idx * 90}ms`;

            // nudge: desplazamiento vertical según horas (negativo -> sube, positivo -> baja)
            const maxOffset = 10; // px
            const offsetPx = Math.round(((horas / 8) - 0.5) * (maxOffset * 2));
            const duration = 2200 + idx * 80; // ms
            const animationStyle = mounted
              ? { animation: `nudge ${duration}ms ease-in-out ${idx * 90}ms infinite` }
              : { animation: 'none' };

            return (
              <div
                key={item.day}
                className="flex flex-col items-center w-full"
              >
                <div className="w-full h-full flex items-end bg-neutral-100 rounded-md overflow-hidden relative">
                  <div
                    role="img"
                    aria-label={`${item.day} ${horas} horas`}
                    title={`${horas} horas`}
                    className={`${color} w-full rounded-t-md flex items-end justify-center`}
                    style={{
                      height: `${heightPct}%`,
                      transition,
                      opacity: mounted ? 1 : 0.85,
                      transformOrigin: 'bottom',
                      // nudge vars
                      ['--offset']: `${offsetPx}px`,
                      ...animationStyle
                    }}
                  >
                    {/* Mostrar horas dentro de la barra si es suficientemente alta */}
                    {targetHeight > 25 && (
                      <span className="text-xs text-gray-900 px-1 py-0.5">{horas}h</span>
                    )}
                  </div>
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