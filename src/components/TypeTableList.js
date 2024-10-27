import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import { TiGroup } from "react-icons/ti";
import { MdGroupAdd } from "react-icons/md";
import { RiVipCrown2Fill } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";  

const TypeTableList = () => {
  const [typeTable, setTypeTable] = useState([]);
  const [loading, setLoading] = useState(false);

  const typeTableLoading = new Array(20).fill(null);

  const fetchTypeTable = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.typeTable.url);
    const dataResponse = await response.json();

    // Tạo độ trễ trước khi hoàn thành việc tải dữ liệu
    setTimeout(() => {
      setLoading(false); // Kết thúc loading sau khi hết thời gian trì hoãn
      setTypeTable(dataResponse.data); // Lưu dữ liệu
    }, 50); // Trì hoãn 2 giây (2000 milliseconds)
  };

  useEffect(() => {
    fetchTypeTable();
  }, []);
  return (
    <div className="container mx-auto p-4 m-2">
      <div className="flex items-center md:mx-52 gap-4 justify-between overflow-scroll scrollbar-coffee p-4">
        {loading
          ? typeTableLoading.map((el, index) => {
              return (
                <div
                  key={"typeTableLoading" + index}
                  className="bg-gray-200 p-8 rounded-lg shadow-md flex flex-col justify-between items-center skeleton-loading"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 text-center flex items-center justify-center">
                    <div className="bg-gray-500 w-full h-full object-cover rounded-full mx-auto"></div>
                  </div>
                  <p className="bg-scale-500 text-center mt-2 w-20 h-4 rounded"></p>
                </div>
              );
            })
          : typeTable.map((table, index) => {
              return (
                <Link
                  key={table?.tableType + index}
                  to={"/table-tableType?category=" + table?.tableType}
                  className="cursor-pointer bg-gradient-to-r from-coffee-beige to-coffee-light hover:from-pastel-teal hover:to-pastel-blue-dark  p-8 rounded-lg shadow-md hover:shadow-lg flex flex-col justify-between text-coffee-dark hover:text-amber-600  transition-transform duration-300 transform hover:scale-105"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 text-center flex items-center justify-center">
                    <img
                      className="w-full h-full object-cover rounded-full mx-auto border-4 border-coffee-brown transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-[#6b3310]"
                      src={table?.tableImage[0]}
                      alt={table?.tableType}
                    />
                  </div>
                  {table?.tableType === "Bàn dành cho nhóm" && (
                    <p className="text-center flex items-center justify-center hover:text-amber-600 font-serif font-medium mt-2 text-sm md:text-base capitalize">
                    <TiGroup size={20} className="mr-2"/>Bàn nhóm
                    </p>
                  )} 
                  {table?.tableType === "Bàn 2 người" && (
                    <p className="text-center flex items-center justify-center hover:text-amber-600 font-serif font-medium mt-2 text-sm md:text-base capitalize">
                    <FaUserGroup  size={20} className="mr-2"/> {table?.tableType}
                    </p>
                  )}
                  {table?.tableType === "Bàn 4 người" && (
                    <p className="text-center flex items-center justify-center hover:text-amber-600 font-serif font-medium mt-2 text-sm md:text-base capitalize">
                    <MdGroupAdd  size={20} className="mr-2"/> {table?.tableType}
                    </p>
                  )}{table?.tableType === "VIP table" && (
                    <p className="text-center flex items-center justify-center hover:text-amber-600 font-serif font-medium mt-2 text-sm md:text-base capitalize">
                    <RiVipCrown2Fill  size={20} className="mr-2"/>  Bàn Vị Trí Tốt
                    </p>
                  )}
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

export default TypeTableList;
