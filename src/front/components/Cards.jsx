import { Link } from 'react-router-dom';

export default function Cards({ to, titulo, icon, total, detalle, tiempo }) {
  const content = (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all h-full">
      <div className="flex items-center justify-between mb-4">
        {icon && <div className="text-gray-800">{icon}</div>}
        {total !== undefined && (
          <span className="text-2xl font-bold text-gray-900">{total}</span>
        )}
        {tiempo && <div className="text-gray-900 font-mono">{tiempo}</div>}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{titulo}</h3>
        {detalle && <p className="text-sm text-gray-600">{detalle}</p>}
      </div>
    </div>
  );

  return to ? <Link to={to} className="block h-full">{content}</Link> : <div className="h-full">{content}</div>;
}
