import { useState } from "react";

export default function Olvidar() {
    const [correo, setCorreo] = useState("");

    function restaurarContraseña() {
        fetch(import.meta.env.VITE_BACKEND_URL + '/reset-password', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: correo })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data && data.success) {
                    alert("Chequea tu email")
                } else {
                    alert("Error: " + (data.error || "Hubo un error intentando resetear la contraseña"))
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

            {/* Card */}
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                    Olvidé mi contraseña
                </h1>
                <p className="text-sm text-gray-500 text-center mb-8">
                    Se enviará un correo para cambiar la contraseña
                </p>

                <form className="space-y-5">
                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            required
                            placeholder="Correo electrónico"
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
                            onChange={(e) => setCorreo(e.target.value)}
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
                        Enviar correo
                    </button>
                </form>
            </div>
        </div>
    );
}
