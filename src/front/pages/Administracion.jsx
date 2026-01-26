import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function Administracion() {

  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const getDataUsers = async () => {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/usuarios");
      if (response.ok) {
        const data = await response.json();
        console.log("Usuarios:", data);
        return data;
      } else {
        console.log("Error: ", response.status, response.statusText);
        return { error: { status: response.status, statusText: response.statusText } }
      }
    };

    getDataUsers().then(data => {
      dispatch({ type: 'get_users', payload: { usuarios: data } });
    });
  }, []);

  return (
    <section className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Administración de Usuarios</h1>
      <div className="mb-4 border-b border-gray-400">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content" data-tabs-active-classes="text-purple-600 hover:text-purple-600 border-purple-600" data-tabs-inactive-classes="text-gray-500 hover:text-gray-600 border-none hover:border-gray-300" role="tablist">
          <li className="me-2" role="presentation">
            <button className="flex inline-flex items-center p-4 border-b-2 rounded-t-lg" id="profile-styled-tab" data-tabs-target="#styled-profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>Usuarios</button>
          </li>
          <li className="me-2" role="presentation">
            <button className="flex inline-flex items-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300" id="dashboard-styled-tab" data-tabs-target="#styled-dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false"><svg className="w-3 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
            </svg>Roles</button>
          </li>
          <li className="me-2" role="presentation">
            <button className="flex inline-flex items-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300" id="settings-styled-tab" data-tabs-target="#styled-settings" type="button" role="tab" aria-controls="settings" aria-selected="false"><svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
            </svg>
              Horarios</button>
          </li>
        </ul>
      </div>
      <div id="default-styled-tab-content">
        {/* CONTENIDO DE USUARIOS */}
        <div id="styled-profile" role="tabpanel" aria-labelledby="profile-tab">
          <div className="w-full flex justify-end mb-5">
            <Link to="/crear-usuario">
              <button type="button" className="px-4 py-2 text-sm font-medium text-blue-800 bg-blue-200 border border-blue-200 rounded-lg hover:bg-blue-300 hover:text-blue-900 focus:ring-1">Crear Usuario</button>
            </Link>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Imagen</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Usuario
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DNI
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Teléfono
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Rol
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Horario
                  </th>
                  <th scope="col" className="w-10 px-6 py-3 text-right">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {store.usuarios.map((usuario) => {
                  return (
                    <tr className="bg-white hover:bg-gray-50">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                          <img
                            className="w-8 h-8 rounded-full"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                            alt="user"
                          />
                        </div>
                      </th>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        Pere Ayats
                      </th>
                      <td className="px-6 py-4">
                        pereayats@gmail.com
                      </td>
                      <td className="px-6 py-4">
                        12345678TA
                      </td>
                      <td className="px-6 py-4">
                        123456789
                      </td>
                      <td className="px-6 py-4">
                        Jefe IT
                      </td>
                      <td className="px-6 py-4">
                        Intensivo Verano
                      </td>
                      <td className="px-6 py-4 text-right flex">
                        <a href="#" className="font-medium text-blue-600 hover:underline"><i class="fa-regular fa-pen-to-square"></i></a>
                        <a href="#" className="ml-3 font-medium text-red-600 hover:underline"><i class="fa-solid fa-trash-can"></i></a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div id="styled-dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
          {/* CONTENIDO DE ROLES */}
          <div className="w-full flex justify-end mb-5">
            <Link to="">
              <button type="button" className="px-4 py-2 text-sm font-medium text-blue-800 bg-blue-200 border border-blue-200 rounded-lg hover:bg-blue-300 hover:text-blue-900 focus:ring-1">Crear Rol</button>
            </Link>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Es Admin
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Crear Reuniones
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Compartir Reuniones
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Invitar Proyectos
                  </th>
                  <th scope="col" className="w-10 px-6 py-3 text-right">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Jefe IT
                  </th>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <input disabled checked id="disabled-checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <input disabled id="disabled-checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <input disabled id="disabled-checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <input disabled checked id="disabled-checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right flex">
                    <a href="#" className="font-medium text-blue-600 hover:underline"><i class="fa-regular fa-pen-to-square"></i></a>
                    <a href="#" className="ml-3 font-medium text-red-600 hover:underline"><i class="fa-solid fa-trash-can"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div id="styled-settings" role="tabpanel" aria-labelledby="settings-tab">
          {/* CONTENIDO DE HORARIOS */}
          <div className="w-full flex justify-end mb-5">
            <Link to="">
              <button type="button" className="px-4 py-2 text-sm font-medium text-blue-800 bg-blue-200 border border-blue-200 rounded-lg hover:bg-blue-300 hover:text-blue-900 focus:ring-1">Crear Horario</button>
            </Link>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lunes
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Martes
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Miercoles
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Jueves
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Viernes
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sábado
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Domingo
                  </th>
                  <th scope="col" className="w-10 px-6 py-3 text-right">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Intensivo Verano
                  </th>
                  <td className="px-6 py-4">
                    07:30 - 13:30
                  </td>
                  <td className="px-6 py-4">
                    07:30 - 13:30
                  </td>
                  <td className="px-6 py-4">
                    07:30 - 13:30
                  </td>
                  <td className="px-6 py-4">
                    07:30 - 13:30
                  </td>
                  <td className="px-6 py-4">
                    07:30 - 13:30
                  </td>
                  <td className="px-6 py-4">
                    -
                  </td>
                  <td className="px-6 py-4">
                    -
                  </td>
                  <td className="px-6 py-4 text-right flex">
                    <a href="#" className="font-medium text-blue-600 hover:underline"><i class="fa-regular fa-pen-to-square"></i></a>
                    <a href="#" className="ml-3 font-medium text-red-600 hover:underline"><i class="fa-solid fa-trash-can"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}