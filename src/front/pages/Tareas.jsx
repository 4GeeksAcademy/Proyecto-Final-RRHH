// src/pages/Tareas.jsx
import { useState, useEffect } from 'react';

export default function Tareas() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Obtener el token de autenticación
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Debes iniciar sesión para ver tus tareas");
      setLoading(false);
      return;
    }

    // 2. URL del backend
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

    // 3. Llamar a /api/proyectos (¡no a /api/tareas!)
    fetch(`${backendUrl}/api/proyectos`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar proyectos");
        return res.json();
      })
      .then(data => {
        // 4. Extraer TODAS las tareas de todos los proyectos
        const todasLasTareas = data.proyectos.flatMap(proyecto => proyecto.tareas);
        setTareas(todasLasTareas);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 5. Renderizar
  if (loading) return <p className="p-6 text-lg">Cargando tareas...</p>;
  if (error) return <p className="p-6 text-red-600"> {error}</p>;

  return (
    <section className="p-6">
      <h1 className="text-3xl mb-4 text-black">Página de Tareas</h1>
      
      {tareas.length === 0 ? (
        <p>No tienes tareas asignadas.</p>
      ) : (
        <div className="space-y-4">
          {tareas.map(tarea => (
            <div key={tarea.id} className="p-4 border rounded bg-white shadow">
              <h3 className="font-semibold text-lg">{tarea.nombre}</h3>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${
                tarea.estado === "Finalizado" 
                  ? "bg-green-500 text-white" 
                  : tarea.estado === "En Proceso" 
                    ? "bg-blue-500 text-white" 
                    : "bg-yellow-500 text-black"
              }`}>
                {tarea.estado}
              </span>
              <p className="text-sm text-gray-600 mt-2">Proyecto ID: {tarea.proyecto_id}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}