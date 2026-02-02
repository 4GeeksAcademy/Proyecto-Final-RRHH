import { Link } from 'react-router-dom';

export default function Cards2({ to, titulo, detalle, grafico }) {
  const content = (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{titulo}</h3>
        {detalle && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{detalle}</p>}
      </div>
      <div className="w-full">
        {grafico}
      </div>
    </div>
  );

  return to ? <Link to={to} className="block h-full">{content}</Link> : <div className="h-full">{content}</div>;
}
