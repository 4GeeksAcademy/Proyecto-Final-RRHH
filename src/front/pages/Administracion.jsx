import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function Administracion() {

  const { store, dispatch } = useGlobalReducer();
  const token = localStorage.getItem("jwt-token");

  const getDataUsers = async () => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/usuarios",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Usuarios:", data);
      return data;
    } else {
      console.log("Error: ", response.status, response.statusText);
      return null;
    }
  };

  const getDataRoles = async () => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/roles",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Roles: ", data);
      return data;
    } else {
      console.log("Error: ", response.status, response.statuText);
      return null;
    }
  };

  const getDataHorarios = async () => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/horarios",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Horarios: ", data);
      return data;
    } else {
      console.log("Error: ", response.status, response.statuText);
      return null;
    }
  };

  useEffect(() => {
    getDataUsers().then(data => {
      if (data) {
        dispatch({
          type: "get_users",
          payload: { usuarios: data.usuarios }
        });
      }
    });

    getDataRoles().then(data => {
      if (data) {
        dispatch({
          type: "get_roles",
          payload: { roles: data.roles }
        });
      }
    });

    getDataHorarios().then(data => {
      if (data) {
        dispatch({
          type: 'get_horarios',
          payload: { horarios: data.horarios }
        });
      }
    });
  }, []);

  function eliminarHorario(id) {
    fetch(import.meta.env.VITE_BACKEND_URL + `/api/horario/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'eliminar_horario', payload: { id_horario: id } });
        console.log("Estado eliminar horario:", data);
      })
      .catch(error => console.log("Error en eliminar horario:", error));
  };

  function eliminarRol(id) {
    fetch(import.meta.env.VITE_BACKEND_URL + `/api/rol/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'eliminar_rol', payload: { id_rol: id } });
        console.log("Estado de eliminar rol:", data)
      })
      .catch(error => console.log("Error en eliminar horario:", error))
  };

  function eliminarUsuario(id) {
    fetch(import.meta.env.VITE_BACKEND_URL + `/api/usuario/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then(async response => {
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'No se pudo eliminar el usuario');
        }

        return response.json();
      })
      .then(data => {
        dispatch({ type: 'eliminar_usuario', payload: { id_usuario: id } });
        console.log("Estado de eliminar usuario:", data);
      })
      .catch(error => console.log("·Error en eliminar usuario:", error))
  };

  const dataTablesuarios = () => {
    return store.usuarios.map((usuario) => {
      return (
        <tr className="bg-white hover:bg-gray-50">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
              <span className="font-medium text-body">{usuario.nombre.charAt(0)}{usuario.apellidos.charAt(0)}</span>
            </div>
          </th>
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {usuario?.nombre} {usuario.apellidos}
          </th>
          <td className="px-6 py-4">
            {usuario.email}
          </td>
          <td className="px-6 py-4">
            {usuario.dni}
          </td>
          <td className="px-6 py-4">
            {usuario.telefono ? usuario.telefono : '-'}
          </td>
          <td className="px-6 py-4">
            {usuario.rol.nombre}
          </td>
          <td className="px-6 py-4">
            {usuario.horario}
          </td>
          <td className="px-6 py-4 text-right flex">
            <Link to={`/editar-usuario/${usuario.id}`} className="font-medium text-blue-600 hover:underline"><i className="fa-regular fa-pen-to-square"></i></Link>
            <a href="#" onClick={() => eliminarUsuario(usuario.id)} className="ml-3 font-medium text-red-600 hover:underline"><i className="fa-solid fa-trash-can"></i></a>
          </td>
        </tr>
      )
    })
  };

  const dataTableHorarios = () => {
    return store.horarios.map((horario) => {
      return (
        <tr className="bg-white hover:bg-gray-50">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {horario.name}
          </th>
          <td className="px-6 py-4">
            {horario.lunes_entrada} - {horario.lunes_salida}
          </td>
          <td className="px-6 py-4">
            {horario.martes_entrada} - {horario.martes_salida}
          </td>
          <td className="px-6 py-4">
            {horario.miercoles_entrada} - {horario.miercoles_salida}
          </td>
          <td className="px-6 py-4">
            {horario.jueves_entrada} - {horario.jueves_salida}
          </td>
          <td className="px-6 py-4">
            {horario.viernes_entrada} - {horario.viernes_salida}
          </td>
          <td className="px-6 py-4">
            {horario.sabado_entrada && horario.sabado_salida ? `${horario.sabado_entrada} - ${horario.sabado_salida}` : '-'}
          </td>
          <td className="px-6 py-4">
            {horario.domingo_entrada && horario.domingo_salida ? `${horario.domingo_entrada} - ${horario.domingo_salida}` : '-'}
          </td>
          <td className="px-6 py-4 text-right flex">
            <Link to={`/editar-horario/${horario.id}`} className="font-medium text-blue-600 hover:underline"><i className="fa-regular fa-pen-to-square"></i></Link>
            <a href="#" onClick={() => eliminarHorario(horario.id)} className="ml-3 font-medium text-red-600 hover:underline"><i className="fa-solid fa-trash-can"></i></a>
          </td>
        </tr>
      )
    })
  };

  const dataTableRoles = () => {
    return store.roles.map((rol) => {
      return (
        <tr className="bg-white hover:bg-gray-50">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {rol.nombre}
          </th>
          <td className="px-6 py-4">
            <div className="flex items-center">
              <input disabled defaultChecked={rol.es_admin} id="disabled-checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              <input disabled defaultChecked={rol.puede_crear_reunion} id="disabled-checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2" />
            </div>
          </td>
          <td className="px-6 py-4 text-right flex">
            <Link to={`/editar-rol/${rol.id}`} className="font-medium text-blue-600 hover:underline"><i className="fa-regular fa-pen-to-square"></i></Link>
            <a href="#" onClick={() => eliminarRol(rol.id)} className="ml-3 font-medium text-red-600 hover:underline"><i className="fa-solid fa-trash-can"></i></a>
          </td>
        </tr>
      )
    })
  }

  return (
    <section className="p-6 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Gestión de Usuarios</h1>
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
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
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
                {dataTablesuarios()}
              </tbody>
            </table>
          </div>
        </div>
        <div id="styled-dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
          {/* CONTENIDO DE ROLES */}
          <div className="w-full flex justify-end mb-5">
            <Link to="/crear-rol">
              <button type="button" className="px-4 py-2 text-sm font-medium text-blue-800 bg-blue-200 border border-blue-200 rounded-lg hover:bg-blue-300 hover:text-blue-900 focus:ring-1">Crear Rol</button>
            </Link>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
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
                  <th scope="col" className="w-10 px-6 py-3 text-right">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataTableRoles()}
              </tbody>
            </table>
          </div>
        </div>
        <div id="styled-settings" role="tabpanel" aria-labelledby="settings-tab">
          {/* CONTENIDO DE HORARIOS */}
          <div className="w-full flex justify-end mb-5">
            <Link to="/crear-horario">
              <button type="button" className="px-4 py-2 text-sm font-medium text-blue-800 bg-blue-200 border border-blue-200 rounded-lg hover:bg-blue-300 hover:text-blue-900 focus:ring-1">Crear Horario</button>
            </Link>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
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
                {dataTableHorarios()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}