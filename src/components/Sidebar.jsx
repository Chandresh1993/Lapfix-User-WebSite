import { useState } from "react";
import { Plus } from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    subItems: [
      {
        title: "Overview",
        subItems: ["Today", "This Week"],
      },
      {
        title: "Reports",
        subItems: ["Monthly", "Annual"],
      },
    ],
  },
  {
    title: "Courses",
    subItems: [
      {
        title: "All Courses",
        subItems: ["Live", "Archived"],
      },
      {
        title: "Add New",
        subItems: [],
      },
    ],
  },
];

const Sidebar = () => {
  const [openMain, setOpenMain] = useState(null);
  const [openSub, setOpenSub] = useState(null);

  const toggleMain = (index) => {
    setOpenMain(openMain === index ? null : index);
    setOpenSub(null);
  };

  const toggleSub = (index) => {
    setOpenSub(openSub === index ? null : index);
  };

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-gray-100 to-blue-600 text-white shadow-lg overflow-y-auto">
      <div className="p-6 text-2xl font-bold text-blue-800 ">Golf Course</div>

      <ul className="p-4 space-y-4">
        {sidebarItems.map((mainItem, mainIdx) => (
          <li key={mainIdx}>
            <button
              onClick={() => toggleMain(mainIdx)}
              style={{ transitionDuration: "1500ms" }}
              className="flex items-center justify-between w-full text-left font-semibold text-white hover:bg-blue-700 hover:text-yellow-300 px-3 py-2 rounded transition-colors ease-in-out text-xl"
            >
              {mainItem.title}
              <span
                className={`transform transition-transform duration-300 ${
                  openMain === mainIdx ? "rotate-45" : "rotate-0"
                }`}
              >
                <Plus size={18} />
              </span>
            </button>

            {openMain === mainIdx && (
              <ul className="pl-4 mt-2 space-y-2 transition-all duration-300 ease-in-out">
                {mainItem.subItems.map((subItem, subIdx) => (
                  <li key={subIdx}>
                    <button
                      onClick={() => toggleSub(subIdx)}
                      style={{ transitionDuration: "1500ms" }}
                      className="flex items-center justify-between w-full text-left text-sm hover:bg-white font-bold hover:text-blue-800 px-3 py-1 rounded transition-colors ease-in-out"
                    >
                      {subItem.title}
                      {subItem.subItems.length > 0 && (
                        <span
                          className={`transform transition-transform duration-300 ${
                            openSub === subIdx ? "rotate-45" : "rotate-0"
                          }`}
                        >
                          <Plus size={16} />
                        </span>
                      )}
                    </button>

                    {openSub === subIdx && subItem.subItems.length > 0 && (
                      <ul className="pl-4 mt-1 space-y-1 transition-all duration-300 ease-in-out">
                        {subItem.subItems.map((subSubItem, subSubIdx) => (
                          <li
                            key={subSubIdx}
                            className="text-xs hover:bg-white hover:text-blue-800 px-3 py-1 rounded font-bold cursor-pointer transition-colors duration-500 ease-in-out"
                          >
                            {subSubItem}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
