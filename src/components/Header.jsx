import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { ReactComponent as Search } from "../assets/search-icon.svg";
import logo from "../assets/Lapfix-01.svg";

const Header = ({ toggleSidebar, toggleSearchBar }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/", { state: { fromHeader: true } });
  };

  return (
    <div>
      <header className="bg-white  p-4 relative drop-shadow-md ">
        {/* Search Icon Button */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 h-10">
          <button
            onClick={toggleSearchBar}
            className="w-10 h-10 flex items-center justify-center"
          >
            <Search className="w-full h-full fill-black cursor-pointer" />
          </button>
        </div>

        {/* Center Logo */}
        <div className=" flex items-center justify-center relative">
          {/* <button onClick={handleLogoClick} className="mx-auto">
            <img src={logo} alt="Logo" className="h-12 object-contain" />
          </button> */}

          {/* Sidebar Toggle */}

          <button
            onClick={toggleSidebar}
            className="absolute cursor-pointer right-0 top-1/2 transform -translate-y-1/2 p-2 text-black"
          >
            <Menu className="fill-black cursor-pointer" />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
