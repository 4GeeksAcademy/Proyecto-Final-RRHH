import FloatingInput from "../components/InputForm.jsx";
import FloatingSelect from "../components/FloatingSelect.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditarUsuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const token = localStorage.getItem("jwt-token");

  useEffect(function() {
    if (!token) return;

    fetch(import.meta.env.VITE_BACKEND_URL + `/api/usuario/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // 1. Cambiamos el nombre para evitar el error de "constant assignment"
      const datosUsuario = data.usuario;
      console.log("Usuario cargado:", datosUsuario);
      
      // 2. Guardamos en el estado local para que los inputs funcionen
      setUsuario(datosUsuario);
      
      // 3. Sincronizamos con el reducer global si es necesario
      dispatch({ 
        type: 'set_input_nameUsuario', 
        payload: { inputNameUsuario: datosUsuario.nombre } 
      });
    })
    .catch(error => console.error("Error cargando usuario:", error));
  }, [id, token, dispatch]); // Importante: dependencias para evitar bucle infinito

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-4">
      <form className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 space-y-6">

        <h2 className="text-3xl font-bold text-neutral-800 text-center">
          Actualizar Usuario
        </h2>
        <p className="text-sm text-neutral-500 text-center">
          Ajusta el formulario para actualizar
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <FloatingInput id="email" label="Correo electrónico" type="email" value={usuario?.email || ""} />
          <FloatingInput id="password" label="Contraseña" type="password" />
        </div>

        {/* Name */}
        <div className="grid md:grid-cols-2 gap-6">
          <FloatingInput id="first_name" label="Nombre" value={usuario?.nombre || ""} />
          <FloatingInput id="last_name" label="Apellidos" value={usuario?.apellidos || ""} />
        </div>

        {/* Extra */}
        <div className="grid md:grid-cols-2 gap-6">
          <FloatingInput id="phone" label="Teléfono" type="tel" value={usuario?.telefono || ""} />
          <FloatingInput id="dni" label="DNI" value={usuario?.dni || ""} />
        </div>

        {/* Selects */}
        <div className="grid md:grid-cols-2 gap-6">
          <FloatingSelect id="horario" label="Horario" value={usuario?.horario_id || ""}>
            <option value="">Selecciona horario</option>
          </FloatingSelect>

          <FloatingSelect id="rol" label="Rol" value={usuario?.rol_id || ""}>
            <option value="">Selecciona rol</option>
          </FloatingSelect>
        </div>
        
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-semibold text-lg hover:opacity-90 transition shadow-md"
        >
          Actualizar Usuario
        </button>
      </form>
    </div>
  );
}