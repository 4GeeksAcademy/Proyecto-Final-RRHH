import { Link, Outlet } from "react-router-dom";

export default function SidebarLayout() {
    return (
        <>
            {/* SIDEBAR */}
            <aside
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 bg-white border-r border-gray-200  "
                aria-label="Sidenav"
            >
                <div className="overflow-y-auto py-5 px-3 h-full">
                    <ul className="space-y-2">

                        {/* TITULO */}
                        <li className="border-b border-gray-300">
                            <div className="flex items-center p-4">
                                <span className="font-bold text-2xl text-black ">
                                    Portal Trabajo
                                </span>
                            </div>
                        </li>

                        {/* DASHBOARD */}
                        <li>
                            <Link
                                to="/dashboard"
                                className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100  "
                            >
                                <svg class="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z" />
                                </svg>

                                <span className="ml-3">Panel de Control</span>
                            </Link>
                        </li>

                        {/* FICHAJE */}
                        <li>
                            <Link
                                to="/fichaje"
                                className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100  "
                            >
                                <svg
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                <span className="ml-3">Fichaje</span>
                            </Link>
                        </li>

                        {/* MENSAJES */}
                        <li>
                            <Link
                                to="/mensajes"
                                className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100  "
                            >
                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.029-4.46a2 2 0 0 0-1.942 0L3 8m18 0-9 6.5L3 8" />
                                </svg>

                                <span className="ml-3">Mensajes</span>
                                <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                    4
                                </span>
                            </Link>

                        </li>

                        {/* REUNIONES */}
                        <li>
                            <Link
                                to="/reuniones"
                                className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100"
                            >
                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                </svg>



                                <span className="ml-3">Reuniones</span>
                            </Link>
                        </li>

                        {/* TAREAS */}
                        <li>
                            <Link
                                to="/tareas"
                                className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100  "
                            >
                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 1 0-18c1.052 0 2.062.18 3 .512M7 9.577l3.923 3.923 8.5-8.5M17 14v6m-3-3h6" />
                                </svg>




                                <span className="ml-3">Tareas</span>
                            </Link>
                        </li>

                        {/* CALENDARIO */}
                        <li>
                            <Link
                                to="/calendario"
                                className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100  "
                            >
                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                                </svg>




                                <span className="ml-3">Calendario</span>
                            </Link>
                        </li>

                        {/* NOTIFICACIONES */}
                        <li>
                            <Link
                                to="/notificaciones"
                                className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100  "
                            >
                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" />
                                </svg>


                                <span className="ml-3">Notificaciones</span>
                            </Link>
                        </li>

                        {/* ADMIN */}
                        <li>
                            <Link
                                to="/administracion"
                                className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100  "
                            >
                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>




                                <span className="ml-3">Administración</span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <main className="ml-64 pt-14 p-6 flex grow">
                <Outlet />
            </main>
        </>
    );
}