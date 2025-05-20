import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import axios from "axios";
import "./Sidebar.css"; // Import custom CSS
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onClose }) => {
  const [openMain, setOpenMain] = useState(null);
  const [categories, setCategories] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/mainCategory`
        );
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch main categories", err);
      }
    };

    fetchMainCategories();
  }, []);

  const toggleMain = (index) => {
    setOpenMain(openMain === index ? null : index);
  };

  const handlesubHeading = (name) => {
    navigation(`?subCategoryName=${name}`);
  };

  return (
    <aside className="w-64 h-screen bg-white border border-gray-200 text-white shadow-lg overflow-y-auto relative">
      <button onClick={onClose} className="absolute top-3 right-3 text-black">
        <X size={18} />
      </button>
      <div className="p-6 text-2xl font-bold text-gray-900 uppercase">
        Golf Course
      </div>

      <ul className="p-4 space-y-3">
        {categories.map((mainItem, mainIdx) => (
          <li key={mainItem._id}>
            <div className="border-b border-gray-300">
              <button
                onClick={() => toggleMain(mainIdx)}
                className="flex items-center justify-between w-full text-left font-medium  px-1 hover:bg-blue-300 transition duration-300 ease-in-out text-gray-900  py-2  text-base uppercase   rounded"
              >
                {mainItem.name}
                <span
                  className={`transform transition-transform duration-300 ease-in-out ${
                    openMain === mainIdx ? "rotate-45" : "rotate-0"
                  }`}
                >
                  <Plus size={18} />
                </span>
              </button>
            </div>

            <div
              className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                openMain === mainIdx ? "max-h-40" : "max-h-0"
              }`}
            >
              {mainItem.subCategories.length > 0 && (
                <ul className="pl-4 mt-2 space-y-2">
                  {mainItem.subCategories.map((subItem) => (
                    <li key={subItem._id}>
                      <div
                        onClick={() => handlesubHeading(subItem.name)}
                        className="text-sm font-normal text-gray-700 hover:bg-blue-200 transition duration-300 ease-in-out px-3 py-1 cursor-pointer rounded"
                      >
                        {subItem.name}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
