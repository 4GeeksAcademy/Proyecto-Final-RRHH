import FloatingInput from "../components/InputForm.jsx";
import FloatingSelect from "../components/FloatingSelect.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";

export default function CrearUsuario() {

  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt-token");

  /*const de yessi para correo electronico*/
  const [correoElectronico, setCorreoElectronico] = useState("")

  async function crearUsuario(event) {
    event.preventDefault();

    try {
      // 1️⃣ Enviar correo primero
      await enviarCorreo();
      console.log("Correo enviado correctamente");

      // 2️⃣ Crear usuario
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/usuario",
        {
          method: "POST",
          body: JSON.stringify({
            nombre: store.inputNameUsuario,
            apellidos: store.inputApellidosUsuario,
            password: store.inputPasswordUsuario,
            email: store.inputEmailUsuario,
            dni: store.inputDniUsuario,
            telefono: store.inputTelefonoUsuario,
            foto_perfil: "logo.png",
            link_calendly: "",
            empresa_id: "",
            horario_id: store.selectHorarioUsuario,
            rol_id: store.selectRolUsuario,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      dispatch({
        type: "crear_usuario",
        payload: { usuario: data.usuario },
      });

      window.location.replace("/administracion");

    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al crear el usuario o enviar el correo");
    }
  }

  /*funcion de correo electronico Yessi*/
  async function enviarCorreo() {
  const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/email-prueba`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      recipient: store.inputEmailUsuario,
      nombre: store.inputNameUsuario,
      apellidos: store.inputApellidosUsuario,
      password: store.inputPasswordUsuario,
      empresa_nombre: store.empresa?.nombre || "TeamCore",
      video_url: store.empresa?.videoBienvenida || "/docs/assets/teamcoreLogo2.png"
    }),
  });

  if (!resp.ok) throw new Error("Error enviando el correo");
  return await resp.json();
}

useEffect(() => {
  async function fetchEmpresa() {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/empresa`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!resp.ok) throw new Error("Error obteniendo la empresa");

      const data = await resp.json();

      dispatch({
        type: "set_empresa",
        payload: { empresa: data.empresa },
      });

    } catch (error) {
      console.error("Error cargando empresa:", error);
    }
  }

  fetchEmpresa();
}, []);
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-4">
      <form className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 space-y-6" onSubmit={crearUsuario}>

        <h2 className="text-3xl font-bold text-neutral-800 text-center">
          Crear Usuario
        </h2>
        <p className="text-sm text-neutral-500 text-center">
          Completa el formulario para registrarte
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <FloatingInput id="email" label="Correo electrónico" type="email" onChange={(e) => { setCorreoElectronico(e.target.value); dispatch({ type: 'set_input_emailUsuario', payload: { inputEmailUsuario: e.target.value } }); }} />
          <FloatingInput id="password" label="Contraseña" type="password" onChange={(event) => dispatch({ type: 'set_input_passwordUsuario', payload: { inputPasswordUsuario: event.target.value } })} />
        </div>

        {/* Name */}
        <div className="grid md:grid-cols-2 gap-6">
          <FloatingInput id="first_name" label="Nombre" onChange={(event) => dispatch({ type: 'set_input_nameUsuario', payload: { inputNameUsuario: event.target.value } })} />
          <FloatingInput id="last_name" label="Apellidos" onChange={(event) => dispatch({ type: 'set_input_apellidosUsuario', payload: { inputApellidosUsuario: event.target.value } })} />
        </div>

        {/* Extra */}
        <div className="grid md:grid-cols-2 gap-6">
          <FloatingInput id="phone" label="Teléfono" type="tel" onChange={(event) => dispatch({ type: 'set_input_telefonoUsuario', payload: { inputTelefonoUsuario: event.target.value } })} />
          <FloatingInput id="dni" label="DNI" onChange={(event) => dispatch({ type: 'set_input_dniUsuario', payload: { inputDniUsuario: event.target.value } })} />
        </div>

        {/* Selects */}
        <div className="grid md:grid-cols-2 gap-6">
          <FloatingSelect id="horario" label="Horario" onChange={(event) => dispatch({ type: 'set_select_HorarioUsuario', payload: { selectHorarioUsuario: event.target.value } })}>
            <option value="">Selecciona horario</option>
            {store.horarios.map((horario) => {
              return <option value={horario.id}>{horario.name}</option>
            })}
          </FloatingSelect>

          <FloatingSelect id="rol" label="Rol" onChange={(event) => dispatch({ type: 'set_select_RolUsuario', payload: { selectRolUsuario: event.target.value } })}>
            <option value="">Selecciona rol</option>
            {store.roles.map((rol) => {
              return <option value={rol.id}>{rol.nombre}</option>
            })}
          </FloatingSelect>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-semibold text-lg hover:opacity-90 transition shadow-md"
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
