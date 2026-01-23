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
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!resp.ok) throw new Error("Credenciales inválidas");

      const data = await resp.json();
      localStorage.setItem("jwt-token", data.token);
      dispatch({ type: "login" });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 relative overflow-hidden">

      {/* Soft background shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white border border-neutral-200 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2 text-center">
          Bienvenido 👋
        </h1>
        <p className="text-sm text-neutral-500 text-center mb-8">
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
              className="w-full bg-neutral-50 text-neutral-800 placeholder-neutral-400 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full bg-neutral-50 text-neutral-800 placeholder-neutral-400 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-center text-sm">
            <Link
              to="#"
              className="text-indigo-600 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-semibold text-lg hover:opacity-90 transition shadow-md"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-neutral-500 text-center mt-6">
          ¿No tienes cuenta?{" "}
          <Link to="#" className="text-indigo-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
