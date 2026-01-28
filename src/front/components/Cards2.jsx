import React from 'react';
import { Link } from 'react-router-dom';
export default function Cards2({ to, titulo, detalle, grafico }) {
  return (
    <Link 
      to={to} 
      className="block bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {titulo}
          </h3>
          {detalle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {detalle}
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-4">
        {grafico}
      </div>
    </Link>
  );
}