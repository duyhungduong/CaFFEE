import React, { useCallback, useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helper/fetchCategoryWiseProduct";
import displayVNCurrency from "../helper/displayCurrency";
import { TbShoppingCartFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";
import Context from "../context";

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(20).fill(null);

  const { fetchUserAddToCart} = useContext(Context)

  const handleAddToCart = async(e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setTimeout(() => {
        setLoading(false);
        setData(categoryProduct?.data);
      }, 250);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data", error);
    }
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container mx-auto px-4 my-4">
      <h2 className="text-lg font-semibold py-4">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          loadingList.map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg shadow-md p-4 animate-pulse">
              <div className="bg-slate-200 h-48 w-full mb-4"></div>
              <div className="h-4 bg-gray-400 rounded mb-2"></div>
              <div className="h-4 bg-gray-400 rounded mb-2"></div>
              <div className="h-6 bg-gray-400 rounded"></div>
            </div>
          ))
        ) : (
          data.map((product) => (
            <Link
              to={`product/${product?._id}`}
              key={product._id}
              className="bg-white rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <div className="bg-slate-400 h-48 p-3 flex justify-center items-center">
                <img
                  className="object-cover h-full hover:scale-110 transition-all"
                  src={product.productImage[0]}
                  alt={product.productName}
                />
              </div>
              <div className="p-4">
                <h2 className="font-medium text-base text-black line-clamp-1">{product?.productName}</h2>
                <p className="capitalize text-slate-500">{product?.category}</p>
                <div className="flex gap-2 mt-1">
                  <p className="text-red-600 font-medium">{displayVNCurrency(product?.sellingPrice)}</p>
                  <p className="text-slate-500 line-through">{displayVNCurrency(product?.price)}</p>
                </div>
                <button
                  className="mt-2 text-sm flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-dark text-white rounded-lg transition-all hover:from-coffee-light hover:to-coffee-green"
                  onClick={(e)=>handleAddToCart(e, product?._id)}
                >
                  <TbShoppingCartFilled /> Add to Cart
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
