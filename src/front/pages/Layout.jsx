import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarLayout from "../components/Sidebar";

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      {/* Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      {/* Zona central */}
      <div className="flex flex-1 pt-14 bg-white dark:bg-gray-950">
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
