import logo from "../assets/footer-logo.png"

const Header = () => {
    return (
      <header className="bg-blue-800 text-white p-4">
      <div className="flex flex-row items-center justify-between ">
      <div className="w-28">
          <img className="w-full h-full object-cover" src={logo} alt="logo" />
        </div>
       <div> 
       <button className="text-xl font-bold">Logout</button></div>
      </div>
      </header>
    );
  };
  
  export default Header;
  