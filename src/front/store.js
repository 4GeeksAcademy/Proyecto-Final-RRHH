export const initialStore=()=>{
  return{
    is_active: !!localStorage.getItem("jwt-token"),
  };
};

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'login':
      return{...store, is_active: true};
    
    case 'logout':
      localStorage.removeItem("jwt-token");
      return{...store, is_active:false};

    default:
      throw Error('Unknown action.');
  }    
}
