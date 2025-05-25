import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigation = useNavigate();

  const [heading, setHeading] = useState([]);

  useEffect(() => {
    fetehData();

    const handleUpdate = () => {
      fetehData();
    };

    window.addEventListener("heading-updated", handleUpdate);

    // 🧹 Cleanup listener on unmount
    return () => {
      window.removeEventListener("heading-updated", handleUpdate);
    };
  }, []);

  const fetehData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/mainCategory`
      );
      setHeading(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnclick = (id) => {
    navigation("/addsubHeading", { state: { id: id } });
  };

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-gray-100 to-black text-white shadow-lg">
      <div className="p-6 text-2xl font-bold text-black">LapFix</div>
      <ul className="flex flex-col p-4 space-y-4">
        {heading.map((item) => (
          <li key={item._id}>
            <p
              onClick={() => handleOnclick(item._id)}
              className="block px-4 py-2 text-lg font-black rounded-md transition duration-200 hover:bg-gray-700 uppercase  cursor-pointer"
            >
              {item.name}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
