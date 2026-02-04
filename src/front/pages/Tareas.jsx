import { useState, useEffect } from 'react';

export default function Tareas() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);
  
  const token = localStorage.getItem("jwt-token");

  useEffect(() => {
    if (!token) return;
    const cargarTareas = async () => {
      try {
        const response = await fetch("/api/proyectos", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        const todasLasTareas = data.proyectos.flatMap(proyecto => proyecto.tareas || []);
        setTareas(todasLasTareas);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar tareas");
        setLoading(false);
      }
    };
    cargarTareas();
  }, [token]);

  // --- FUNCIÓN DE ELIMINAR CORREGIDA --
  const handleDeleteTarea = async (tareaId) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta tarea?")) return;
    setLoadingAction(true);
    try {
      const response = await fetch(`/api/tareas/${tareaId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("No se pudo eliminar");

      // Eliminar de la vista inmediatamente
      setTareas(tareas.filter(t => t.id !== tareaId));
    } catch (err) {
      alert(err.message);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleAddTarea = async (e) => {
    e.preventDefault();
    if (!nuevaTarea.trim()) return;
    setLoadingAction(true);
    try {
      // Obtenemos el primer proyecto para asignar la tarea
      const proyResp = await fetch("/api/proyectos", { headers: { "Authorization": `Bearer ${token}` } });
      const proyData = await proyResp.json();
      const proyectoId = proyData.proyectos[0]?.id;

      const response = await fetch("/api/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ nombre: nuevaTarea, proyecto_id: proyectoId })
      });
      const tareaCreada = await response.json();
      setTareas([...tareas, tareaCreada]);
      setNuevaTarea("");
    } catch (err) {
      setError("Error al crear");
    } finally {
      setLoadingAction(false);
    }
  };

  if (loading) return <div className="p-6 text-center dark:text-white">Cargando...</div>;

  return (
    <section className="p-6 max-w-4xl mx-auto dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Gestión de Tareas</h1>
      
      {/* Formulario */}
      <form onSubmit={handleAddTarea} className="flex gap-3 mb-8">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea..."
          className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 rounded-lg">Añadir</button>
      </form>

      {/* Lista de Tareas */}
      <div className="space-y-3">
        {tareas.map(tarea => (
          <div key={tarea.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow border dark:border-gray-700">
            <div>
              <h3 className="font-semibold dark:text-white">{tarea.nombre}</h3>
              <span className="text-xs text-gray-500">{tarea.estado}</span>
            </div>
            
            {/* BOTÓN DE ELIMINAR */}
            <button
              onClick={() => handleDeleteTarea(tarea.id)}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
