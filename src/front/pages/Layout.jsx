import React from 'react';  // ← ¡IMPORTANTE!
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarLayout from "../components/Sidebar";

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode') || 'false');
  });


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col">
    
      <Navbar 
        onMenuClick={() => setSidebarOpen(true)} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />

      <div className="flex flex-1 pt-14">
   
        <SidebarLayout
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          darkMode={darkMode}
        />
     
        <main className={`flex-1 p-6 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {React.Children.map(children, child =>
            React.cloneElement(child, { darkMode })
          )}
        </main>
      </div>

  
      <Footer darkMode={darkMode} />
    </div>
  );
};