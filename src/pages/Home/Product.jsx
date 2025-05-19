import axios from "axios";
import React, { useEffect, useState } from "react";

import noImage from "../../assets/no_image.png";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]); // renamed to plural for clarity
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();

  const subCategoryName = searchParams.get("subCategoryName") || "";

  useEffect(() => {
    getAllProducts(page, limit, subCategoryName);
  }, [page, limit, subCategoryName]);

  const getAllProducts = async (page, limit, subCategoryName) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product?page=${page}&limit=${limit}&subCategoryName=${subCategoryName}`
      );

      setProducts(res.data.products); // <-- fix here
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch products", err);
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

  return (
    <div className="p-4">
      <div className=" text-center font-bold text-3xl  mb-8 text-blue-800 uppercase ">
        {subCategoryName}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg shadow-md bg-white p-6"
          >
            {item.price > item.discountPrice && (
              <div className="bg-red-500 p-1 w-16 rounded flex items-center justify-center mb-1">
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
              <p className="line-through font-semibold text-gray-500 text-base">
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

      {/* Pagination Controls */}
      {/* Pagination Controls with Arrow Buttons */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`p-2 rounded border ${
            page === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"
          }`}
          aria-label="Previous Page"
        >
          <FiChevronLeft size={24} />
        </button>

        {[...Array(totalPages)].map((_, idx) => {
          const pageNumber = idx + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`w-10 flex items-center justify-center rounded-full  ${
                pageNumber === page
                  ? "bg-blue-800 text-white"
                  : "hover:bg-blue-300"
              }`}
              aria-current={pageNumber === page ? "page" : undefined}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`p-2 rounded border ${
            page === totalPages
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-200"
          }`}
          aria-label="Next Page"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Product;
