import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { ReactComponent as Search } from "../assets/search-icon.svg";
import LapFix from "../assets/WhatsApp Image 2025-05-25 at 1.49.38 PM.jpeg";

const Header = ({ toggleSidebar, toggleSearchBar }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/", { state: { fromHeader: true } });
  };

  return (
    <div>
      <div className="bg-yellow-300 text-black text-center py-2 font-semibold animate-blink">
        🚧 Our website is under development. For any product inquiries, please
        contact: 📞 9999229332 / 9999449337 / 9999009336 / 9999700766
      </div>

      <header className="bg-black text-white p-4 relative">
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
          <button onClick={handleLogoClick} className="w-36  mx-auto py-1">
            <img
              className="w-full h-full object-contain"
              src={LapFix}
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
    </div>
  );
};

export default Header;
