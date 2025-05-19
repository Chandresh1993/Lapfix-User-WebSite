import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="workspace flex h-screen overflow-hidden relative">
      {/* Sidebar - Always hidden unless toggled */}
      <div
        className={`absolute z-40 inset-y-0 left-0 w-64 
        bg-white transition-transform duration-300 ease-in-out 
        transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* Overlay with semi-transparent background */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="overflow-y-auto transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
