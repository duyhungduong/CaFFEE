import React, { useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helper/fetchCategoryWiseProduct";
import displayVNCurrency from "../helper/displayCurrency";
import { TbShoppingCartFilled } from "react-icons/tb";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(20).fill(null);

  const [scroll, setScroll] = useState(0)
  const scrollElement = useRef()

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    // Giả lập độ trễ tương tự `CategoryList`
    setTimeout(() => {
      setLoading(false);
      setData(categoryProduct?.data);
    }, 350);
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () =>{
    scrollElement.current.scrollLeft += 300
  }

  const scrollLeft = () =>{
    scrollElement.current.scrollLeft -= 300
  }
  

  return (
    <div className="container mx-auto px-2 my-2 relative">
      <h2 className="text-lg font-semibold py-4">{heading}</h2>
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-xl hidden md:block bg-white shadow-md rounded-full p-1 z-10"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-xl hidden md:block bg-white shadow-md rounded-full p-1 z-10"
        >
          <FaAngleRight />
        </button>
        <div
          className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
          ref={scrollElement}
        >
          {loading
            ? loadingList.map((_, index) => (
                <div
                  key={"loadingProduct" + index}
                  className="bg-gray-200 p-6 rounded-lg shadow-md flex w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 skeleton-loading"
                >
                  <div className="h-full p-3 min-w-[120px] md:min-w-[145px] bg-gray-300"></div>
                  <div className="mx-3">
                    <p className="bg-gray-300 w-32 h-4 mb-2 rounded"></p>
                    <p className="bg-gray-300 w-20 h-4 mb-2 rounded"></p>
                    <p className="bg-gray-300 w-24 h-4 mb-2 rounded"></p>
                  </div>
                </div>
              ))
            : data.map((product, index) => {
                return (
                  <Link
                    to={"product/"+product?._id}
                    key={index}
                    className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex"
                  >
                    <div className="bg-slate-400 h-full p-3 min-w-[120px] md:min-w-[145px]">
                      <img
                        className="object-scale-down h-full hover:scale-110 transition-all"
                        src={product.productImage[0]}
                        alt={product?.productName}
                      />
                    </div>
                    <div className="p-4 grid">
                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                        {product?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.category}
                      </p>
                      <div className="flex gap-2">
                        <p className="text-red-600 font-medium">
                          {displayVNCurrency(product?.sellingPrice)}
                        </p>
                        <p className="text-slate-500 line-through">
                          {displayVNCurrency(product?.price)}
                        </p>
                      </div>
                      <button 
                      onClick={(e)=>addToCart(e,product?._id)}
                      className="text-sm flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-brown text-coffee-dark hover:from-coffee-light hover:to-coffee-green rounded-lg">
                        <TbShoppingCartFilled /> Add to Cart
                      </button>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
