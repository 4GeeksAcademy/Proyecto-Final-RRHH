import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarLayout from "../components/Sidebar";

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  //dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      {/* Zona central */}
      <div className="flex flex-1 pt-14">
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
