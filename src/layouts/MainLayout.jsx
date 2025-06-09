import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar"; // 👈 import the new component

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  return (
    <div className=" workspace  flex h-screen overflow-hidden relative">
      {/* Sidebar */}
      <div
        className={`absolute z-40 inset-y-0 left-0 w-72 
        bg-white transition-transform duration-300 ease-in-out 
        transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Search Bar Drawer */}
      <div
        className={`absolute z-40 inset-y-0 left-0 w-80 
        bg-white transition-transform duration-300 ease-in-out 
        transform ${isSearchOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SearchBar onClose={() => setSearchOpen(false)} />
      </div>

      {isSearchOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setSearchOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} toggleSearchBar={toggleSearch} />
        <main className="overflow-y-auto transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
