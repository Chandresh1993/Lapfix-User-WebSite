import { useState, useEffect, useCallback, useRef } from "react";
import { X } from "lucide-react";
import axios from "axios";
import debounce from "lodash.debounce";
import noImage from "../assets/no_image.png";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Create a ref to store the debounce function
  const debouncedSearchRef = useRef();

  const navigation = useNavigate();

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

  const formatPrice = (price) => {
    if (!price) return "Rs 0.00";

    const formattedNumber = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(price);

    return `Rs ${formattedNumber}`;
  };

  const getIdProduct = (id) => {
    navigation("/product", {
      state: { id: id },
    });
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-normal text-black">Search</h2>
        <button onClick={onClose} className="text-black">
          <X className="w-6 h-6" />
        </button>
      </div>

      <input
        type="text"
        placeholder="Type to search..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none placeholder:text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && query.length > 0 ? (
        <Loader />
      ) : suggestions.length > 0 ? (
        <ul className="mt-4 h-auto overflow-y-auto bg-white">
          {suggestions.map((product) => (
            <li
              key={product._id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              <div
                onClick={() => getIdProduct(product._id)}
                className="flex flex-row items-center gap-4"
              >
                <img
                  src={product.images[0] || noImage}
                  alt=""
                  className="w-16 h-16 object-fill rounded"
                />
                <div>
                  <p className="text-base font-normal text-black uppercase">
                    {product.name}
                  </p>
                  <p className="text-red-600 font-medium text-sm ">
                    {formatPrice(product.price)}
                    {product.discountPrice && (
                      <span className="ml-2 line-through text-gray-500">
                        {formatPrice(product.discountPrice)}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        query.length > 0 &&
        !loading && (
          <p className="mt-4 text-center text-gray-500 text-sm">
            No products found.
          </p>
        )
      )}
    </div>
  );
};

export default SearchBar;
