import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'

const AllBooking = () => {
    const [data,setData] = useState([])

    const fetchBookingDetails = async()=>{
      const response = await fetch(SummaryApi.allBooking.url,{
        method : SummaryApi.allBooking.method,
        credentials : 'include'
      })
  
      const responseData = await response.json()
  
      setData(responseData.data)
      console.log("booking list",responseData)
    }
  
    useEffect(()=>{
      fetchBookingDetails()
    },[])
  return (
    <div>AllBooking</div>
  )
}

export default AllBooking