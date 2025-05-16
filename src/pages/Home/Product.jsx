import axios from "axios";
import React, { useEffect, useState } from "react";

import noImage from "../../assets/no_image.png";

const Product = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`);
      setProduct(res.data); // ✅ Use res.data
    } catch (err) {
      console.error("Failed to fetch main categories", err);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {product.map((item) => (
        <div
          key={item._id}
          className="border rounded-lg shadow-md bg-white p-6"
        >
          <img
            src={item.images[0] || noImage}
            alt={item.name}
            className="w-full h-48 object-cover mb-2 rounded"
          />
          <h2 className="text-base text-gray-800 font-medium uppercase">
            {item.name}
          </h2>
          <p className="text-sm text-gray-700">{item.description}</p>
          <div className="text-base font-normal flex flex-row items-center gap-4">
            <p className="text-red-500 font-bold">
              ₹{formatCurrency(item.discountPrice)}
            </p>
            <p className="line-through font-semibold text-gray-500 text-base ">
              ₹{formatCurrency(item.price)}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {item.subCategoryID?.name || "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Product;
