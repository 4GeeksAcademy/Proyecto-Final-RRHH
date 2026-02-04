import React from "react";

export default function GraficoTareas({ hecho = 0, progreso = 0, porHacer = 0 }) {
  return (
    <div className="w-full h-full rounded-xl shadow p-4 md:p-6">
      <div className="bg-neutral-secondary-medium p-3 rounded-base">
        <div className="grid grid-cols-3 gap-3 mb-3">
          <dl className="bg-green-100 border border-green-200 text-green-800 rounded-lg flex flex-col items-center justify-center h-[78px]">
            <dt className="w-8 h-8 rounded-full bg-green-300 text-green-900 text-sm font-medium flex items-center justify-center mb-1">{hecho}</dt>
            <dd className="text-green-800 text-sm font-medium">Hecho</dd>
          </dl>
          <dl className="bg-yellow-100 border border-yellow-200 text-yellow-800 rounded-lg flex flex-col items-center justify-center h-[78px]">
            <dt className="w-8 h-8 rounded-full bg-yellow-300 text-yellow-900 text-sm font-medium flex items-center justify-center mb-1">{progreso}</dt>
            <dd className="text-yellow-800 text-sm font-medium">En progreso</dd>
          </dl>
          <dl className="bg-red-50 border border-red-200 text-red-800 rounded-lg flex flex-col items-center justify-center h-[78px]">
            <dt className="w-8 h-8 rounded-full bg-red-400 text-red-900 text-sm font-medium flex items-center justify-center mb-1">{porHacer}</dt>
            <dd className="text-red-800 text-sm font-medium">Por hacer</dd>
          </dl>
        </div>
      </div>

      <div className="py-6" id="radial-chart"></div>

      <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
        <div className="text-gray-600 text-sm font-medium">
          <span className="inline-flex items-center text-blue-600 font-medium text-sm px-3 py-2">
            Informe de Progresos
            <svg className="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org" fill="none" viewBox="0 0 24 24">
              <path 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 12H5m14 0-4 4m4-4-4-4" 
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
