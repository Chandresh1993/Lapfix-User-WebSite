import React from "react";
import Product from "./Product";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="overflow-auto">
      <div className=" bg-gray-100">
        <Product></Product>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
