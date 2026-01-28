import { Link } from 'react-router-dom';
export default function Cards({ to, titulo, icon, total, detalle }) {
  return (
    <Link 
      to={to} 
      className="block bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        {icon && <div className="text-gray-800">{icon}</div>}
        {total && (
          <span className="text-2xl font-bold text-gray-900">
            {total}
          </span>
        )}
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {titulo}
        </h3>
        {detalle && (
          <p className="text-sm text-gray-600">
            {detalle}
          </p>
        )}
      </div>
    </Link>
  );
}