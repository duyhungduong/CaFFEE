import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();

  const [loading, setLoading] = useState(false);

  const productImageListLoading = new Array(4).fill(null)

  const [activeImage, setActiveImage] = useState("")

  console.log("product id", params);

  const fetchProductDetails = async () => {
    setLoading(true);
    // API call to fetch product details
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });

    const dataResponse = await response.json();

    setTimeout(() => {
      setLoading(false);
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data?.productImage[0])
    }, 250);
  };

  console.log("data product ", data);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const handleMouseEnterProduct = (imgURL) =>{
    setActiveImage(imgURL)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-red-500 min-h-[200px] flex flex-col lg:flex-row gap-5 ">
        {/**Images */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-5 ">
            <div className="lg:h-96 lg:w-96 h-[300px] w-[300px] bg-slate-200">
                <img src={activeImage}
                className="h-full w-full object-scale-down mix-blend-multiply" alt="" />
            </div>
            <div className="h-full">
                {
                    (
                        <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full ">
                        {
                        data?.productImage?.map((imgURL, index)=>{
                            return(
                                <div className="h-20 w-20 rounded bg-slate-300 p-1" key={imgURL}>
                                    <img onClick={()=>handleMouseEnterProduct(imgURL)} src={imgURL} alt="" className="cursor-pointer w-full h-full object-scale-down mix-blend-multiply"/>
                                </div>
                            )
                        })
                        }
                        </div>
                    )
                }
            </div>
        </div>
        {/**Details */}
        <div>
                product details
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
