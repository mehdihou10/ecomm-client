import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ConfirmOrder = () => {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center px-[15px]'>

        <FaCheckCircle className='text-[150px] text-green-500 mx-auto' />
        <p className='my-[20px] text-[28px] font-semibold'>Congratulations! Your order is complete. <br /> awaiting the vendors' acceptance.</p>
        <Link to="/" className='w-[150px] h-[40px] mx-auto grid place-items-center text-white bg-main rounded-[6px]'>Back to Home</Link>
      
    </div>
  )
}

export default ConfirmOrder;
