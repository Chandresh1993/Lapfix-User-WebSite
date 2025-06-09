import { useEffect, useState } from "react";
import { Folder, Plus, X } from "lucide-react";
import axios from "axios";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onClose }) => {
  const [openFirst, setOpenFirst] = useState(null); // Tracks opened firstCat
  const [openMain, setOpenMain] = useState(null); // Tracks opened mainCat
  const [categories, setCategories] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/firstCatgeory`
        );
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubHeading = (id) => {
    navigation(`/?subCategoryId=${id}`);
  };

  return (
    <aside className="w-72 h-screen bg-white border border-gray-200  text-white shadow-lg overflow-y-auto relative">
      <button onClick={onClose} className="absolute top-3 right-3 text-black">
        <X size={18} />
      </button>
      <div className="p-6 text-2xl font-bold text-gray-900 uppercase">
        GolfCource
      </div>

      <ul className="p-4 space-y-3">
        {categories.map((firstCat, firstIdx) => (
          <li key={firstCat._id}>
            <div className="flex items-center hover:bg-gray-200 px-2 py-3 rounded-md transition duration-300 ease-in-out">
              <div className="w-6 flex items-center justify-center mr-2 text-gray-600">
                <Folder size={20} />
              </div>
              <div
                onClick={() =>
                  setOpenFirst(openFirst === firstIdx ? null : firstIdx)
                }
                className="flex items-center justify-between w-full gap-2 cursor-pointer text-left font-medium uppercase text-gray-700 text-lg line-clamp-1   "
              >
                <div className="truncate">{firstCat.name} </div>
                <div
                  className={`transform transition-transform duration-300 ease-in-out ${
                    openFirst === firstIdx ? "rotate-45" : "rotate-0"
                  }`}
                >
                  <Plus size={18} />
                </div>
              </div>
            </div>

            {/* Show Main Categories only if current first category is open */}
            {openFirst === firstIdx &&
              firstCat.mainCategories?.map((mainCat, mainIdx) => {
                const uniqueIndex = `${firstIdx}-${mainIdx}`;

                return (
                  <div key={mainCat._id} className="ml-8">
                    {/* Main Category Header */}
                    <div
                      onClick={() =>
                        setOpenMain(
                          openMain === uniqueIndex ? null : uniqueIndex
                        )
                      }
                      className="flex items-center justify-between w-full text-left font-medium px-2 py-3 cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out text-gray-800 text-sm uppercase rounded"
                    >
                      <div className="flex items-center gap-1 truncate">
                        {/* Merge index and name in one block to prevent breaking */}
                        <p className="truncate">
                          {mainIdx + 1}. {mainCat.name}
                        </p>
                      </div>

                      <div
                        className={`transform transition-transform duration-300 ease-in-out ${
                          openMain === uniqueIndex ? "rotate-45" : "rotate-0"
                        }`}
                      >
                        <Plus size={16} />
                      </div>
                    </div>

                    {/* Subcategories - only visible when main category is open */}
                    {openMain === uniqueIndex &&
                      mainCat.subCategories?.length > 0 && (
                        <div className="pl-4 mt-2 space-y-1">
                          {mainCat.subCategories.map((subItem) => (
                            <div
                              key={subItem._id}
                              onClick={() => {
                                handleSubHeading(subItem._id);
                                onClose();
                              }}
                              className="flex  items-center gap-2 cursor-pointer hover:bg-gray-200   transition duration-300 ease-in-out px-2 py-1 rounded"
                            >
                              {/* Bullet Dot */}
                              <div className="mt-1 w-[6px] h-[6px] bg-gray-500  rounded-full flex-shrink-0"></div>

                              {/* Subcategory Name */}
                              <div className="text-sm line-clamp-1 font-normal text-gray-700 hover:text-black">
                                {subItem.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                );
              })}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
