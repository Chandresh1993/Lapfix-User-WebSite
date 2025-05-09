import logo from "../assets/footer-logo.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to login page
  };
  return (
    <header className="bg-blue-800 text-white p-4">
      <div className="flex flex-row items-center justify-between ">
        <div className="w-28">
          <img className="w-full h-full object-cover" src={logo} alt="logo" />
        </div>
        <div className="flex flex-row items-center gap-8 text-lg font-bold  ">
          <button className="uppercase hover:underline">Heading</button>
          <button className="uppercase hover:underline">SubHeading</button>
          <button className="uppercase hover:underline">Products</button>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="text-xl font-bold hover:underline uppercase"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
