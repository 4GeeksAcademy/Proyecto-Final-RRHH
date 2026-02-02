import FloatingInput from "../components/InputForm";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function CrearRol() {
    const { store, dispatch } = useGlobalReducer();
    const token = localStorage.getItem("jwt-token");

    function crearRol(event) {
        event.preventDefault();

        fetch(import.meta.env.VITE_BACKEND_URL + "/api/rol", {
            method: 'POST',
            body: JSON.stringify({
                "nombre": store.inputNombreRol,
                "es_admin": store.checkboxEsAdmin,
                "puede_crear_reunion": store.checkboxPuedeCrearReuniones
            }),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: "crear_rol", payload: { rol: data.rol } });
                window.location.replace("/administracion");
            })
            .catch(error => console.log(error))
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-4">
            <form className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 space-y-6" onSubmit={crearRol}>
                <h2 className="text-3xl font-bold text-neutral-800 text-center">
                    Crear Rol
                </h2>
                <p className="text-sm text-neutral-500 text-center">
                    Completa el formulario para crear un rol
                </p>

                <FloatingInput id="nombre" label="Nombre" type="text" required onChange={(event) => dispatch({ type: "set_input_nombre_rol", payload: { inputNombreRol: event.target.value } })} />

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center ps-4 border border-gray-200 rounded-xl">
                        <input id="es_admin" type="checkbox" onChange={(event) => dispatch({ type: "set_checkbox_es_admin", payload: { checkboxEsAdmin: event.target.checked } })} name="es_admin" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2" />
                        <label for="es_admin" className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Es Admin</label>
                    </div>
                    <div className="flex items-center ps-4 border border-gray-200 rounded-xl">
                        <input id="puede_crear_reunion" type="checkbox" onChange={(event) => dispatch({ type: "set_checkbox_puede_crear_reuniones", payload: { checkboxPuedeCrearReuniones: event.target.checked } })} name="puede_crear_reunion" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2" />
                        <label for="puede_crear_reunion" className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Puede Crear Reuniones</label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-semibold text-lg hover:opacity-90 transition shadow-md"
                >
                    Crear rol
                </button>
            </form>
        </div>
    )
}