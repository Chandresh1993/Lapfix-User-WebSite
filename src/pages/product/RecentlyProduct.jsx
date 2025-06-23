import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import noImage from "../../assets/no_image.png";

const RecentlyProduct = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    getAllProductsByHeader();
  }, []);

  const getAllProductsByHeader = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product/recently-viewed`,
        {}
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  const getIdProduct = (id) => {
    navigation("/product", {
      state: { id: id },
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div>
      <p className="text-3xl text-center font-extrabold text-black uppercase">
        Recently View Products
      </p>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 p-4">
          {products.slice(0, 4).map((item) => (
            <div
              key={item._id}
              className="border rounded-lg bg-white p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:drop-shadow-lg"
              onClick={() => getIdProduct(item._id)}
            >
              <div className="h-6 mb-1">
                {item.price > item.discountPrice ? (
                  <div className="bg-red-500 p-1 w-20 rounded flex items-center justify-center">
                    <p className="text-xs text-white font-medium uppercase">
                      Save{" "}
                      {Math.round(
                        ((item.price - item.discountPrice) / item.price) * 100
                      )}
                      %
                    </p>
                  </div>
                ) : (
                  <div className="w-20">&nbsp;</div> // Empty placeholder of same size
                )}
              </div>

              <img
                src={item.images?.length ? item.images[0]?.url : noImage}
                alt=""
                loading="lazy"
                className="w-full h-48 object-fill mb-2 rounded"
              />

              <div className="flex flex-col items-center justify-center gap-1">
                <h2 className="text-base text-black items-center  font-normal uppercase text-center  line-clamp-1">
                  {item.name}
                </h2>
                <h2 className="text-base text-black font-normal  uppercase text-center  line-clamp-1">
                  {item.year}
                </h2>
                <p className="text-sm block text-black font-normal break-words break-all text-center line-clamp-2 overflow-hidden text-ellipsis">
                  {item.description}
                </p>

                <div className=" flex justify-center">
                  <div className="text-base  font-normal flex gap-4 ">
                    <p className="text-red-500 font-medium">
                      ₹{formatCurrency(item.discountPrice)}
                    </p>
                    <p className="line-through text-gray-500 font-medium text-base">
                      ₹{formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              </div>
              {/* <p className="text-xs mt-1">
                  <span className="font-medium text-gray-700">In Stock:</span>{" "}
                  <span
                    className={
                      item.quantity === 0
                        ? "text-red-500 font-semibold"
                        : item.quantity < 5
                        ? "text-yellow-600 font-semibold"
                        : "text-green-600 font-semibold"
                    }
                  >
                    {item.quantity} pcs
                  </span>
                </p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyProduct;
