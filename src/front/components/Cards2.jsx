import { Link } from "react-router-dom";


export default function Cards2({ titulo, detalle, img, to, grafico }) {
    return (
        <Link to={to} className="h-full">
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 w-full h-full min-h-[300px] p-4 rounded-xl shadow-xs dark:shadow-lg cursor-pointer flex flex-col hover:shadow-lg dark:hover:shadow-xl transition-shadow">
                <h5 className="mt-4 mb-4 text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {titulo}
                </h5>


                <div className="flex-1 mb-4">{grafico}</div>


                {img && <img className="rounded-base" src={img} alt="" />}


                <p className="text-gray-600 dark:text-gray-400">{detalle}</p>
            </div>
        </Link>
    );
}