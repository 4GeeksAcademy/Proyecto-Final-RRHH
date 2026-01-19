import { Link } from "react-router-dom";



export default function Cards2({ titulo, icon, total, detalle, img, to, grafico }) {
    return (
        <Link to={to} className="h-full">
            <div className="bg-white border border-gray-300 w-full h-full p-4 rounded-xl shadow-xs cursor-pointer flex flex-col">

                <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">{titulo}</h5>
                <div className="mb-4">
                    {grafico}
                </div>
                <img className="rounded-base" src={img} alt="" />

                <p className="mb-6 text-body">{detalle}</p>

            </div>
        </Link>



    )
}
