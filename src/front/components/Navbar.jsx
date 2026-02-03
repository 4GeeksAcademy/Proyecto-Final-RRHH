import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Navigate } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userOpen, setUserOpen] = useState(false);
  const [status, setStatus] = useState("activo");
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English (US)');
  const token = localStorage.getItem("jwt-token");

  const [user, setUser] = useState(null);

  const [reuniones, setReuniones] = useState([]);

  const { store, dispatch } = useGlobalReducer();

  const logout = () => {
    dispatch({ type: "logout" });
    return <Navigate to="/" replace />;
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/usuario", {
          headers: { Authorization: "Bearer " + token }
        });

        if (!resp.ok) throw new Error("No se pudo cargar el usuario");

        const data = await resp.json();
        setUser(data.usuario);
        console.log("Usuario logueado:", data.usuario);
      } catch (error) {
        console.error("Error cargando usuario:", error);
      }
    };

    fetchUser();
  }, []);



  // Verifica que Google Translate se cargó
  useEffect(() => {
    const checkGoogleTranslate = setInterval(() => {
      if (window.google && window.google.translate) {
        console.log('Google Translate cargado correctamente');
        clearInterval(checkGoogleTranslate);
      }
    }, 500);

    return () => clearInterval(checkGoogleTranslate);
  }, []);

  const statusColors = {
    activo: "bg-green-500",
    ausente: "bg-yellow-400",
    ocupado: "bg-red-500",
    "no molestar": "bg-gray-800",
  };

  const languages = [
    { name: 'English (US)', code: 'en' },
    { name: 'Deutsch', code: 'de' },
    { name: 'Italiano', code: 'it' },
    { name: '中文 (繁體)', code: 'zh-TW' },
  ];

  const changeLanguage = (langCode) => {
    console.log('Cambiando idioma a:', langCode);
    setSelectedLang(languages.find(l => l.code === langCode)?.name || 'English (US)');
    setLangOpen(false);

    const select = document.querySelector('select.goog-te-combo');
    console.log('Selector encontrado:', select);

    if (select) {
      console.log('Valor actual del selector:', select.value);
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
      console.log('Evento change disparado');
    } else {
      console.error('Selector de Google Translate no encontrado');
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

  const estaLogeado = () => {
    if (store.is_active === true) {
      return (
        <div className="flex items-center gap-3 relative">
          {/* User Avatar & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="relative flex rounded-full focus:ring-2 focus:ring-gray-300"
            >
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 hover:bg-gray-400 rounded-full">
                <span className="font-medium text-body">{user?.nombre.charAt(0)}{user?.apellidos.charAt(0)}</span>
              </div>
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColors[status]}`}></span>
            </button>

            {userOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                {/* USER INFO */}
                <div className="p-4">
                  <p className="font-semibold text-black text-center">{user?.nombre || "Cargando..."}</p>
                  <p className="text-sm text-gray-500 text-center">{user?.email || "Cargando..."}</p>
                </div>
                {/* ACTIONS */}
                <ul className="text-sm text-gray-700">
                  <li className="flex items-center gap-3 border-t border-b px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link to={`/mi-perfil/${user.id}`}>Mi perfil</Link>
                  </li>

                  {/* SIGN OUT */}
                  <li className="flex items-center justify-content-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer">
                    <Link to="/" onClick={logout}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-medium text-black">Sign out</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="antialiased bg-white pt-16">
      {/* Google Translate widget (oculto) */}
      <div
        id="google_translate_element"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
      ></div>

      <nav className="fixed left-0 right-0 top-0 z-50 bg-white border-b border-gray-200 px-4 py-2.5">
        <div className="flex justify-between items-center">
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={onMenuClick}
          >
            <svg
              className="w-6 h-6 text-black"
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
              <img
                src="src/front/assets/img/logo.png"
                className="mr-3 h-8 rounded-full"
                alt="Logo"
              />
              <span className="text-2xl font-semibold text-black">TeamCore</span>
            </a>
          </div>

          {/* RIGHT */}
          {estaLogeado()}
        </div>
      </nav>
    </div>
  );
}