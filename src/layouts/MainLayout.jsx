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
      {/* Mobile Sidebar */}
      <div
        className={`fixed z-40 inset-y-0 left-0 w-64 
              transition-transform duration-500 ease-in-out 
              transform md:relative md:translate-x-0 md:transition-none
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* Mobile Backdrop (optional) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col ">
        <Header toggleSidebar={toggleSidebar} />
        <main className="overflow-y-auto transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
