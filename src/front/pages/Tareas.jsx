import { useState, useEffect } from "react";

export default function Tareas() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

  const token = localStorage.getItem("jwt-token");

  useEffect(() => {
    if (!token) {
      setError("Debes iniciar sesión para gestionar tareas");
      setLoading(false);
      return;
    }

    const cargarTareas = async () => {
      try {
        const response = await fetch("/api/proyectos", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Sesión expirada. Inicia sesión de nuevo.");
          }
          throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        const todasLasTareas = data.proyectos.flatMap((p) =>
          p.tareas ? p.tareas : []
        );

        setTareas(todasLasTareas);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error al cargar tareas");
        setLoading(false);
      }
    };

    cargarTareas();
  }, [token]);

  const handleAddTarea = async (e) => {
    e.preventDefault();
    if (!nuevaTarea.trim() || !token) return;

    setLoadingAction(true);
    setError(null);

    try {
      const proyectosResponse = await fetch("/api/proyectos", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const proyectosData = await proyectosResponse.json();
      const primerProyecto = proyectosData.proyectos[0];
      if (!primerProyecto) throw new Error("No tienes proyectos");

      const response = await fetch("/api/tareas", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nuevaTarea.trim(),
          estado: "Pendiente",
          proyecto_id: primerProyecto.id,
        }),
      });

      if (!response.ok) throw new Error("Error al crear tarea");

      const tareaCreada = await response.json();
      setTareas([...tareas, tareaCreada]);
      setNuevaTarea("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteTarea = async (id) => {
    if (!window.confirm("¿Eliminar esta tarea?")) return;

    setLoadingAction(true);
    try {
      await fetch(`/api/tareas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setTareas(tareas.filter((t) => t.id !== id));
    } catch (err) {
      setError("Error al eliminar tarea");
    } finally {
      setLoadingAction(false);
    }
  };

  if (!token) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          Debes iniciar sesión para gestionar tareas
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
        <p className="mt-2 text-gray-600">Cargando tareas...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 p-4 md:p-8 max-w-4xl mx-auto rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestión de Tareas
        </h1>
        <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
          {tareas.length} tareas
        </span>
      </div>

      {/* FORMULARIO */}
      <div className="mb-8 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <form
          onSubmit={handleAddTarea}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Nueva tarea..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg
                       text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loadingAction}
          />
          <button
            type="submit"
            disabled={loadingAction || !nuevaTarea.trim()}
            className={`px-6 py-3 rounded-lg font-medium text-white transition
              ${
                loadingAction || !nuevaTarea.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loadingAction ? "Creando..." : "Añadir Tarea"}
          </button>
        </form>

        {error && (
          <p className="mt-3 text-sm text-red-700 bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}
      </div>

      {/* LISTA */}
      {tareas.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="text-5xl mb-4 text-gray-300">📋</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No tienes tareas
          </h2>
          <button
            onClick={() => document.querySelector("input")?.focus()}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Añadir
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {tareas.map((tarea) => (
            <div
              key={tarea.id}
              className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 hover:shadow-sm"
            >
              <div>
                <h3 className="font-semibold text-gray-800">
                  {tarea.nombre}
                </h3>
                <div className="mt-2 flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tarea.estado === "Finalizado"
                        ? "bg-green-100 text-green-700"
                        : tarea.estado === "En Proceso"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {tarea.estado}
                  </span>
                  <span className="text-sm text-gray-500">
                    Proyecto ID: {tarea.proyecto_id}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDeleteTarea(tarea.id)}
                disabled={loadingAction}
                className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700"
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
