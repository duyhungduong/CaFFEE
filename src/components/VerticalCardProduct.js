import React, { useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helper/fetchCategoryWiseProduct";
import displayVNCurrency from "../helper/displayCurrency";
import { TbShoppingCartFilled } from "react-icons/tb";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(20).fill(null);

  const [scroll, setScroll] = useState(0)
  const scrollElement = useRef()

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    console.log("Horizon data : ", categoryProduct.data)
    setData(categoryProduct?.data);
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
      <div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all" ref={scrollElement}>
      <button onClick={scrollLeft} className="absolute left-0 text-xl hidden md:block bg-white shadow-md rounded-full p-1">
              <FaAngleLeft />
            </button>
            <button onClick={scrollRight} className="absolute right-0 text-xl hidden md:block bg-white shadow-md rounded-full p-1">
              <FaAngleRight />
            </button>
        {data.map((product, index) => {
          return (
            <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow-md">
              <div className="bg-slate-400 h-full p-3 min-w-[120px] md:min-w-[145px]">
                <img
                  className="object-scale-down h-full hover:scale-110 transition-all"
                  src={product.productImage[0]}
                  alt=""
                />
              </div>
              <div className="p-4 grid">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">{product?.productName}</h2>
                    <p className="capitalize text-slate-500">{product?.category}</p>
                    <div className="flex gap-2">
                        <p className="text-red-600 font-medium">{displayVNCurrency(product?.sellingPrice) }</p>
                        <p className="text-slate-500 line-through">{displayVNCurrency(product?.price)}</p>
                    </div>
                    <button className="text-sm flex items-center gap-2 px-3 py-1 bg-coffee-brown text-white hover:bg-coffee-dark rounded-lg"><TbShoppingCartFilled /> Add to Cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
