import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100">
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
          shadow-lg 
          text-center
          transition-transform
          hover:scale-[1.01]
        "
      >
        {/* Header */}
        <div className="mb-6">
          <h1
            className="
              text-2xl 
              sm:text-3xl 
              md:text-4xl 
              font-bold 
              text-gray-900 
              mb-2
            "
          >
            Panel de Gestión
          </h1>

          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-4" />

          <p
            className="
              text-gray-500 
              text-sm 
              sm:text-base
            "
          >
            Accede a tu área privada para gestionar tu trabajo
          </p>
        </div>

        {/* Botón */}
        <button
          onClick={() => navigate("/login")}
          className="
            w-full 
            py-3 
            sm:py-4
            bg-blue-600 
            text-white 
            rounded-xl 
            font-semibold 
            text-sm 
            sm:text-base
            hover:bg-blue-700 
            active:scale-[0.98]
            transition-all
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-400
          "
        >
          Iniciar Sesión
        </button>

        {/* Footer pequeño */}
        <p className="mt-6 text-xs text-gray-400">
          © 2026 Portal Trabajo
        </p>
      </div>
    </div>
  );
}
