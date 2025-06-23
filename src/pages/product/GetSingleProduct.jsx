import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import Footer from "../Home/Footer";
import noImage from "../../assets/no_image.png";
import RecentlyProduct from "./RecentlyProduct";

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
        <div className="font-normal text-base text-gray-500 uppercase">
          Home /{" "}
          <span className="text-gray-900 font-normal">
            {product.subCategoryID.name}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 my-5 items-stretch">
          {/* Product Image */}
          <div className="bg-white rounded-lg  p-6 flex items-center justify-center h-full">
            <div className="w-full aspect-[4/3]">
              <img
                src={product.images[0]?.url || noImage}
                alt="product"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg  p-6 flex flex-col justify-between h-full">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-black uppercase">
                  {product.mainHeading}
                </h1>
                <p className="text-xl font-semibold text-black uppercase">
                  {product.name} - {product.year}
                </p>
              </div>

              <div className="flex items-center gap-3 w-fit bg-gray-100 px-4 py-2 rounded shadow-sm">
                <p className="text-2xl font-bold text-red-600">
                  ₹{formatCurrency(product.discountPrice)}
                </p>

                <p className="line-through text-base text-gray-500">
                  ₹{formatCurrency(product.price)}
                </p>

                {/* Show discount badge only if it's a positive value */}
                {product.price > product.discountPrice && (
                  <div className="bg-red-500 px-2 py-1 rounded text-white text-xs font-medium">
                    Save{" "}
                    {Math.round(
                      ((product.price - product.discountPrice) /
                        product.price) *
                        100
                    )}
                    %
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
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
                <button className="text-sm font-medium uppercase p-4 w-full text-center bg-[#fff900] text-black shadow-md transition duration-300 hover:bg-yellow-400 active:scale-95">
                  Add To Cart
                </button>
                <button className="text-sm font-medium uppercase p-4 w-full text-center bg-blue-500 text-white shadow-md transition duration-300 hover:bg-blue-600 active:scale-95">
                  Buy It Now
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <div>
                <h3 className="font-medium text-lg text-black">
                  Available Quantity
                </h3>
                <p className="text-gray-800">{product.quantity} pcs</p>
              </div>
              <div>
                <h3 className="font-medium text-lg text-black">Description</h3>
                <p className="text-gray-800">{product.description}</p>
              </div>
              {product.howToInstallAndTips &&
                product.howToInstallAndTips !== "null" && (
                  <div>
                    <h3 className="font-medium text-lg text-black">
                      How to Install & Tips
                    </h3>
                    <div
                      className="text-gray-800 list-decimal ml-6 [&>ol]:list-decimal [&>ul]:list-disc [&>li]:mb-2 [&_span.ql-ui]:hidden"
                      dangerouslySetInnerHTML={{
                        __html: product.howToInstallAndTips,
                      }}
                    ></div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="border border-gray-100"></div>
      <div className="bg-white py-10 mt-8">
        <RecentlyProduct></RecentlyProduct>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default GetSingleProduct;
