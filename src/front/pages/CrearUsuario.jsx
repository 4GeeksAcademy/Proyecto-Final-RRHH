import FloatingInput from "../components/InputForm.jsx";
import FloatingSelect from "../components/FloatingSelect.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function CrearUsuario() {

  const { store, dispatch } = useGlobalReducer();
  const token = localStorage.getItem("jwt-token");

  function crearUsuario(event) {
    event.preventDefault();

    fetch(import.meta.env.VITE_BACKEND_URL + "/api/usuario", {
      method: 'POST',
      body: JSON.stringify({
        "nombre": store.inputNameUsuario,
        "apellidos": store.inputApellidosUsuario,
        "password": store.inputPasswordUsuario,
        "email": store.inputEmailUsuario,
        "dni": store.inputDniUsuario,
        "telefono": store.inputTelefonoUsuario,
        "empresa_id": "",
        "horario_id": store.selectHorarioUsuario,
        "rol_id": store.selectRolUsuario,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'crear_usuario', payload: { usuario: data.usuario } });
        window.location.replace("/administracion");
      })
      .catch(error => console.log(error))
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-4">
      <form className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 space-y-6" onSubmit={crearUsuario}>

        <h2 className="text-3xl font-bold text-neutral-800 text-center">
          Crear Usuario
        </h2>
        <p className="text-sm text-neutral-500 text-center">
          Completa el formulario para crear un usuario
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <FloatingInput id="email" label="Correo electrónico" type="email" required onChange={(event) => dispatch({ type: 'set_input_emailUsuario', payload: { inputEmailUsuario: event.target.value } })} />
          <FloatingInput id="password" label="Contraseña" type="password" required onChange={(event) => dispatch({ type: 'set_input_passwordUsuario', payload: { inputPasswordUsuario: event.target.value } })} />
        </div>

        {/* Name */}
        <div className="grid md:grid-cols-2 gap-6">
          <FloatingInput id="first_name" label="Nombre" required onChange={(event) => dispatch({ type: 'set_input_nameUsuario', payload: { inputNameUsuario: event.target.value } })} />
          <FloatingInput id="last_name" label="Apellidos" required onChange={(event) => dispatch({ type: 'set_input_apellidosUsuario', payload: { inputApellidosUsuario: event.target.value } })} />
        </div>

        {/* Extra */}
        <div className="grid md:grid-cols-2 gap-6">
          <FloatingInput id="phone" label="Teléfono" type="tel" onChange={(event) => dispatch({ type: 'set_input_telefonoUsuario', payload: { inputTelefonoUsuario: event.target.value } })} />
          <FloatingInput id="dni" label="DNI" required onChange={(event) => dispatch({ type: 'set_input_dniUsuario', payload: { inputDniUsuario: event.target.value } })} />
        </div>

        {/* Selects */}
        <div className="grid md:grid-cols-2 gap-6">
          <FloatingSelect id="horario" label="Horario" required onChange={(event) => dispatch({ type: 'set_select_HorarioUsuario', payload: { selectHorarioUsuario: event.target.value } })}>
            <option value="">Selecciona horario</option>
            {store.horarios.map((horario) => {
              return <option value={horario.id}>{horario.name}</option>
            })}
          </FloatingSelect>

          <FloatingSelect id="rol" label="Rol" required onChange={(event) => dispatch({ type: 'set_select_RolUsuario', payload: { selectRolUsuario: event.target.value } })}>
            <option value="">Selecciona rol</option>
            {store.roles.map((rol) => {
              return <option value={rol.id}>{rol.nombre}</option>
            })}
          </FloatingSelect>
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
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
