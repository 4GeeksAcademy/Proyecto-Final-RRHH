import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom"; // Añadido useNavigate
import useGlobalReducer from '../hooks/useGlobalReducer';

export default function Navbar({ onMenuClick }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userOpen, setUserOpen] = useState(false);
  const [status, setStatus] = useState("activo");
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English (US)');
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook para redirección limpia

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const { store, dispatch } = useGlobalReducer();

  const logout = (e) => {
    e.preventDefault(); // Prevenimos comportamiento por defecto del link
    dispatch({ type: "logout" });
    navigate("/"); // Redirección manual
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("jwt-token");
      if (!token) return;
      try {
        // CORRECCIÓN: Usamos la ruta exacta definida en routes.py
        const resp = await fetch("/api/usuario-actual", {
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
          }
        });

        if (!resp.ok) throw new Error("No se pudo cargar el usuario");

        const data = await resp.json();
        // CORRECCIÓN: El backend devuelve el objeto directamente, no {usuario: user}
        setUser(data);
      } catch (error) {
        console.error("Error cargando usuario:", error);
      }
    };

    fetchUser();
  }, [store.is_active]); // Re-ejecutar si cambia el estado de login

  // ... (tus otros useEffects de Google Translate y DarkMode se mantienen igual)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

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
    setSelectedLang(languages.find(l => l.code === langCode)?.name || 'English (US)');
    setLangOpen(false);
    const select = document.querySelector('select.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  };

  const estaLogeado = () => {
    if (store.is_active === true) {
      return (
        <div className="flex items-center gap-3 relative">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-black dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-50">
                <div className="p-4 font-semibold text-center text-black dark:text-white border-b border-gray-200 dark:border-gray-700">Notifications</div>
                <div className="p-4 text-sm text-gray-600 dark:text-gray-300">No new notifications</div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="relative flex rounded-full focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-full">
                <span className="font-medium text-body dark:text-white uppercase">
                  {user?.nombre?.charAt(0) || 'U'}
                  {user?.apellidos?.charAt(0) || ''}
                </span>
              </div>
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColors[status]}`}></span>
            </button>

            {userOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
                <div className="p-4">
                  <p className="font-semibold text-black dark:text-white truncate">{user?.nombre || "Usuario"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || "Email"}</p>
                </div>

                <div className="px-4 py-2 border-y border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">Estado</p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {Object.keys(statusColors).map((s) => (
                      <li key={s} onClick={() => setStatus(s)} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer capitalize">
                        <span className={`w-2 h-2 rounded-full ${statusColors[s]}`}></span>{s}
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className="text-sm text-gray-700 dark:text-gray-300">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">My profile</li>


                 

                  {/* Idiomas */}
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => setLangOpen(!langOpen)}>
                    🌐 {selectedLang}
                  </li>

                  {/* SIGN OUT -*/}
                  <li className="border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-semibold">Sign out</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

   return (
    <div className="antialiased bg-white dark:bg-gray-900">
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      <nav className="fixed left-0 right-0 top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2.5">
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button className="md:hidden p-2 mr-2" onClick={onMenuClick}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            
         
            <Link to="/" className="flex items-center">
              <img src="src/front/assets/img/logo.png" className="mr-3 h-8 rounded-full" alt="Logo" />
              <span className="text-2xl font-bold dark:text-white">TeamCore</span>
            </Link>
          </div>

          {estaLogeado()}
        </div>
      </nav>
    </div>
  );
}
