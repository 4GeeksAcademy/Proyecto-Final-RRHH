// src/pages/Tareas.jsx
import { useState, useEffect } from 'react';

export default function Tareas() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);
  
  const token = localStorage.getItem("jwt-token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://supreme-space-dollop-4qjpwxgwxwr2g65-3001.app.github.dev";

  // Cargar tareas iniciales
  useEffect(() => {
    if (!token) {
      setError("Debes iniciar sesión para gestionar tareas");
      setLoading(false);
      return;
    }

    const cargarTareas = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/proyectos`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Sesión expirada. Por favor, inicia sesión de nuevo.");
          }
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const todasLasTareas = data.proyectos.flatMap(proyecto => 
          proyecto.tareas ? proyecto.tareas : []
        );
        setTareas(todasLasTareas);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar tareas:", err);
        setError(err.message || "Error al cargar las tareas");
        setLoading(false);
      }
    };

    cargarTareas();
  }, [token, backendUrl]);

  // Añadir nueva tarea
  const handleAddTarea = async (e) => {
    e.preventDefault();
    if (!nuevaTarea.trim() || !token) return;

    setLoadingAction(true);
    setError(null);

    try {
      // Primero, obtener los proyectos del usuario para usar un proyecto_id válido
      const proyectosResponse = await fetch(`${backendUrl}/api/proyectos`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!proyectosResponse.ok) throw new Error("No se pudieron obtener proyectos");

      const proyectosData = await proyectosResponse.json();
      
      // Usar el primer proyecto del usuario (o el que prefieras)
      const primerProyecto = proyectosData.proyectos[0];
      if (!primerProyecto) throw new Error("No tienes proyectos asignados");

      // Crear la tarea en el backend
      const response = await fetch(`${backendUrl}/api/tareas`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: nuevaTarea.trim(),
          estado: "Pendiente",
          proyecto_id: primerProyecto.id
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.msg || `Error ${response.status}`);
      }

      const tareaCreada = await response.json();
      
      // Actualizar la lista local
      setTareas([...tareas, tareaCreada]);
      setNuevaTarea("");
      
    } catch (err) {
      console.error("Error al crear tarea:", err);
      setError(`Error al crear tarea: ${err.message}`);
    } finally {
      setLoadingAction(false);
    }
  };

  // Eliminar tarea
  const handleDeleteTarea = async (tareaId) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta tarea?") || !token) return;

    setLoadingAction(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/api/tareas/${tareaId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.msg || `Error ${response.status}`);
      }

      // Actualizar la lista local
      setTareas(tareas.filter(t => t.id !== tareaId));
      
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
      setError(`Error al eliminar tarea: ${err.message}`);
    } finally {
      setLoadingAction(false);
    }
  };

  if (!token) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Error de autenticación</p>
          <p>Debes iniciar sesión para gestionar tus tareas. Por favor, ve a la página de login.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-2 text-gray-600">Cargando tareas...</p>
      </div>
    );
  }

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Tareas</h1>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {tareas.length} tareas
        </span>
      </div>

      {/* Todolist para tareas*/}
      <div className="mb-8 bg-white rounded-xl shadow-md border border-gray-200 p-5">
        <form onSubmit={handleAddTarea} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Nueva tarea..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            disabled={loadingAction}
          />
          <button
            type="submit"
            disabled={loadingAction || !nuevaTarea.trim()}
            className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
              loadingAction || !nuevaTarea.trim() 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loadingAction ? (
              <span className="flex items-center justify-center">
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></span>
                Creando...
              </span>
            ) : (
              "Añadir Tarea"
            )}
          </button>
        </form>
        {error && (
          <p className="mt-3 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
            {error}
          </p>
        )}
      </div>

      {/* Lista de tareas */}
      {tareas.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="text-5xl mb-4 text-gray-300">📋</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No tienes tareas</h2>
          <p className="text-gray-500 mb-6"></p>
          <button
            onClick={() => document.querySelector('input').focus()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Añadir
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {tareas.map(tarea => (
            <div 
              key={tarea.id} 
              className="flex items-center justify-between p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-gray-900 truncate">{tarea.nombre}</h3>
                <div className="mt-2 flex items-center gap-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    tarea.estado === "Finalizado" 
                      ? "bg-green-100 text-green-800" 
                      : tarea.estado === "En Proceso" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {tarea.estado}
                  </span>
                  <span className="text-sm text-gray-500">Proyecto ID: {tarea.proyecto_id}</span>
                </div>
              </div>
              
              <button
                onClick={() => handleDeleteTarea(tarea.id)}
                disabled={loadingAction}
                className={`ml-4 p-2 rounded-lg transition-colors ${
                  loadingAction 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "text-red-500 hover:bg-red-50 hover:text-red-700"
                }`}
                title="Eliminar tarea"
              >
                <i className="bi bi-trash text-xl"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}