import logo from "../assets/footer-logo.png";
import { Menu } from "lucide-react"; // install lucide-react if not already

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-blue-800 text-white p-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="w-36">
          <img className="w-full h-full object-cover" src={logo} alt="logo" />
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-white p-2 rounded"
        >
          <Menu />
        </button>
      </div>
    </header>
  );
};

export default Header;
