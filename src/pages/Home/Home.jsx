import React from "react";
import SimpleSliderTest from "./Slider";
import Product from "./Product";

const Home = () => {
  return (
    <div>
      <SimpleSliderTest></SimpleSliderTest>

      <div className="my-10">
        <Product></Product>
      </div>
    </div>
  );
};

export default Home;
