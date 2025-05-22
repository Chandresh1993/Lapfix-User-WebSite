import axios from "axios";
import React, { useEffect, useState } from "react";
import noImage from "../../assets/no_image.png";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(30);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [searchParams] = useSearchParams();
  const subCategoryName = searchParams.get("subCategoryName") || "";

  const navigation = useNavigate();

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getAllProducts(page, limit, selectedCategoryId, subCategoryName);
  }, [page, limit, selectedCategoryId, subCategoryName]);

  const getCategory = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/mainCategory`
      );
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch Category", error);
    }
  };

  const getAllProducts = async (
    page,
    limit,
    mainCategoryId = "",
    subCategoryName = ""
  ) => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`, {
        params: {
          page,
          limit,
          mainCategoryId: mainCategoryId || undefined,
          subCategoryName: subCategoryName || undefined,
        },
      });
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setTotalCount(res.data.total || 0);
    } catch (err) {
      console.error("Failed to fetch products", err);
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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
    setPage(1); // reset to page 1 on category change
  };

  const getIdProduct = (id) => {
    navigation("/product", {
      state: { id: id },
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="pt-10 pb-4  p-4">
        {subCategoryName ? (
          <p className="text-3xl text-center font-extrabold text-black uppercase">
            {subCategoryName}
          </p>
        ) : (
          <p className="text-3xl text-center font-extrabold text-black uppercase">
            Shop Now
          </p>
        )}
        <p className="text-center text-gray-700 font-medium text-base mt-3">
          Store. The best way to buy the products you love
        </p>
      </div>

      {/* Category Buttons */}
      <div className="flex justify-center py-2 ">
        <div className="inline-flex flex-wrap justify-center items-center gap-4 border-b border-gray-300 pb-4">
          {categories.slice(0, 5).map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className={`px-5 py-2.5   text-sm md:text-base uppercase ${
                selectedCategoryId === category._id
                  ? " text-blue-700 font-bold "
                  : "text-gray-700 font-medium "
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Banner Image */}
      <div className="p-4 ">
        {/* No Products */}
        {!loading && totalCount === 0 && (
          <div className="text-center my-8">
            <p className="font-normal text-base mb-8 text-red-500">
              No products available.
            </p>
          </div>
        )}

        {/* Loader */}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            {products.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg bg-white p-6 cursor-pointer"
                onClick={() => getIdProduct(item._id)}
              >
                {item.price > item.discountPrice && (
                  <div className="bg-red-500 p-1 w-20 rounded flex items-center justify-center mb-1">
                    <p className="text-xs text-white font-medium">
                      Save{" "}
                      {Math.round(
                        ((item.price - item.discountPrice) / item.price) * 100
                      )}
                      %
                    </p>
                  </div>
                )}
                <img
                  src={item.images?.[0] || noImage}
                  alt=""
                  className="w-full h-48 object-cover mb-2 rounded"
                />
                <h2 className="text-base text-gray-800 font-medium uppercase break-words line-clamp-1">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-700 break-words line-clamp-2">
                  {item.description}
                </p>
                <div className="text-base font-normal flex gap-4 mt-2">
                  <p className="text-red-500 font-bold">
                    ₹{formatCurrency(item.discountPrice)}
                  </p>
                  <p className="line-through text-gray-500 font-semibold text-base">
                    ₹{formatCurrency(item.price)}
                  </p>
                </div>
                <p className="text-xs mt-1">
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
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={` ${
              page === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"
            }`}
          >
            <FiChevronLeft size={24} />
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const pageNumber = idx + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  pageNumber === page
                    ? "bg-blue-800 text-white"
                    : "hover:bg-blue-300"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={` ${
              page === totalPages
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-200"
            }`}
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
