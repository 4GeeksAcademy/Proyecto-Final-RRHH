// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import Fichaje from "./pages/Fichaje";
import Mensajes from "./pages/Mensajes";
import Reuniones from "./pages/Reuniones";
import Tareas from "./pages/Tareas";
import Calendario from "./pages/Calendario";
import Notificaciones from "./pages/Notificaciones";
import Administracion from "./pages/Administracion";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CrearUsuario from "./pages/CrearUsuario";


export const router = createBrowserRouter(
    createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

      // Root Route: All navigation will start from here.
    <>
      {/*Ruta Publica*/}
       <Route path= "/login" element={<Login />} />

        {/*Ruta Privada*/}
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path="/home" element={<Home />} />
        <Route path= "/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path= "/fichaje" element={<ProtectedRoute><Fichaje /></ProtectedRoute>} />
        <Route path= "/mensajes" element={<ProtectedRoute><Mensajes /></ProtectedRoute>} />
        <Route path= "/reuniones" element={<ProtectedRoute><Reuniones /></ProtectedRoute>} />
        <Route path= "/tareas" element={<ProtectedRoute><Tareas /></ProtectedRoute>} />
        <Route path= "/calendario" element={<ProtectedRoute><Calendario /></ProtectedRoute>} />
        <Route path= "/notificaciones" element={<ProtectedRoute><Notificaciones /></ProtectedRoute>} />
        <Route path= "/administracion" element={<ProtectedRoute><Administracion /></ProtectedRoute>} />
        <Route path= "/crear-usuario" element={<ProtectedRoute><CrearUsuario /></ProtectedRoute>} />
        

      </Route>
    </>
    )
);