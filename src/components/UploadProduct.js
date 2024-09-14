import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import productCategory from "../helper/productCategory";
import { MdCloudUpload } from "react-icons/md";
import uploadImage from "../helper/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";

const UploadProduct = ({ onClose }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {};

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage= async(index) =>{


    console.log("index" , index)
    const newProductImage = [...data.productImage]
    newProductImage.splice(index,1)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [...newProductImage]
      }
    })
  }
  return (
    <div className="fixed w-full h-full  bg-slate-100 bg-opacity-30 top-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-1">
          <h2 className="font-bold text-lg ">Upload Product</h2>
          <div
            className="w-fit ml-auto text-xl hover:text-red-600"
            onClick={onClose}
          >
            <IoClose />
          </div>
        </div>
        <form
          action=""
          className="grid p-4 gap-1.5 overflow-y-scroll h-full pb-5"
        >
          <label htmlFor="productName">Tên sản phẩm </label>
          <input
            type="text"
            name="productName"
            id="productName"
            placeholder=" Nhập tên sản phẩm ... "
            value={data.productName}
            onChange={handleOnChange}
            className="p-3 bg-slate-100 border rounded"
          />
          <label htmlFor="brandName" className="mt-1.5">
            Tên thương hiệu{" "}
          </label>
          <input
            type="text"
            name="brandName"
            id="brandName"
            placeholder=" Nhập tên thương hiệu ... "
            value={data.brandName}
            onChange={handleOnChange}
            className="p-3 bg-slate-100 border rounded"
          />
          <label htmlFor="category" className="mt-1.5">
            {" "}
            Loại{" "}
          </label>
          <select
            value={data.category}
            className="p-3 bg-slate-100 border rounded"
          >
            {productCategory.map((el, index) => {
              return (
                <option key={el.value + index} value={el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" className="mt-1.5">
            {" "}
            Hình ảnh sản phẩm{" "}
          </label>
          <label htmlFor="uploadImageInput">
            <div className="bg-slate-100 p-2 border rounded-md h-36 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-400 flex justify-center items-center flex-col gap-1">
                <span className="text-4xl">
                  <MdCloudUpload />
                </span>
                <p className="text-xm">Tải lên hình ảnh sản phẩm</p>
                <input
                  type="file"
                  name="uploadImageInput"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className=" flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 bg-opacity-20 rounded-full group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-400 text-xs">
                {" "}
                **Vui lòng tải lên hình ảnh sản phẩm**
              </p>
            )}
          </div>
          <button className="px-4 py-4 mt-2 mb-10 bg-[#0090da] hover:bg-[#0091daa7] text-white rounded-md shadow-xl ">
            Thêm sản phẩm
          </button>
        </form>
      </div>

      {/**Hien thi hinh anh khi re chuot */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
