import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import noImage from "../../assets/no_image.png";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Slider from "./Slider";
import debounce from "lodash.debounce";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(30);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [pageGroup, setPageGroup] = useState(0); // start from 0 (first 6 pages group)
  const pagesPerGroup = 6;

  const [searchParams] = useSearchParams();
  const subCategoryName = searchParams.get("subCategoryName") || "";

  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (subCategoryName) {
      setSelectedCategoryId("");
    }
  }, [subCategoryName]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (location.state?.fromHeader) {
          await getAllProductsByHeader(page, limit);
          window.history.replaceState({}, document.title); // clear state after fetch
        } else if (selectedCategoryId) {
          await getAllProductsByCategory(page, limit, selectedCategoryId);
        } else {
          await getAllProducts(page, limit, subCategoryName);
        }
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    page,
    limit,
    selectedCategoryId,
    subCategoryName,
    location.state?.fromHeader,
  ]);

  const getAllProductsByHeader = async (page, limit) => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`, {
        params: {
          page,
          limit,
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

  useEffect(() => {
    getCategory();
  }, []);

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

  const getAllProducts = async (page, limit, subCategoryName) => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`, {
        params: {
          page,
          limit,

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

  const getAllProductsByCategory = async (page, limit, mainCategoryId = "") => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`, {
        params: {
          page,
          limit,
          mainCategoryId: mainCategoryId || undefined,
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
    if (newPage < 1 || newPage > totalPages) return;

    setPage(newPage);

    // Calculate which group this newPage belongs to
    const newGroup = Math.floor((newPage - 1) / pagesPerGroup);
    setPageGroup(newGroup);
  };

  const handleNextGroup = () => {
    if ((pageGroup + 1) * pagesPerGroup < totalPages) {
      setPageGroup(pageGroup + 1);
      setPage(pageGroup * pagesPerGroup + pagesPerGroup + 1);
    }
  };

  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
      setPage((pageGroup - 1) * pagesPerGroup + 1);
    }
  };

  const startPage = pageGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
    setPage(1); // reset to page 1 on category change // reset to first page
    setPageGroup(0); // reset to first page group
    navigation("/");
  };

  const getIdProduct = (id) => {
    navigation("/product", {
      state: { id: id },
    });
  };

  //  ----------------sreach bar--------------------
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Create a ref to store the debounce function
  const debouncedSearchRef = useRef();

  const fetchSuggestions = useCallback(async (searchText) => {
    if (!searchText.trim()) {
      setSuggestions([]);
      return;
    }
    setLoading(true);

    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`, {
        params: { search: searchText },
      });

      setSuggestions(res.data.products || []);
    } catch (error) {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize the debounce function once on mount
  useEffect(() => {
    debouncedSearchRef.current = debounce(fetchSuggestions, 300);

    // Cleanup on unmount
    return () => {
      debouncedSearchRef.current?.cancel();
    };
  }, [fetchSuggestions]);

  // Call debounced function when query changes
  useEffect(() => {
    debouncedSearchRef.current?.(query);
  }, [query]);

  return (
    <div>
      {/* Header */}

      {/* Category Buttons */}
      <div className="flex justify-center bg-white  ">
        <div className=" border-b border-t border-gray-200 w-full flex justify-center ">
          <div className=" hidden sm:grid">
            <div className=" grid grid-cols-5 justify-center  items-center  ">
              {categories.slice(0, 5).map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryClick(category._id)}
                  className={` px-2  py-4  hover:bg-gray-500 flex items-center justify-center hover:text-white border border-r border-gray-200  text-sm md:text-base uppercase ${
                    selectedCategoryId === category._id
                      ? " text-black font-bold "
                      : "text-gray-700 font-normal"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:hidden">
            <div className="grid  grid-cols-4 md:grid-cols-5 justify-center  items-center  ">
              {categories.slice(0, 4).map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryClick(category._id)}
                  className={` px-2  py-4  hover:bg-gray-500 flex items-center justify-center hover:text-white border border-r border-gray-200  text-sm md:text-base uppercase ${
                    selectedCategoryId === category._id
                      ? " text-black font-bold "
                      : "text-gray-700 font-normal"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Slider></Slider>
      </div>
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

      <div className="flex items-center justify-center">
        <div className="relative w-3/4 ">
          <div>
            <p className="text-lg text-center sm:text-left text-gray-500 font-medium mb-2">
              Easy Part Finder Tool
            </p>
          </div>
          <input
            type="text"
            placeholder="Type to search..."
            className="w-full px-4 py-2 border border-gray-300  focus:outline-none placeholder:text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
              {suggestions.length > 0 ? (
                suggestions.map((product) => (
                  <li
                    key={product._id}
                    onClick={() => getIdProduct(product._id)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          product.images?.length
                            ? product.images[0]?.url
                            : noImage
                        }
                        alt=""
                        className="w-10 h-10 object-fill rounded"
                      />
                      <div className="flex flex-row items-center gap-4">
                        <p className="text-base font-normal text-gray-700 uppercase">
                          {product.name} <span>{product.year}</span>
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-4">
                        <p className="text-base  text-red-500 font-medium uppercase">
                          - ₹{formatCurrency(product.discountPrice)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-2 text-red-500 font-medium text-sm">
                  Product not found.
                </li>
              )}
            </ul>
          )}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 p-4">
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
                  src={item.images?.length ? item.images[0]?.url : noImage}
                  alt=""
                  loading="lazy"
                  className="w-full h-48 object-fill mb-2 rounded"
                />

                <h2 className="text-base text-gray-800 font-medium uppercase break-words line-clamp-1">
                  {item.name}
                </h2>
                <h2 className="text-base text-gray-800 font-medium uppercase break-words line-clamp-1">
                  {item.year}
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
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8 px-4">
          {/* Prev Group */}
          <button
            onClick={handlePrevGroup}
            disabled={pageGroup === 0}
            className={`p-2 border rounded ${
              pageGroup === 0
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-100"
            }`}
            aria-label="Previous group"
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const pageNumber = startPage + index;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 rounded border text-sm font-medium ${
                  pageNumber === page
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Chevron Next */}
          <button
            onClick={handleNextGroup}
            disabled={(pageGroup + 1) * pagesPerGroup >= totalPages}
            className={`p-2 border rounded ${
              (pageGroup + 1) * pagesPerGroup >= totalPages
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-100"
            }`}
            aria-label="Next group"
          >
            <FiChevronRight size={20} />
          </button>

          {/* Text "Next" Button */}
          <button
            onClick={handleNextGroup}
            disabled={(pageGroup + 1) * pagesPerGroup >= totalPages}
            className={`px-3 py-1 rounded border text-sm font-medium ${
              (pageGroup + 1) * pagesPerGroup >= totalPages
                ? "cursor-not-allowed opacity-50 text-gray-400"
                : "hover:bg-gray-100 text-gray-800"
            }`}
          >
            Next
          </button>
        </div>
        <div className="mt-10 p-4">
          <p className="text-3xl text-gray-600 font-medium mb-2">
            Lapfix - the best Apple parts supplier
          </p>
          <p className="text-base text-gray-500 font-normal break-words">
            Apple is king when it comes to technology, whether it's because of
            Apple's distinctive design, ease of use, or simply because Apple
            products last longer. This means that having bought a MacBook or any
            Mac accessories, you can be sure that Apple products will work for
            you for many years. But we shouldn’t forget that technologies are
            constantly evolving. And even if Apple replacement parts of your
            MacBook were the last word in technology yesterday, they may no
            longer be relevant today.
          </p>
        </div>
        <div className="mt-5 p-4">
          <p className="text-3xl text-gray-600 font-medium mb-2">
            Apple parts store: assortment
          </p>
          <div className="flex flex-col gap-3">
            <p className="text-base text-gray-500 font-normal break-words">
              Even the most excellent laptop may drop, break, or get scratched
              someday. The MacBook casing is also listed among the most used
              Apple repair parts as it is not indestructible. In our Apple parts
              store, you will find everything to update and repair your Macbook:
              adapters, body parts, batteries, cables, logic boards, trackpads,
              and other Apple repair parts for your Mac.
            </p>
            <p className="text-base text-gray-500 font-normal break-words">
              Here, you may get authentic Apple parts for original accessories
              replacement. Get the most recent deals on LCD screens with
              touchpad modules, genuine displays with digitizers made of Gorilla
              Glass, BMU flex cables, genuine power cords, trackpads (IPD),
              bottom cases of various colors, and also some discounted batteries
              and USB chargers. We are dedicated to bringing consumers the best
              possible service. We are passionate about our work, and the
              services you experience reflect our passion and good work. We
              understand that every case is diverse.
            </p>
            <p className="text-base text-gray-500 font-normal break-words">
              If you need Apple spare parts or repair service, relying on us is
              the best choice. Go through our product range and do not hesitate
              to ask questions, if any.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
