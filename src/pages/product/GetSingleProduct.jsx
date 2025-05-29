import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import Footer from "../Home/Footer";

const GetSingleProduct = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [Quantity, setQuanty] = useState(0);

  const productId = location.state?.id;

  useEffect(() => {
    if (productId) {
      getSingleProduct(productId);
    }
  }, [productId]);

  const getSingleProduct = async (productId) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product/${productId}`
      );
      setProduct(res.data); // ensure this is the actual product object
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const QunaityAdd = () => {
    setQuanty(Quantity + 1);
  };

  const QunaitySub = () => {
    if (Quantity - 0) {
      setQuanty(Quantity - 1);
    }
  };

  if (loading) return <Loader />;
  if (!product)
    return (
      <div className="text-center mt-10 text-lg text-red-500">
        Product not found.
      </div>
    );

  return (
    <div>
      <div className=" workspace  h-full p-4 ">
        <div className="font-normal text-base text-gray-500">
          Home /{" "}
          <span className="text-gray-900 font-normal">
            {product.subCategoryID.name}
          </span>
        </div>
        <div className=" flex flex-col gap-4 my-5 ">
          {/* Product Image */}
          <div className="bg-gray-200 w-full h-[500px] md:h-[1000px] py-28 px-10 shadow  flex items-center justify-center">
            <div className="w-full h-full">
              <img
                src={product.images?.[0]}
                alt=""
                className="w-full h-full object-fill"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className=" flex flex-col gap-2 ">
            <div>
              <h1 className="text-2xl font-semibold text-black uppercase">
                {product.mainHeading}
              </h1>
              <p className="text-xl font-semibold text-black uppercase">
                {product.name} - {product.year}
              </p>
            </div>

            <div className="flex items-center mt-2 gap-3">
              <p className="text-2xl font-bold text-red-600">
                ₹{formatCurrency(product.discountPrice)}
              </p>
              <p className="line-through text-base text-gray-500">
                ₹{formatCurrency(product.price)}
              </p>
              <div className="bg-red-500 p-1 w-20 rounded flex items-center justify-center mb-1">
                <p className="text-xs text-white font-medium">
                  Save{" "}
                  {Math.round(
                    ((product.price - product.discountPrice) / product.price) *
                      100
                  )}
                  %
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              {/* 5 yellow stars */}
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.192 3.674a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.124 2.27a1 1 0 00-.364 1.118l1.192 3.674c.3.921-.755 1.688-1.54 1.118l-3.124-2.27a1 1 0 00-1.176 0l-3.124 2.27c-.785.57-1.84-.197-1.54-1.118l1.192-3.674a1 1 0 00-.364-1.118L2.32 9.101c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.192-3.674z" />
                </svg>
              ))}

              {/* No Reviews Text */}
              <span className="text-sm text-gray-500">No Reviews</span>
            </div>

            <div className="border-t border-gray-300 my-4"></div>

            <div className="mb-4">
              <p className="text-base text-gray-600 mb-2 font-medium">
                Quantity :
              </p>
              <div className="flex items-center w-fit border border-gray-300 rounded-lg px-4 py-2 space-x-6 shadow-sm">
                <button
                  className="text-xl font-bold text-gray-600 hover:text-black transition"
                  onClick={QunaitySub}
                >
                  −
                </button>
                <p className="text-lg font-semibold text-gray-800">
                  {Quantity}
                </p>
                <button
                  className="text-xl font-bold text-gray-600 hover:text-black transition"
                  onClick={QunaityAdd}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                className="text-sm font-medium uppercase p-4 w-full text-center 
    bg-[#fff900] text-black  shadow-md transition duration-300 
    hover:bg-yellow-400 active:scale-95"
              >
                Add To Cart
              </button>

              <button
                className="text-sm font-medium uppercase p-4 w-full text-center 
    bg-blue-500 text-white  shadow-md transition duration-300 
    hover:bg-blue-600 active:scale-95"
              >
                Buy It Now
              </button>
            </div>

            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Available Quantity:</span>
                {product.quantity} Pcs
              </p>
            </div>

            <div className="mt-1">
              <h3 className="font-semibold text-lg  text-gray-800">
                Description
              </h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="mt-1">
              <h3 className="font-semibold text-lg  text-gray-800">
                How to Install & Tips
              </h3>
              <p className="text-gray-600">{product.howToInstallAndTips}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default GetSingleProduct;
