import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helper/fetchCategoryWiseProduct";
import displayVNCurrency from "../helper/displayCurrency";
import { TbShoppingCartFilled } from "react-icons/tb";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";
import Context from "../context";
import addToFavorite from "../helper/addToFavorite";
import { MdFavorite } from "react-icons/md";
import { useSelector } from "react-redux";
import ROLE from "../common/role";

// Tạo thành phần tái sử dụng ProductCard
const ProductCard = ({ product, userRole, handleAction, isFavorite }) => {
  return (
    <Link
      to={`product/${product._id}`}
      className="relative w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 bg-white rounded-lg shadow-lg flex transition-transform duration-300 transform hover:scale-105 hover:z-20 m-2" // Sản phẩm nhỏ hơn một chút khi rê chuột vào
      style={{ overflow: "visible", zIndex: 1 }}
    >
      <div className="bg-slate-400 h-full p-4 min-w-[120px] md:min-w-[145px] rounded-l-lg">
        <img
          className="object-cover h-full w-full rounded-md transition-transform hover:scale-110"
          src={product.productImage[0]}
          alt={product.productName}
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black">
          {product.productName}
        </h2>
        <p className="capitalize text-slate-500">{product.category}</p>
        <div className="flex gap-2 items-center">
          <p className="text-red-600 font-medium">
            {displayVNCurrency(product.sellingPrice)}
          </p>
          <p className="text-slate-500 line-through">
            {displayVNCurrency(product.price)}
          </p>
        </div>
        <button
          onClick={(e) => handleAction(e, product._id)}
          className="text-sm flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-coffee-brown to-coffee-light text-white hover:from-coffee-light hover:to-coffee-brown rounded-lg shadow-md z-20"
        >
          {isFavorite ? <MdFavorite /> : <TbShoppingCartFilled />}
          {isFavorite ? "Favorite" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
};


const HorizontalCardProduct = ({ category, heading }) => {
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(20).fill(null); // Chỉ tạo loading giả lập khi cần

  const scrollElement = useRef();
  const { fetchUserAddToCart, fetchUserAddToFavorite } = useContext(Context);

  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setData(categoryProduct?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (e, id, isFavorite) => {
    e.preventDefault();
    if (isFavorite) {
      await addToFavorite(e, id);
      fetchUserAddToFavorite();
    } else {
      await addToCart(e, id);
      fetchUserAddToCart();
    }
  };

  const scrollRight = () => {
    scrollElement.current.scrollBy({
      left: scrollElement.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    scrollElement.current.scrollBy({
      left: -scrollElement.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto px-4 my-8 relative">
      <h2 className="text-xl font-semibold text-coffee-dark py-4">{heading}</h2>
      <div className="relative">
        {/* Nút cuộn trái */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl bg-coffee-light shadow-lg rounded-full p-3 z-20 transition-all hover:scale-110 hover:bg-coffee-brown text-white"
          style={{ pointerEvents: "auto" }} // Đảm bảo nút hoạt động mà không bị đè
        >
          <FaAngleLeft />
        </button>

        {/* Nút cuộn phải */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl bg-coffee-light shadow-lg rounded-full p-3 z-20 transition-all hover:scale-110 hover:bg-coffee-brown text-white"
          style={{ pointerEvents: "auto" }} // Đảm bảo nút hoạt động mà không bị đè
        >
          <FaAngleRight />
        </button>

        {/* Thanh sản phẩm */}
        <div
          className="flex items-center gap-6 overflow-x-scroll scrollbar-none transition-all px-16" // Thêm padding để tạo không gian tránh các nút cuộn
          ref={scrollElement}
          style={{ scrollBehavior: "smooth" }}
        >
          {loading
            ? loadingList.map((_, index) => (
                <div
                  key={`loadingProduct-${index}`}
                  className="bg-gray-200 p-6 rounded-lg shadow-md flex w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 skeleton-loading"
                >
                  <div className="h-full p-4 min-w-[120px] md:min-w-[145px] bg-gray-300 rounded-md"></div>
                  <div className="mx-3">
                    <p className="bg-gray-300 w-32 h-4 mb-2 rounded"></p>
                    <p className="bg-gray-300 w-20 h-4 mb-2 rounded"></p>
                    <p className="bg-gray-300 w-24 h-4 mb-2 rounded"></p>
                  </div>
                </div>
              ))
            : data.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  userRole={user?.role}
                  handleAction={(e) =>
                    handleAction(e, product._id, user?.role === ROLE.GENERAL)
                  }
                  isFavorite={user?.role === ROLE.GENERAL}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
