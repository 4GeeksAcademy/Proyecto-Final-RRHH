

export default function GraficoTrabajo() {
    return (
        <div className="max-w-sm w-full  rounded-xl shadow p-4 md:p-6">

            {/* Header */}
            <div className="flex justify-between mb-4 md:mb-6 items-center">
                <div>
                    <h5 className="text-2xl font-bold text-heading">37 hrs</h5>
                    <p className="text-body">Horas trabajadas (L–V)</p>
                </div>

                <span className="text-sm font-medium text-green-600">
                    Jornada activa
                </span>
            </div>

            {/* Gráfica */}
            <div className="py-4 md:py-6">
                <div className="flex items-end justify-between h-40 gap-2">

                    {[
                        { day: "L", hours: 8 },
                        { day: "M", hours: 6 },
                        { day: "X", hours: 0 },
                        { day: "J", hours: 7 },
                        { day: "V", hours: 8 },
                    ].map((item) => {
                        let color = "bg-blue-500";

                        if (item.hours === 0) color = "bg-red-400";
                        else if (item.hours === 8) color = "bg-green-500";
                        else if (item.hours < 8) color = "bg-yellow-400";

                        return (
                            <div key={item.day} className="flex flex-col items-center w-full">
                                <div className="w-full h-full flex items-end">
                                    <div
                                        className={`${color} w-full rounded-t-md transition-all duration-300`}
                                        style={{ height: `${(item.hours / 8) * 100}%` }}
                                    ></div>
                                </div>

                                <span className="mt-2 text-sm text-gray-600">{item.day}</span>
                                <span className="text-xs text-gray-500">{item.hours}h</span>
                            </div>
                        );
                    })}

                </div>
            </div>

            {/* Footer */}
            <div className="  pt-4 md:pt-6 flex justify-between text-sm text-gray-500">
                <span>Horario: 8h/día</span>
                <span>Semana actual</span>
                <a href="#" className="inline-flex items-center text-fg-brand bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none">
                    Informe de Progresos
                    <svg className="w-4 h-4 ms-1.5 -me-0.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" /></svg>
                </a>
            </div>

        </div>
    )
}