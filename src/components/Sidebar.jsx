import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {

  const [heading, setHeading]= useState([])

  useEffect(()=>{


   

    fetehData()
  }, [])


  const fetehData= async ()=>{
   
    try {
      const response = await axios.get(  `${process.env.REACT_APP_BASE_URL}/mainCategory`,)
      setHeading(response.data)

    } catch (error) {
      console.log(error)
      
    }


  }



  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-gray-100 to-blue-600 text-white shadow-lg">
      <div className="p-6 text-2xl font-bold text-blue-800">
        Golf Course
      </div>
      <ul className="flex flex-col p-4 space-y-2">
        {heading.map((item) => (
          <li key={item._id}>
            <Link
              to={item.path}
              className="block px-4 py-2 rounded-md transition duration-200 hover:bg-blue-700 uppercase font-bold"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
