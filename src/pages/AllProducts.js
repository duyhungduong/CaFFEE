import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bol text-lg'>All Product</h2>
        <button className='border border-[#0091daa7] bg-[#0090da] text-white hover:bg-white hover:text-[#0091daa7] py-2 px-4 rounded-md' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
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