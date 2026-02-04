import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function Resetear() {

    const [contraseña, setContraseña] = useState("");
    const [repite, setRepite] = useState("");
    const [params] = useSearchParams();

    function restaurarContraseña() {
        if(contraseña !== repite) {
            alert("Las contraseñas no coinciden");
            return
        }

        let token = params.get('token')

        fetch(import.meta.env.VITE_BACKEND_URL + '/change-password', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({contraseña: contraseña})
        })
        .then(resp => resp.json())
        .then(data => {
            if(data && data.success) {
                alert("Contraseña cambiada correctamente")
            }else {
                alert("Hubo un error cambiando la contraseña")
            }
        })
        .catch(error => console.log(error))
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Restaura tu Contraseña
        </h1>

        <form className="space-y-5">
          {/* Email */}
          <div>
            <input
              type="password"
              required
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Contraseña"
              className="
                w-full px-4 py-3
                rounded-lg
                border border-gray-300
                bg-white text-gray-800
                placeholder-gray-400
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-blue-500
              "
            />
          </div>
          <div>
            <input
              type="password"
              required
              onChange={(e) => setRepite(e.target.value)}
              placeholder="Confirmar Contraseña"
              className="
                w-full px-4 py-3
                rounded-lg
                border border-gray-300
                bg-white text-gray-800
                placeholder-gray-400
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-blue-500
              "
            />
          </div>
          {/* Button */}
          <button
            type="button"
            className="
              w-full py-3
              rounded-lg
              bg-blue-600
              text-white
              font-medium
              hover:bg-blue-700
              transition
            "
            onClick={restaurarContraseña}
          >
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
