import { Link } from "react-router-dom";

export default function Cards({ titulo, icon, total, detalle, to, tiempo }) {
    return (
        <Link to={to}>
            <div className="bg-white border border-gray-300 w-full h-[220px] p-4 rounded-xl shadow flex flex-col justify-between">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-black">{titulo}</p>
                    {icon}

                </div>
                <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{total}</h5>
                <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{tiempo}</h5>
                <p className="mt-4 text-gray-600">{detalle}</p>

            </div>
        </Link>



    )
}

