import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div
        className="
          bg-white 
          w-full 
          max-w-sm 
          sm:max-w-md 
          md:max-w-lg
          p-6 
          sm:p-8 
          rounded-2xl 
          shadow-md 
          text-center
        "
      >
        <h1
          className="
            text-2xl 
            sm:text-3xl 
            md:text-4xl 
            font-bold 
            text-gray-900 
            mb-3
          "
        >
          Panel de Gestión
        </h1>

        <p
          className="
            text-gray-500 
            text-sm 
            sm:text-base 
            mb-8
          "
        >
          Inicia sesión para continuar
        </p>

        <button
          onClick={() => navigate("/login")}
          className="
            w-full 
            py-3 
            sm:py-4
            bg-blue-600 
            text-white 
            rounded-xl 
            font-medium 
            text-sm 
            sm:text-base
            hover:bg-blue-700 
            transition-colors
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-400
          "
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}
