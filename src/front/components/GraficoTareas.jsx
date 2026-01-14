import React from "react"


export default function GraficoTareas() {
    return (
        <div className="max-w-sm w-full  rounded-xl shadow p-4 md:p-6">
            <div className="flex justify-between mb-4 md:mb-6 items-center">
                <div className="text-xl font-semibold text-gray-900">
                </div>
            </div>

            <div className="bg-neutral-secondary-medium  p-3 rounded-base">
                <div className="grid grid-cols-3 gap-3 mb-3">
                    <dl className="bg-green-100 border border-green-200 text-green-800 rounded-lg flex flex-col items-center justify-center h-[78px]">
                        <dt className="w-8 h-8 rounded-full bg-green-300 text-green-900 text-sm font-medium flex items-center justify-center mb-1">12</dt>
                        <dd className="text-green-800 text-sm font-medium">Hecho</dd>
                    </dl>
                    <dl className="bg-yellow-100 border border-yellow-200 text-yellow-800 rounded-lg flex flex-col items-center justify-center h-[78px]">
                        <dt className="w-8 h-8 rounded-full bg-yellow-300 text-yellow-900 text-sm font-medium flex items-center justify-center mb-1">23</dt>
                        <dd className="text-yellow-800 text-sm font-medium">En progreso</dd>
                    </dl>
                    <dl className="bg-red-50 border border-red-200 text-red-800 rounded-lg flex flex-col items-center justify-center h-[78px]">
                        <dt className="w-8 h-8 rounded-full bg-red-400 text-red-900 text-sm font-medium flex items-center justify-center mb-1">64</dt>
                        <dd className="text-red-800 text-sm font-medium">Por hacer</dd>
                    </dl>
                </div>
                
            </div>


            <div className="py-6" id="radial-chart"></div>

            <div className="gborder-t border-gray-200 pt-4 flex justify-between items-center">
                <div className="text-gray-600 text-sm font-medium">

                    
                    <a href="#" className="inline-flex items-center text-fg-brand bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none">
                        Informe de Progresos
                        <svg className="w-4 h-4 ms-1.5 -me-0.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" /></svg>
                    </a>
                </div>
            </div>

        </div>
    )
}