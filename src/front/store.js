export const initialStore = () => {
  return {
    is_active: !!localStorage.getItem("jwt-token"),
    usuarios: [],
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
    checkboxEsAdmin: false,
    checkboxPuedeCrearReuniones: false,
    inputNombreRol: "",
    inputNombreHorario: "",
    timeLunesEntrada: "",
    timeLunesSalida: "",
    timeMartesEntrada: "",
    timeMartesSalida: "",
    timeMiercolesEntrada: "",
    timeMiercolesSalida: "",
    timeJuevesEntrada: "",
    timeJuevesSalida: "",
    timeViernesEntrada: "",
    timeViernesSalida: "",
    timeSabadoEntrada: "",
    timeSabadoSalida: "",
    timeDomingoEntrada: "",
    timeDomingoSalida: "",
  };
};

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

    case "crear_rol":
      const { rol } = action.payload;

      return {
        ...store,
        roles: [...store.roles, rol]
      };

    case "crear_horario":
      const { horario } = action.payload;

      return {
        ...store,
        horarios: [...store.horarios, horario]
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

    case "set_select_RolUsuario":
      const { selectRolUsuario } = action.payload;

      return {
        ...store,
        selectRolUsuario: selectRolUsuario,
      };
    
      case "set_checkbox_es_admin":
        const { checkboxEsAdmin } = action.payload;

        return {
          ...store,
          checkboxEsAdmin: checkboxEsAdmin
        };

      case "set_input_nombre_rol":
        const { inputNombreRol } = action.payload;

        return {
          ...store,
          inputNombreRol: inputNombreRol
        };

      case "set_checkbox_puede_crear_reuniones":
        const { checkboxPuedeCrearReuniones } = action.payload;

        return {
          ...store,
          checkboxPuedeCrearReuniones: checkboxPuedeCrearReuniones
        };

      case "set_input_nombre_horario":
        const { inputNombreHorario } = action.payload;

        return {
          ...store,
          inputNombreHorario: inputNombreHorario
        };

      case "set_lunes_entrada":
        const { timeLunesEntrada } = action.payload;

        return {
          ...store,
          timeLunesEntrada: timeLunesEntrada
        };

      case "set_lunes_salida":
        const { timeLunesSalida } = action.payload;

        return {
          ...store,
          timeLunesSalida: timeLunesSalida
        };
      
      case "set_martes_entrada":
        const { timeMartesEntrada } = action.payload;

        return {
          ...store,
          timeMartesEntrada: timeMartesEntrada
        };
      
      case "set_martes_salida":
        const { timeMartesSalida } = action.payload;

        return {
          ...store,
          timeMartesSalida: timeMartesSalida
        };
      
      case "set_miercoles_entrada":
        const { timeMiercolesEntrada } = action.payload;

        return {
          ...store,
          timeMiercolesEntrada: timeMiercolesEntrada
        };

      case "set_miercoles_salida":
        const { timeMiercolesSalida } = action.payload;

        return {
          ...store,
          timeMiercolesSalida: timeMiercolesSalida
        };

      case "set_jueves_entrada":
        const { timeJuevesEntrada } = action.payload;

        return {
          ...store,
          timeJuevesEntrada: timeJuevesEntrada
        };

      case "set_jueves_salida":
        const { timeJuevesSalida } = action.payload;

        return {
          ...store,
          timeJuevesSalida: timeJuevesSalida
        };

      case "set_viernes_entrada":
        const { timeViernesEntrada } = action.payload;

        return {
          ...store,
          timeViernesEntrada: timeViernesEntrada
        };

      case "set_viernes_salida":
        const { timeViernesSalida } = action.payload;

        return {
          ...store,
          timeViernesSalida: timeViernesSalida
        };

      case "set_sabado_entrada":
        const { timeSabadoEntrada } = action.payload;

        return {
          ...store,
          timeSabadoEntrada: timeSabadoEntrada
        };

      case "set_sabado_salida":
        const { timeSabadoSalida } = action.payload;

        return {
          ...store,
          timeSabadoSalida: timeSabadoSalida
        };

      case "set_domingo_entrada":
        const { timeDomingoEntrada } = action.payload;

        return {
          ...store,
          timeDomingoEntrada: timeDomingoEntrada
        };

      case "set_domingo_salida":
        const { timeDomingoSalida } = action.payload;

        return {
          ...store,
          timeDomingoSalida: timeDomingoSalida
        };

    default:
      throw Error("Unknown action.");
  }
}
