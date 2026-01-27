import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Navigate } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [status, setStatus] = useState("activo");

  //pantalla en negro
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const { store, dispatch } = useGlobalReducer();

  const logout = () => {
    dispatch({ type: "logout" });
    return <Navigate to="/" replace />;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("jwt-token");

      if (!token) return <Navigate to="/" replace />;

      const resp = await fetch("/api/reuniones", {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      if (resp.status === 401 || resp.status === 422) {
        localStorage.removeItem("jwt-token");
        return <Navigate to="/" replace />;
      }

      const data = await resp.json();
      setUser(data);
    };

    fetchUser();
  }, []);


  //Verifica que Google Translate se cargó
  useEffect(() => {
    const checkGoogleTranslate = setInterval(() => {
      if (window.google && window.google.translate) {
        console.log('✅ Google Translate cargado correctamente');
        clearInterval(checkGoogleTranslate);
      }
    }, 500);

    return () => clearInterval(checkGoogleTranslate);
  }, []);
  // pantalla dark
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Estados para el selector de idiomas
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English (US)');
  const dropdownRef = useRef(null);

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
      console.log('✅ Evento change disparado');
    } else {
      console.error('❌ Selector de Google Translate no encontrado');
    }
  };

  const statusColors = {
    activo: "bg-green-500",
    ausente: "bg-yellow-400",
    ocupado: "bg-red-500",
    "no molestar": "bg-gray-800",
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
    <div className="antialiased bg-white pt-16">
      {/* Widget oculto */}
      <div
        id="google_translate_element"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
      ></div>

      <nav className="fixed left-0 right-0 top-0 z-50 bg-white border-b border-gray-200 px-4 py-2.5">
        <div className="flex justify-between items-center">

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
          <div className="flex items-center gap-3 relative">

            {/* Notifications */}
            <div className="relative">
              <button>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-black rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                {notificationsOpen}
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                  <div className="p-4 font-semibold text-center text-black border-b">Notifications</div>
                  <div className="p-4 text-sm text-gray-600">No new notifications</div>
                  <div className="p-4 font-semibold text-center text-black border-b">Notifications</div>
                  <div className="p-4 text-sm text-gray-600">No new notifications</div>
                  <div className="p-4 font-semibold text-center text-black border-b">Notifications</div>
                  <div className="p-4 text-sm text-gray-600">No new notifications</div>
                </div>
              )}
            </div>

            {/* User Avatar & Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserOpen(!userOpen)}
                className="relative flex rounded-full focus:ring-2 focus:ring-gray-300"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png  "
                  alt="user"
                />
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColors[status]}`}></span>
              </button>

              {userOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                  {/* USER INFO */}
                  <div className="p-4">
                    <p className="font-semibold text-black">Neil Sims</p>
                    <p className="text-sm text-gray-500">name@flowbite.com</p>
                  </div>

                  {/* STATUS SECTION */}
                  <div className="px-4 py-2 border-y">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">Estado</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {Object.keys(statusColors).map((s) => (
                        <li
                          key={s}
                          onClick={() => setStatus(s)}
                          className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer capitalize"
                        >
                          <span className={`w-2 h-2 rounded-full ${statusColors[s]}`}></span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ACTIONS */}
                  <ul className="text-sm text-gray-700">
                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <span>My profile</span>
                    </li>
                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <span>Settings</span>
                    </li>


                    <li className="px-4 py-2 border-t border-b bg-gray-50">
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="flex items-center justify-between w-full text-sm font-medium"
                      >
                        <div className="flex items-center gap-2">
                          {darkMode ? (
                            <i className="bi bi-brightness-high text-yellow-400"></i>
                          ) : (
                            <i className="bi bi-moon text-gray-700"></i>
                          )}
                          <span>{darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
                        </div>
                        <div className={`relative inline-block w-10 h-6 rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-300'
                          }`}>
                          <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0'
                            }`}></div>
                        </div>
                      </button>
                    </li>
                    {/*IDIOMAS*/}
                    <li className="relative border-t border-b bg-gray-50">
                      <button
                        onClick={() => setLangOpen(!langOpen)}
                        className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                      >
                        <div className="flex items-center gap-2">
                          🌐 <span>{selectedLang}</span>
                        </div>
                        <svg className={`w-4 h-4 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>

                      {langOpen && (
                        <div className="bg-white border-t">
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setSelectedLang(lang.name);
                                setLangOpen(false);
                                // Redirigir a Google Translate, una vez con recel deberia de traducirlo directamente 
                                const currentUrl = window.location.href;
                                const googleTranslateUrl = `https://translate.google.com/translate?hl=${lang.code}&sl=auto&tl=${lang.code}&u=${encodeURIComponent(currentUrl)}`;
                                window.open(googleTranslateUrl, '_blank');
                              }}
                              className="flex items-center w-full px-8 py-2 text-xs hover:bg-blue-50 text-left"
                            >
                              {lang.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </li>
                    {/* SIGN OUT */}
                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer">
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
        </div>
      </nav>
    </div>
  )
}