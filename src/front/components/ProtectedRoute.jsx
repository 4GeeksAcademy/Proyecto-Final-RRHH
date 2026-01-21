import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export function ProtectedRoute({ children }) {
  const { store, dispatch } = useGlobalReducer();
  const token = localStorage.getItem("jwt-token");

  useEffect(() => {
    if (!token && store.is_active) {
      dispatch({ type: "logout" });
    }
  }, [token]);

  if (!token || !store.is_active) {
    return <Navigate to="/" replace />;
  }

  return children;
}