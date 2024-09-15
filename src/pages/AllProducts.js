import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] =useState([])

  const fetchALlProduct = async() =>{
    const response = await fetch(SummaryApi.allProduct.url)

    const dataResponse = await response.json()

    setAllProduct(dataResponse?.data || []) 
  }
  useEffect(()=>{
    fetchALlProduct()
  }, [])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bol text-lg'>All Product</h2>
        <button className='border border-[#0091daa7] bg-[#0090da] text-white hover:bg-white hover:text-[#0091daa7] py-2 px-4 rounded-md' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      <div className='flex items-center gap-3 py-4'>
        {
          allProduct.map((product, index) => {
            return(
              <AdminProductCard data={product} key={index+ product} fetchdata={fetchALlProduct}/>
              
            )
          })
        }
      </div>

      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)}/>
        )
      }
      
    </div>
  )
}

export default AllProducts