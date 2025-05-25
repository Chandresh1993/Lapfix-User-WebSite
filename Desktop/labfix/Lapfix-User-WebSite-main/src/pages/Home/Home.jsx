import React from "react";
import Product from "./Product";
import Footer from "./Footer";
import Slider from "./Slider";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="">
        <Slider></Slider>
      </div>
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
