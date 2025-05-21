import { useNavigate } from "react-router-dom";
import logo from "../assets/footer-logo.png";
import { Menu } from "lucide-react";
import { ReactComponent as Search } from "../assets/search-icon.svg";
import { SlidersHorizontal, ArrowDownUp } from "lucide-react";

const Header = ({ toggleSidebar, toggleSearchBar }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div>
      <header className="bg-blue-800 text-white p-4 relative">
        {/* Search Icon Button */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 h-10">
          <button
            onClick={toggleSearchBar}
            className="w-10 h-10 flex items-center justify-center"
          >
            <Search className="w-full h-full fill-white cursor-pointer" />
          </button>
        </div>

        {/* Center Logo */}
        <div className="flex items-center justify-center relative">
          <button onClick={handleLogoClick} className="w-36 mx-auto">
            <img
              className="w-full h-full object-contain"
              src={logo}
              alt="logo"
            />
          </button>

          {/* Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="absolute cursor-pointer right-0 top-1/2 transform -translate-y-1/2 p-2 text-white"
          >
            <Menu className="cursor-pointer" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 items-center">
        <div className="border border-gray-300 p-4 flex items-center justify-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          <button>Filters</button>
        </div>
        <div className="border border-gray-300 p-4 flex items-center justify-center gap-2">
          <ArrowDownUp className="w-5 h-5" />
          <button>Sort By</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
