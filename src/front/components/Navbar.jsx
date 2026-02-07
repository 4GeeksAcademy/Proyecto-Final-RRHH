import React, { useState, useEffect, useRef } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';
import useTheme from '../hooks/useTheme';



export default function Navbar({ onMenuClick }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userOpen, setUserOpen] = useState(false);
  const [status, setStatus] = useState("activo");
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English (US)');

  const [user, setUser] = useState(null);
  const [reuniones, setReuniones] = useState([]);

  const { store, dispatch } = useGlobalReducer();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();


  const logout = () => {
    dispatch({ type: "logout" });
    // Limpia cualquier estado local que pueda afectar al siguiente usuario
    localStorage.removeItem("horaInicioFichaje");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("jwt-token");
      console.debug("Navbar: token:", token);
      if (!token) {
        console.warn("Navbar: no jwt-token encontrado en localStorage");
        return;
      }

      try {
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/usuario", {
          headers: { Authorization: "Bearer " + token }
        });

        if (!resp.ok) {
          const text = await resp.text().catch(() => null);
          console.error("Navbar: /api/usuario fallo", resp.status, text);
          if (resp.status === 401 || resp.status === 422) {
            localStorage.removeItem("jwt-token");
            dispatch({ type: "logout" });
            navigate("/", { replace: true });
          }
          return;
        }

        const data = await resp.json();
        console.debug("Navbar: /api/usuario response:", data);
        setUser(data.usuario); // Ajusta según la estructura que devuelva tu backend
      } catch (error) {
        console.error("Error cargando usuario:", error);
      }
    };

    fetchUser();
  }, []);

  // Actualizar usuario cuando se edite el perfil en EditarPerfil.jsx
  useEffect(() => {
    const handler = (e) => {
      console.debug("Navbar: recibido evento user-updated:", e.detail);
      if (e && e.detail) setUser(e.detail);
    };
    window.addEventListener("user-updated", handler);
    return () => window.removeEventListener("user-updated", handler);
  }, []);

  const estaLogeado = () => {
    if (store.is_active === true) {
      return (
        <div className="flex items-center gap-3 relative">

          {/* Notifications */}


          {/* User Avatar & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="relative flex rounded-full focus:ring-2 focus:ring-gray-500"
            >
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 hover:bg-gray-400 rounded-full">
                {user?.foto_perfil ? (
                  <img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${user.foto_perfil}`} alt="avatar" className="w-10 h-10 object-cover rounded-full" />
                ) : (
                  <span className="font-medium text-body">{user?.nombre?.charAt(0) || ""}{user?.apellidos?.charAt(0) || ""}</span>
                )}
              </div>
            </button>

            {userOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-50">
                {/* USER INFO */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <p className="font-semibold text-black dark:text-white">{user?.nombre || "Cargando..."} {user?.apellidos || ""}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || "Cargando..."}</p>
                </div>



                {/* ACTIONS */}
                <ul className="text-sm text-gray-700 dark:text-gray-300">
                  <li className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <Link to="/mi-perfil" className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-700 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.33 0 4.52.5 6.375 1.385M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="font-medium">Mi perfil</span>
                    </Link>
                  </li>

                  {/* SIGN OUT */}
                  <li className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 cursor-pointer">
                    <Link to="/" onClick={logout}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-medium">Sign out</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )
    }
  };



  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (!token) return;

    const fetchReuniones = async () => {
      try {
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/reuniones", {
          headers: {
            Authorization: "Bearer " + token
          }
        });

        if (!resp.ok) {
          const text = await resp.text().catch(() => null);
          console.error("Navbar: /api/reuniones fallo", resp.status, text);
          if (resp.status === 401 || resp.status === 422) {
            localStorage.removeItem("jwt-token");
            dispatch({ type: "logout" });
            navigate("/", { replace: true });
            return;
          }
          return;
        }

        const data = await resp.json();
        console.debug("Navbar: /api/reuniones response:", data);
        setReuniones(data.reuniones || data);
      } catch (error) {
        console.error("Error cargando reuniones:", error);
      }
    };

    fetchReuniones();
  }, []);

  const changeLanguage = (langCode) => {
    setSelectedLang(languages.find(l => l.code === langCode)?.name || 'English (US)');
    setLangOpen(false);

    const select = document.querySelector('select.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  };

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserOpen(false);
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="antialiased bg-white dark:bg-gray-900 pt-16">
      {/*  Google Translate widget (oculto) */}
      <div id="google_translate_element" className="hidden"></div>

      <nav className="fixed left-0 right-0 top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2.5">
        <div className="flex justify-between items-center">
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onMenuClick}
          >
            <svg
              className="w-6 h-6 text-gray-900 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* LEFT */}
          <div className="flex items-center">
            <a href="/" className="flex items-center mr-6">
              <video
                src="public/videoTeamcoreLogo.mp4"
                className="mr-3 h-9 w-9 rounded-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="flex flex-col items-start">
                <span className="text-4xl font-semibold text-black dark:text-white">TeamCore</span>

              </div>
            </a>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button - disponible para todos */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.828-2.828a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm.464-4.536l.707-.707a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414zm-2.828 2.828a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM3 11a1 1 0 110-2 1 1 0 010 2zm7-7a1 1 0 110-2 1 1 0 010 2zm0 14a1 1 0 110-2 1 1 0 010 2zm-7-7a1 1 0 110-2 1 1 0 010 2zm14 0a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd"></path>
                </svg>
              )}
            </button>

            {estaLogeado()}
          </div>
        </div>
      </nav>
    </div>
  )
}


