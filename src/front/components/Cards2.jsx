import { Link } from "react-router-dom";


export default function Cards2({ titulo, detalle, img, to, grafico }) {
    return (
        <Link to={to} className="h-full">
            <div className="bg-white border border-gray-300 w-full h-full min-h-[300px] p-4 rounded-xl shadow-xs cursor-pointer flex flex-col">
                <h5 className="mt-4 mb-4 text-xl md:text-2xl font-semibold tracking-tight">
                    {titulo}
                </h5>


                <div className="flex-1 mb-4">{grafico}</div>


                {img && <img className="rounded-base" src={img} alt="" />}


                <p className="text-gray-600">{detalle}</p>
            </div>
        </Link>
    );
}