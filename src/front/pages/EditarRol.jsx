import FloatingInput from "../components/InputForm";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditarRol() {
    const { id } = useParams();
    const { store, dispatch } = useGlobalReducer();
    const token = localStorage.getItem("jwt-token");

    const [rol, setRol] = useState(null);

    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + `/api/rol/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then((data) => {
                const r = data.rol;
                setRol(r);

                dispatch({ type: "set_input_nombre_rol", payload: { inputNombreRol: r.nombre } });
                dispatch({ type: "set_checkbox_es_admin", payload: { checkboxEsAdmin: r.es_admin } });
                dispatch({ type: "set_checkbox_puede_crear_reuniones", payload: { checkboxPuedeCrearReuniones: r.puede_crear_reunion } });
            })
            .catch(error => console.log("Error cargando el rol", error));
    }, [id, token, dispatch]);

    function modificar(e) {
        e.preventDefault();

        fetch(import.meta.env.VITE_BACKEND_URL + `/api/rol/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: store.inputNombreRol,
                es_admin: store.checkboxEsAdmin,
                puede_crear_reunion: store.checkboxPuedeCrearReuniones
            }),
        })
            .then(response => response.json())
            .then(() => {
                window.location.replace("/administracion");
            })
            .catch(error => console.log("Error en actualizar rol", error));
    }

    if (!rol) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-4">
            <form className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 space-y-6" onSubmit={modificar}>
                <h2 className="text-3xl font-bold text-neutral-800 text-center">
                    Actualizar Rol
                </h2>
                <FloatingInput id="nombre" label="Nombre" type="text" required value={store.inputNombreRol} onChange={(e) => dispatch({ type: 'set_input_nombre_rol', payload: { inputNombreRol: e.target.value } })} />

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center ps-4 border border-gray-200 rounded-xl">
                        {store.checkboxEsAdmin ? <input id="es_admin" checked type="checkbox" onChange={(event) => dispatch({ type: "set_checkbox_es_admin", payload: { checkboxEsAdmin: event.target.checked } })} name="es_admin" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2" /> : <input id="es_admin" type="checkbox" onChange={(event) => dispatch({ type: "set_checkbox_es_admin", payload: { checkboxEsAdmin: event.target.checked } })} name="es_admin" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2" />}
                        <label for="es_admin" className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Es Admin</label>
                    </div>
                    <div className="flex items-center ps-4 border border-gray-200 rounded-xl">
                        {store.checkboxPuedeCrearReuniones ? <input id="puede_crear_reunion" checked type="checkbox" onChange={(event) => dispatch({ type: "set_checkbox_puede_crear_reuniones", payload: { checkboxPuedeCrearReuniones: event.target.checked } })} name="puede_crear_reunion" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2" /> : <input id="puede_crear_reunion" type="checkbox" onChange={(event) => dispatch({ type: "set_checkbox_puede_crear_reuniones", payload: { checkboxPuedeCrearReuniones: event.target.checked } })} name="puede_crear_reunion" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2" />}
                        <label for="puede_crear_reunion" className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Puede Crear Reuniones</label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-3
              rounded-lg
              bg-blue-600
              text-white
              font-medium
              hover:bg-blue-700
              transition"
                >
                    Actualizar rol
                </button>
            </form>
        </div>
    )
}