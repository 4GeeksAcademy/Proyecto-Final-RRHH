import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CardInicioSesion() {
  const [email, setEmail] = useState("test_user1@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      
      const backendUrl = "https://supreme-space-dollop-4qjpwxgwxwr2g65-3001.app.github.dev";
      
      const response = await fetch(`${backendUrl}/api/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.msg || "Credenciales inválidas. ¿Creaste los usuarios de prueba?");
      }
    } catch (err) {
      setError("Error de conexión con el servidor. ¿El backend está corriendo?");
      console.error("Error detallado:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-primary-soft">
      <div className="w-full max-w-sm bg-white opacity-80 p-6 border border-default rounded-base shadow-xs">
        <form onSubmit={handleSubmit}>
          <h5 className="text-xl font-semibold text-heading mb-6">
            Inicia Sesion
          </h5>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">
              Correo Electronico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="example@company.com"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="•••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center text-center text-black bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-base text-xl px-4 py-2.5 w-full"
          >
            Entrar
          </button>

          <div className="text-sm font-medium text-body mt-4">
            No Tienes Cuenta?{" "}
            <a href="#" className="text-fg-brand hover:underline">
              Registrate
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}