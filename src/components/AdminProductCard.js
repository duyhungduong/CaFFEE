import React, { useState } from "react";
import { FaLess } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayVNCurrency from "../helper/displayCurrency";

const AdminProductCard = ({ 
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false)
  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40 ">
      <img src={data?.productImage[0]} alt="" width={120} height={120} className="w-fit mx-auto" />
      <h1>{data.productName}</h1>

      <div >
      <div>
        {displayVNCurrency(data.sellingPrice)}
        
      </div>
        <div className="w-fit ml-auto p-2 rounded-full bg-[#4bac4d] hover:text-white hover:bg-[#4bac4dc5] cursor-pointer" onClick={()=>setEditProduct(true)}>
        <MdModeEditOutline/>
      </div>
      </div>

      
      </div>
      {
        editProduct && (
<AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/> 
        )
      }
      
    </div>
  );
};

export default AdminProductCard;
