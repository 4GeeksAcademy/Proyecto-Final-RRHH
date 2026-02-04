import { Link, Outlet } from "react-router-dom";

export default function SidebarLayout({ isOpen, onClose }) {
    return (
        <>
            {/* OVERLAY oscuro en móvil */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
          fixed top-0 left-0 z-40
          w-64 h-screen pt-14
          bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
                aria-label="Sidenav"
            >
                <div className="overflow-y-auto py-5 px-3 h-full">
                    <ul className="space-y-2">
                        <li className="border-b border-gray-300 dark:border-gray-700">
                            <div className="flex items-center p-4 justify-between">
                                <span className="font-bold text-2xl text-black dark:text-white">
                                    Portal Trabajo
                                </span>

                                {/* Botón cerrar SOLO en móvil */}
                                <button
                                    className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white"
                                    onClick={onClose}
                                >
                                    ✕
                                </button>
                            </div>
                        </li>

                        {/* DASHBOARD */}
                        <li>
                            <Link
                                to="/"
                                className="flex items-center p-2 rounded-lg text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={onClose}
                            >
                                <svg className="w-6 h-6 text-gray-800 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z" />
                                </svg>
                                <span className="ml-3">Panel de Control</span>
                            </Link>
                        </li>

                        {/* FICHAJE */}
                        <li>
                            <Link
                                to="/fichaje"
                                className="flex items-center p-2 rounded-lg text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={onClose}
                            >
                                <svg className="w-6 h-6 text-gray-800 dark:text-gray-400" viewBox="0 0 24 24" fill="none">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span className="ml-3">Fichaje</span>
                            </Link>
                        </li>

                        {/* REUNIONES */}
                        <li>
                            <Link
                                to="/reuniones"
                                className="flex items-center p-2 rounded-lg text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={onClose}
                            >
                                <svg className="w-6 h-6 text-gray-800 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                </svg>
                                <span className="ml-3">Reuniones</span>
                            </Link>
                        </li>

                        {/* TAREAS */}
                        <li>
                            <Link
                                to="/tareas"
                                className="flex items-center p-2 rounded-lg text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={onClose}
                            >
                                <svg className="w-6 h-6 text-gray-800 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 1 0-18c1.052 0 2.062.18 3 .512M7 9.577l3.923 3.923 8.5-8.5M17 14v6m-3-3h6" />
                                </svg>
                                <span className="ml-3">Tareas</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/calendario"
                                className="flex items-center p-2 rounded-lg text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={onClose}
                            >
                                <svg className="w-6 h-6 text-gray-800 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                                </svg>
                                <span className="ml-3">Calendario</span>
                            </Link>
                        </li>


                        {/* ADMIN */}
                        <li>
                            <a href="/administracion"
                                className="flex items-center p-2 rounded-lg text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={onClose}
                            >
                                <svg className="w-6 h-6 text-gray-800 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                <span className="ml-3">Administración</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <main
                className="
          flex-1 
          pt-20 
          p-6 
          min-h-screen 
          bg-gray-50 dark:bg-gray-950
          transition-all
          md:ml-64
        "
            >
                <Outlet />
            </main>
        </>
    );
}
