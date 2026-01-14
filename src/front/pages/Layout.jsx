import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SidebarLayout from "../components/Sidebar";
import Footer from "../components/Footer";
import Dashboard from "./Dashboard";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar siempre arriba */}
      <Navbar />

      {/* Zona central: sidebar + contenido */}
      <div className="flex flex-1 overflow-hidden">
        <SidebarLayout />
        
    
      </div>
      

      {/* Footer  */}
     <Footer />
    </div>
  );
};