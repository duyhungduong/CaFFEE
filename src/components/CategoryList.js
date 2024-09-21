import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import displayVNCurrency from "../helper/displayCurrency";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(20).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();

    // Tạo độ trễ trước khi hoàn thành việc tải dữ liệu
    setTimeout(() => {
      setLoading(false); // Kết thúc loading sau khi hết thời gian trì hoãn
      setCategoryProduct(dataResponse.data); // Lưu dữ liệu
    }, 250); // Trì hoãn 2 giây (2000 milliseconds)
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4 m-2">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-coffee p-4">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  key={"areaTableLoading" + index}
                  className="bg-gray-200 p-6 rounded-lg shadow-md flex flex-col justify-between items-center skeleton-loading"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 text-center flex items-center justify-center">
                  <div className="bg-gray-500 w-20 h-20 object-cover rounded-full mx-auto"></div> 
                  </div>
                  <p className="bg-scale-500 text-center mt-2 w-20 h-4 rounded"></p>
                </div>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <Link
                key={product?.category + index}
                  to={"/category-product/" + product?.category}
                  className="cursor-pointer bg-coffee-beige p-6 rounded-lg shadow-md transition-all hover:shadow-lg flex flex-col justify-between"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 text-center flex items-center justify-center">
                    <img
                      className="w-20 h-20 object-cover rounded-full mx-auto border-4 border-coffee-brown transition-all hover:scale-105"
                      src={product?.productImage[0]}
                      alt={product?.category}
                    />
                  </div>
                  <p className="text-center mt-2 text-sm md:text-base capitalize">
                    {product?.category}
                  </p>
                  {/* <p className="text-center text-sm md:text-base capitalize">
                    {displayVNCurrency(product?.price)}
                  </p> */}
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;


