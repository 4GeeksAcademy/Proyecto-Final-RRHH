import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function Login() {
  const { dispatch } = useGlobalReducer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!resp.ok) throw new Error("Credenciales inválidas");

      const data = await resp.json();
      localStorage.setItem("jwt-token", data.token);
      dispatch({ type: "login" });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
          Bienvenido
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
          Accede a tu panel de control
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="
                w-full px-4 py-3
                rounded-lg
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                focus:border-blue-500 dark:focus:border-blue-400
              "
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="
                w-full px-4 py-3
                rounded-lg
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                focus:border-blue-500 dark:focus:border-blue-400
              "
            />
          </div>

          {/* Options */}
          <div className="flex justify-center text-sm">
            <Link to="#" className="text-blue-600 dark:text-blue-400 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full py-3
              rounded-lg
              bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600
              text-white
              font-medium
              transition
            "
          >
            Entrar
          </button>
        </form>


      </div>


    </div>
  );
}

