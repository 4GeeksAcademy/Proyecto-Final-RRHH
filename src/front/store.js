export const initialStore=()=>{
  return{
    is_active: !!localStorage.getItem("jwt-token"),
    usuarios: [],
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

    default:
      throw Error('Unknown action.');
  }    
}
