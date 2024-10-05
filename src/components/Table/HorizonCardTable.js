import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { PiCursorClickDuotone } from "react-icons/pi";
import { CgUnavailable } from "react-icons/cg";
import Context from '../../context';
import fetchTypeWiseTable from '../../helper/Table/fetchTypeWiseTable';

const HorizonCardTable = ({ tableType, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollElement = useRef();
  const loadingList = new Array(20).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const fetchData = async () => {
    try {
      setLoading(true);
      const categoryProduct = await fetchTypeWiseTable(tableType);
      setData(categoryProduct?.data || []); // If there's no data, set an empty array
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (e, id) => {
    try {
      fetchUserAddToCart(id); // Call add to cart function with the product id
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    <div className="container mx-auto px-2 py-4 relative">
      <h2 className="text-xl font-semibold text-coffee-dark py-4">{heading}</h2>
      <div className="relative">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl bg-coffee-light shadow-lg rounded-full p-3 z-30 transition-all hover:scale-110 hover:bg-coffee-brown text-white"
        >
          <FaAngleLeft />
        </button>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl bg-coffee-light shadow-lg rounded-full p-3 z-30 transition-all hover:scale-110 hover:bg-coffee-brown text-white"
        >
          <FaAngleRight />
        </button>
        
        <div
          className="flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-none px-16"
          ref={scrollElement}
          style={{ scrollBehavior: 'smooth', overflow: 'visible' }}  
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
            : data.map((table, index) => (
                <div
                  key={index}
                  className="w-full min-w-[360px] md:min-w-[400px] max-w-[360px] md:max-w-[400px] h-40 rounded-sm shadow-md flex transition-transform transform hover:scale-110 hover:z-50 duration-300"
                  style={{ overflow: 'visible' }}  
                >
                  {table?.isAvailableTable ? (
                    <Link
                      to={"product/" + table?._id}
                      className="w-full h-full bg-white mt-2 flex rounded-sm shadow-md"
                    >
                      <div className="bg-slate-400 h-full p-3 min-w-[120px] md:min-w-[145px] flex items-center justify-center">
                        {table?.tableImage?.[0] && (
                          <img
                            className="object-scale-down h-full transition-all"
                            src={table.tableImage[0]}
                            alt={table?.tableNumber}
                            key={index}
                          />
                        )}
                      </div>
                      <div className="p-4 grid gap-2">
                        <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                          Bàn số {table?.tableNumber}
                        </h2>
                        <p className="capitalize text-slate-500">
                          {table?.tableType}
                        </p>
                        <div className="flex gap-2">
                          <p className="text-red-600 font-medium">
                            {table?.tableStatus}
                          </p>
                          <p className="text-slate-500 font-medium">
                            {table?.tableArea}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleAddToCart(e, table?._id)}
                          className="text-sm flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-brown text-coffee-dark hover:from-coffee-light hover:to-coffee-green rounded-lg"
                        >
                          <PiCursorClickDuotone /> Booking
                        </button>
                      </div>
                    </Link>
                  ) : (
                    <div className="w-full h-full bg-red-300 flex rounded-sm shadow-md">
                      <div className="bg-red-100 h-full p-3 min-w-[120px] md:min-w-[145px] flex items-center justify-center">
                        {table?.tableImage?.[0] && (
                          <img
                            className="object-scale-down h-full transition-all"
                            src={table.tableImage[0]}
                            alt={table?.tableNumber}
                            key={index}
                          />
                        )}
                      </div>
                      <div className="p-4 grid gap-2">
                        <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                          Bàn số {table?.tableNumber}
                        </h2>
                        <p className="capitalize text-slate-500">
                          {table?.tableType}
                        </p>
                        <div className="flex gap-2">
                          <p className="text-red-600 font-medium">
                            {table?.tableStatus}
                          </p>
                          <p className="text-slate-500 font-medium">
                            {table?.tableArea}
                          </p>
                        </div>
                        <div className="text-sm flex items-center cursor-not-allowed gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-brown text-coffee-dark hover:from-coffee-light hover:to-coffee-green rounded-lg">
                          <CgUnavailable /> Bàn không khả dụng
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default HorizonCardTable;
