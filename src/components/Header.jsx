import { useNavigate } from "react-router-dom";
import logo from "../assets/footer-logo.png";
import { Menu } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  const navition = useNavigate();

  const HandleClick = () => {
    navition("/");
  };

  return (
    <header className="bg-blue-800 text-white p-4 relative">
      <div className="flex items-center justify-center relative">
        {/* Logo centered */}
        <button onClick={() => HandleClick()} className="w-36 mx-auto">
          <img className="w-full h-full object-contain" src={logo} alt="logo" />
        </button>

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
