import logo from "../assets/footer-logo.png";
import { Menu } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-blue-800 text-white p-4 relative">
      <div className="flex items-center justify-center relative">
        {/* Logo centered */}
        <div className="w-36 mx-auto">
          <img className="w-full h-full object-contain" src={logo} alt="logo" />
        </div>

        {/* Menu icon fixed to the right */}
        <button
          onClick={toggleSidebar}
          className="absolute cursor-pointer right-0 top-1/2 transform -translate-y-1/2 p-2 text-white"
        >
          <Menu className="cursor-pointer" />
        </button>
      </div>
    </header>
  );
};

export default Header;
