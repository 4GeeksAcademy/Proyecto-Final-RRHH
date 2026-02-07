import { Link } from "react-router-dom";


export default function Cards({ titulo, icon, total, detalle, to, tiempo }) {
    return (
        <Link to={to}>
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 w-full min-h-[200px] p-4 rounded-xl shadow dark:shadow-lg flex flex-col justify-between hover:shadow-lg dark:hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-black dark:text-white">{titulo}</p>
                    {icon}
                </div>


                {total && (
                    <h5 className="text-2xl font-semibold tracking-tight leading-8 text-gray-900 dark:text-white">
                        {total}
                    </h5>
                )}


                {tiempo && (
                    <h5 className="text-2xl font-semibold tracking-tight leading-8 text-gray-900 dark:text-white">
                        {tiempo}
                    </h5>
                )}


                <p className="mt-2 text-gray-600 dark:text-gray-400">{detalle}</p>
            </div>
        </Link>
    );
}