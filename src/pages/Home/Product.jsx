import axios from "axios";
import React, { useEffect, useState } from "react";
import noImage from "../../assets/no_image.png";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Slider from "./Slider";

import Newproduct from "../product/Newproduct";
import RecentlyProduct from "../product/RecentlyProduct";

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
  const [mainCategoryName, setMainCatgeoryName] = useState("");

  const [searchParams] = useSearchParams();
  const subCategoryId = searchParams.get("subCategoryId") || "";
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [selectedSubCatId, setSelectedSubCatId] = useState("");
  const [productByCtageoryId, setProductByCtageoryId] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (subCategoryId) {
      setSelectedCategoryId("");
    }
  }, [subCategoryId]);

  useEffect(() => {
    if (location.state?.fromHeader) {
      setMainCatgeoryName("Explore");
    }
  }, [location.state?.fromHeader]);

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
          await getAllProducts(page, limit, subCategoryId);
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
    subCategoryId,
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
        `${process.env.REACT_APP_BASE_URL}/firstCatgeory`
      );
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch Category", error);
    }
  };

  const getAllProducts = async (page, limit, subCategoryId) => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`, {
        params: {
          page,
          limit,

          subCategoryId: subCategoryId || undefined,
        },
      });

      // Fetch Main Category Name

      const MainCatgeoyrName = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/subCategory/${subCategoryId}`
      );
      if (
        MainCatgeoyrName.data &&
        MainCatgeoyrName.data.mainCategoryId &&
        MainCatgeoyrName.data.mainCategoryId.name
      ) {
        setMainCatgeoryName(MainCatgeoyrName.data.mainCategoryId.name);
      }

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setTotalCount(res.data.total || 0);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  const getAllProductsByCategory = async (
    page,
    limit,
    firstCategoryId = ""
  ) => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`, {
        params: {
          page,
          limit,
          firstCategoryId: firstCategoryId || undefined,
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

  useEffect(() => {
    getAllSubCatgeory();
  }, []);

  const getAllSubCatgeory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/subCategory`
      );

      setAllSubCategory(res.data);
    } catch (err) {
      console.error("Failed to fetch subCategory", err);
    } finally {
      setLoading(false);
    }
  };

  const getProductBySubCategoryName = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product?subCategoryId=${id}`
      );

      setProductByCtageoryId(res.data.products);
    } catch (err) {
      console.error("Failed to fetch Product by SubCategoryId", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelection = (e) => {
    const selectedId = e.target.value;
    setSelectedSubCatId(selectedId);
    getProductBySubCategoryName(selectedId);
  };

  const handleProductSelect = (e) => {
    setSelectedProductId(e.target.value);
  };

  const handleClickSreachProduct = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product?productId=${id}`
      );
      setProducts(res.data.products);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handelSendCatgeoryName = (name) => {
    setMainCatgeoryName(name);
  };

  return (
    <div>
      {/* Header */}

      {/* Category Buttons */}
      <div className="">
        <Slider></Slider>
      </div>
      <div>
        <div>
          <div className="hidden lg:grid shadow-sm bg-black border border-white">
            <div className="flex w-full">
              {categories.slice(0, 8).map((category) => (
                <button
                  key={category._id}
                  onClick={() => {
                    handleCategoryClick(category._id);
                    handelSendCatgeoryName(category.name);
                  }}
                  className={`basis-0 flex-1 px-10 py-4 text-white flex items-center justify-center hover:text-white text-sm md:text-base uppercase truncate ${
                    selectedCategoryId === category._id
                      ? "text-black font-medium underline underline-offset-4"
                      : "text-white font-normal"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid lg:hidden shadow-sm  bg-black ">
            <div className="grid grid-rows-2 grid-cols-2 ">
              {categories.slice(0, 4).map((category) => (
                <button
                  key={category._id}
                  onClick={() => {
                    handleCategoryClick(category._id);
                    handelSendCatgeoryName(category.name);
                  }}
                  className={`basis-0 flex-1 px-10 py-4 border border-white  text-white flex items-center justify-center hover:text-white text-sm md:text-base uppercase truncate ${
                    selectedCategoryId === category._id
                      ? "text-black font-medium underline underline-offset-4"
                      : "text-white font-normal"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10 pb-4  p-4">
        {mainCategoryName ? (
          <p className="text-3xl text-center font-extrabold text-black uppercase">
            {mainCategoryName}
          </p>
        ) : (
          <p className="text-3xl text-center font-extrabold text-black uppercase">
            Explore
          </p>
        )}
        <p className="text-center text-black font-medium text-base mt-3">
          Store. The best way to buy the products you love
        </p>
      </div>
      {/* -----------------------Header Sreach start--------- */}

      {/* ------------------------Header sreach end------------------------- */}

      {/* ----------Sreach by year start here--------------- */}
      <div>
        <div className="flex items-center justify-center mt-4">
          <div className="relative w-4/5 ">
            <div>
              <p className="text-lg text-center sm:text-left text-gray-800 font-medium mb-2">
                Easy Part Finder Tool
              </p>
            </div>

            <div className="grid grid-rows-1 md:grid-cols-3 items-center">
              <select
                value={selectedSubCatId}
                onChange={handleSelection}
                className="w-full px-4 py-3 border optional:text-sm border-gray-300 optional:text-gray-800 bg-white  focus:outline-none text-sm"
              >
                <option disabled value="">
                  Select Model
                </option>
                {allSubCategory.map((subCat) => (
                  <option key={subCat._id} value={subCat._id}>
                    {subCat.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedProductId}
                onChange={handleProductSelect}
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 bg-white  focus:outline-none text-sm"
              >
                <option disabled value="">
                  Select Products
                </option>
                {productByCtageoryId.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleClickSreachProduct(selectedProductId)}
                className="bg-black text-white h-[44px] border border-black 
             transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-white font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ----------Sreach by year end here--------------- */}

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 p-4 ">
            {products.map((item) => (
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
                  <h2 className="text-base  text-black font-normal  uppercase text-center  line-clamp-1">
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
                    : "hover:bg-gray-100 text-black"
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

        <div className="bg-white py-10 mt-8">
          <Newproduct></Newproduct>
        </div>
        <div className="bg-white py-10 mt-8">
          <RecentlyProduct></RecentlyProduct>
        </div>
        <div className="mt-10 p-4">
          <p className="text-3xl text-gray-800 font-medium mb-2">
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
          <p className="text-3xl text-gray-800 font-medium mb-2">
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
