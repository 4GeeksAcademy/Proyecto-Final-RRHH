export const initialStore=()=>{
  return{
    is_active: !!localStorage.getItem("jwt-token"),
    usuarios: [],
    roles: [],
    horarios: []
  };
};

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'login':
      return{...store, is_active: true};
    
    case 'logout':
      localStorage.removeItem("jwt-token");
      return{...store, is_active:false};

    case 'get_users':
      const { usuarios } = action.payload;

      return {
        ...store,
        usuarios: usuarios || []
      };

    case 'get_roles':
      const { roles } = action.payload

      return {
        ...store,
        roles: roles || []
      };
    
    case 'get_horarios':
      const { horarios } = action.payload;

      return {
        ...store,
        horarios: horarios || []
      };
    
    case 'eliminar_horario':
        const { id } = action.payload;

        return {
          ...store,
          horarios: store.horarios.filter(horario => horario.id !== id)
        };

    default:
      throw Error('Unknown action.');
  }    
}
