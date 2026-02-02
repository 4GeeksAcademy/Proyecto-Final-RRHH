import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarLayout from "../components/Sidebar";

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Nota: El Navbar ya se encarga de poner la clase 'dark' en el <html>
  // pero este contenedor necesita tener el fondo correcto.

  return (
    /* 1. Fondo dinámico a toda la pantalla */
    <div className="min-h-screen flex flex-col bg-white bg-gray-900 transition-colors duration-300">

      {/* Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      {/* 2. La Zona central también necesita el fondo para no dejar huecos */}
      <div className="flex flex-1 pt-14 bg-white bg-gray-900">
        <SidebarLayout
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
