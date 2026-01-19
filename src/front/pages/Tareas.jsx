import { useState, useEffect } from 'react';

export default function Tareas() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);

  const USAR_API_REAL = false;

  const tareasSimuladas = [
    {
      id: 1,
      nombre: "Conectar API de tareas",
      estado: "En Proceso",
      proyecto_id: 1
    },
    {
      id: 2,
      nombre: "Diseñar interfaz de usuario",
      estado: "Pendiente",
      proyecto_id: 1
    },
    {
      id: 3,
      nombre: "Revisar permisos de usuario",
      estado: "Finalizado",
      proyecto_id: 2
    }
  ];

  // ✅ useEffect dentro del componente
  useEffect(() => {
    if (USAR_API_REAL) {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
      fetch(`${backendUrl}/api/tareas`)
        .then(res => res.json())
        .then(data => {
          setTareas(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error al cargar tareas:", err);
          setLoading(false);
        });
    } else {
      setTimeout(() => {
        setTareas(tareasSimuladas);
        setLoading(false);
      }, 300);
    }
  }, []); // ← este [] va aquí, no afuera


  if (loading) {
    return <p className="p-6 text-lg">Cargando tareas...</p>;
  }

  return (
    <section className="p-6">
      <h1 className="text-3xl mb-4 text-black">Página de Tareas</h1>

      {tareas.length === 0 ? (
        <p>No hay tareas disponibles.</p>
      ) : (
        <div className="space-y-4">
          {tareas.map(tarea => (
            <div key={tarea.id} className="p-4 border rounded bg-white">
              <h3 className="font-semibold">{tarea.nombre}</h3>
              <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
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

      <div className={`mt-6 text-sm px-3 py-2 rounded ${
        USAR_API_REAL ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
      }`}>
        {USAR_API_REAL ? 'Modo API REAL' : 'Modo SIMULADO'}
      </div>
    </section>
  );
}