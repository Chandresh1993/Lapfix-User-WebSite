import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../../components/InputField";
import logo from "../../assets/WhatsApp Image 2025-05-25 at 1.49.38 PM.jpeg";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // ✅ Redirect if token already exists
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/users/login`,
          formData
        );
        login(response.data.token);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/home");
      } catch (error) {
        let message =
          error.response && error.response.data && error.response.data.message;

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: message,
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="workspace min-h-screen">
      <div className="bg-black h-32">
        <div className="flex flex-row items-center h-full justify-center">
          <div className="h-20">
            <img className="w-full h-full object-cover" src={logo} alt="logo" />
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center py-32">
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Login
            </h2>
            <form onSubmit={handleSubmit}>
              <InputField
                label="Email"
                type="email"
                name="email"
                placeholder="Avi@example.com"
                onChange={handleChange}
              />
              <div className="relative">
                <InputField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-[65%] right-3 transform -translate-y-1/2 text-black"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-lg mt-4 hover:bg-gray-700 active:scale-95 transition-transform duration-150 ease-in-out"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
