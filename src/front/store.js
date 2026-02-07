const calcularResumen = (listaTareas) => {
  return {
    hecho: listaTareas.filter(t => t.estado === "Hecho").length,
    progreso: listaTareas.filter(t => t.estado === "En Proceso").length,
    porHacer: listaTareas.filter(t => t.estado === "Por Hacer").length,
  };
};


  export const initialStore = () => {
    return {
      is_active: !!localStorage.getItem("jwt-token"),
    usuarios: [],
    empresa: [null],
    roles: [],
    horarios: [],
    inputNameUsuario: "",
    inputApellidosUsuario: "",
    inputEmailUsuario: "",
    inputDniUsuario: "",
    inputTelefonoUsuario: "",
    inputPasswordUsuario: "",
    selectHorarioUsuario: "",
    selectRolUsuario: "",

    tareas: [],
   tareasResumen: { hecho: 0, progreso: 0, porHacer: 0 },
    fichajes: [],
    }
  }
  



export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "login":
      return { ...store, is_active: true };

    case "logout":
      localStorage.removeItem("jwt-token");
      return { ...store, is_active: false };

    case "get_users":
      const { usuarios } = action.payload;

      return {
        ...store,
        usuarios: usuarios || [],
      };

    case "get_roles":
      const { roles } = action.payload;

      return {
        ...store,
        roles: roles || [],
      };

    case "get_horarios":
      const { horarios } = action.payload;

      return {
        ...store,
        horarios: horarios || [],
      };

    case "eliminar_horario":
      const { id_horario } = action.payload;

      return {
        ...store,
        horarios: store.horarios.filter((horario) => horario.id !== id_horario),
      };

    case "crear_usuario":
      const { usuario } = action.payload;

      return {
        ...store,
        usuarios: [...store.usuarios, usuario]
      };

    case "eliminar_rol":
      const { id_rol } = action.payload;

      return {
        ...store,
        roles: store.roles.filter((rol) => rol.id !== id_rol),
      };

    case "eliminar_usuario":
      const { id_usuario } = action.payload;

      return {
        ...store,
        usuarios: store.usuarios.filter((usuario) => usuario.id !== id_usuario),
      };

    case "set_input_nameUsuario":
      const { inputNameUsuario } = action.payload;

      return {
        ...store,
        inputNameUsuario: inputNameUsuario,
      };

    case "set_input_apellidosUsuario":
      const { inputApellidosUsuario } = action.payload;

      return {
        ...store,
        inputApellidosUsuario: inputApellidosUsuario,
      };

    case "set_input_emailUsuario":
      const { inputEmailUsuario } = action.payload;

      return {
        ...store,
        inputEmailUsuario: inputEmailUsuario,
      };

    case "set_input_dniUsuario":
      const { inputDniUsuario } = action.payload;

      return {
        ...store,
        inputDniUsuario: inputDniUsuario,
      };

    case "set_input_telefonoUsuario":
      const { inputTelefonoUsuario } = action.payload;

      return {
        ...store,
        inputTelefonoUsuario: inputTelefonoUsuario,
      };

    case "set_input_passwordUsuario":
      const { inputPasswordUsuario } = action.payload;

      return {
        ...store,
        inputPasswordUsuario: inputPasswordUsuario,
      };

    case "set_select_HorarioUsuario":
      const { selectHorarioUsuario } = action.payload;

      return {
        ...store,
        selectHorarioUsuario: selectHorarioUsuario,
      };

    case "set_empresa":
  return {
    ...store,
    empresa: action.payload.empresa,
  };

    case "set_select_RolUsuario":
      const { selectRolUsuario } = action.payload;

      return {
        ...store,
        selectRolUsuario: selectRolUsuario,
      };

      case "set_tareas": {
      const { tareas, resumen } = action.payload;
      return {
        ...store,
        tareas: tareas || [],
        tareasResumen: resumen || store.tareasResumen,
      };
    }


      

    default:
      throw Error("Unknown action.");
  }

  


}


   