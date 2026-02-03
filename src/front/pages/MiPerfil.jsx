import FloatingInput from "../components/InputForm.jsx";
import FloatingSelect from "../components/FloatingSelect.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MiPerfil() {
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer();
  const token = localStorage.getItem("jwt-token");

  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + `/api/usuario/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const u = data.usuario;
        setUsuario(u);

        // 🔹 Inicializar STORE (CLAVE)
        dispatch({ type: "set_input_emailUsuario", payload: { inputEmailUsuario: u.email } });
        dispatch({ type: "set_input_nameUsuario", payload: { inputNameUsuario: u.nombre } });
        dispatch({ type: "set_input_apellidosUsuario", payload: { inputApellidosUsuario: u.apellidos } });
        dispatch({ type: "set_input_telefonoUsuario", payload: { inputTelefonoUsuario: u.telefono } });
        dispatch({ type: "set_input_dniUsuario", payload: { inputDniUsuario: u.dni } });
        dispatch({ type: "set_select_RolUsuario", payload: { selectRolUsuario: u.rol_id } });
        dispatch({ type: "set_select_HorarioUsuario", payload: { selectHorarioUsuario: u.horario_id } });
      })
      .catch((error) => console.error("Error cargando usuario", error));
  }, [id, token, dispatch]);

  function modificar(e) {
    e.preventDefault();

    fetch(import.meta.env.VITE_BACKEND_URL + `/api/usuario/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: store.inputEmailUsuario,
        nombre: store.inputNameUsuario,
        apellidos: store.inputApellidosUsuario,
        telefono: store.inputTelefonoUsuario,
        dni: store.inputDniUsuario,
        horario_id: Number(store.selectHorarioUsuario),
        rol_id: Number(store.selectRolUsuario),
      }),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error actualizando", error));
  }

  if (!usuario) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-4">
      <form
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 space-y-6"
        onSubmit={modificar}
      >
        <h2 className="text-3xl font-bold text-neutral-800 text-center">
          Mi Perfil
        </h2>

        <FloatingInput
          id="email"
          label="Correo electrónico"
          type="email"
          disabled="true"
          value={store.inputEmailUsuario}
          required
          onChange={(e) =>
            dispatch({
              type: "set_input_emailUsuario",
              payload: { inputEmailUsuario: e.target.value },
            })
          }
        />

        <div className="grid md:grid-cols-2 gap-6">
          <FloatingInput
            id="first_name"
            label="Nombre"
            value={store.inputNameUsuario}
            required
            onChange={(e) =>
              dispatch({
                type: "set_input_nameUsuario",
                payload: { inputNameUsuario: e.target.value },
              })
            }
          />

          <FloatingInput
            id="last_name"
            label="Apellidos"
            value={store.inputApellidosUsuario}
            required
            onChange={(e) =>
              dispatch({
                type: "set_input_apellidosUsuario",
                payload: { inputApellidosUsuario: e.target.value },
              })
            }
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FloatingInput
            id="phone"
            label="Teléfono"
            type="tel"
            value={store.inputTelefonoUsuario}
            onChange={(e) =>
              dispatch({
                type: "set_input_telefonoUsuario",
                payload: { inputTelefonoUsuario: e.target.value },
              })
            }
          />

          <FloatingInput
            id="dni"
            label="DNI"
            value={store.inputDniUsuario}
            required
            onChange={(e) =>
              dispatch({
                type: "set_input_dniUsuario",
                payload: { inputDniUsuario: e.target.value },
              })
            }
          />
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
          Actualizar Usuario
        </button>
      </form>
    </div>
  );
}
