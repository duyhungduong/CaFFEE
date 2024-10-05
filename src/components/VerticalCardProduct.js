import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helper/fetchCategoryWiseProduct";
import displayVNCurrency from "../helper/displayCurrency";
import { TbShoppingCartFilled } from "react-icons/tb";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";
import Context from "../context";
import addToFavorite from "../helper/addToFavorite";
import { useSelector } from "react-redux";
import ROLE from "../common/role";
import { MdFavorite } from "react-icons/md";

const LoadingPlaceholder = () => (
  <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-gray-100 rounded-lg shadow-md skeleton-loading transition-all duration-300">
    <div className="bg-slate-200 h-72 p-3 min-w-[200px] md:min-w-[145px] flex justify-center items-center rounded-lg">
      <div className="bg-slate-400 mx-auto h-64 w-64 p-3 min-w-[200px] md:min-w-[145px] rounded-lg"></div>
    </div>
    <div className="p-4 grid gap-1 mt-1">
      <div className="w-3/4 h-4 bg-gray-400 rounded-md"></div>
      <div className="w-1/2 h-4 bg-gray-400 rounded-md"></div>
      <div className="w-full h-6 bg-gray-400 rounded-md"></div>
    </div>
  </div>
);

const VerticalCardProduct = ({ category, heading }) => {
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState({ products: [], loading: true });
  const scrollElement = useRef();

  const { fetchUserAddToCart, fetchUserAddToFavorite } = useContext(Context);

  const fetchData = useCallback(async () => {
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setData({ products: categoryProduct?.data || [], loading: false });
    } catch (error) {
      console.error("Error fetching data", error);
      setData({ products: [], loading: false });
    }
  }, [category]);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted
    fetchData();
    return () => {
      isMounted = false; // Cleanup function
    };
  }, [fetchData]);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleAddToFavorite = async (e, id) => {
    await addToFavorite(e, id);
    fetchUserAddToFavorite();
  };

  const scrollRight = useCallback(() => {
    scrollElement.current.scrollBy({
      left: scrollElement.current.offsetWidth,
      behavior: 'smooth',
    });
  }, []);

  const scrollLeft = useCallback(() => {
    scrollElement.current.scrollBy({
      left: -scrollElement.current.offsetWidth,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-bold text-coffee-dark mb-4">{heading}</h2>
      <div className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none" ref={scrollElement}>
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

        {data.loading ? (
          Array.from({ length: 20 }).map((_, index) => <LoadingPlaceholder key={index} />)
        ) : (
          data.products.map((product) => (
            <Link to={`product/${product?._id}`} key={product?._id} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <div className="bg-slate-400 h-72 p-3 min-w-[200px] md:min-w-[145px] flex justify-center items-center rounded-lg overflow-hidden">
                <img className="object-cover h-full w-full hover:scale-110 transition-transform duration-300" src={product.productImage[0]} alt={product?.productName} />
              </div>
              <div className="p-4 grid gap-2">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">{product?.productName}</h2>
                <p className="capitalize text-slate-500">{product?.category}</p>
                <div className="flex gap-2">
                  <p className="text-red-600 font-medium">{displayVNCurrency(product?.sellingPrice)}</p>
                  <p className="text-slate-500 line-through">{displayVNCurrency(product?.price)}</p>
                </div>
                {user?.role === ROLE.GENERAL ? (
                  <button
                    className="text-sm flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-light text-coffee-dark rounded-lg transition-all hover:from-pastel-teal hover:to-pastel-blue-dark"
                    onClick={(e) => handleAddToFavorite(e, product?._id)}
                  >
                    <MdFavorite /> Favorite
                  </button>
                ) : (
                  <button
                    className="text-sm flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-dark text-coffee-light rounded-lg transition-all hover:from-pastel-teal hover:to-pastel-blue-dark"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    <TbShoppingCartFilled /> Thêm vào giỏ
                  </button>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
