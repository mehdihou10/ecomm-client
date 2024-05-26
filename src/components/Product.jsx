import React from 'react'
import axios from 'axios';
import {url} from '../api/api.url';
import {useNavigate} from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify';


const Product = ({product}) => {

  const navigate = useNavigate();

  function addView(){

    axios.patch(`${url}/api/main/products/${product.id}/add/view`,null)
    .then((res)=>{

      const status = res.data.status;

      if(status === "success"){
        navigate(`/products/${product.name}`)
      } else{
        toast.error('Something went Wrong');
      }
    })
  }


  return (
    
    <div className='bg-white rounded-[10px] shadow-lg overflow-hidden h-[400px] relative'>
      <ToastContainer theme='colored' position='top-left' />
      <div className="image h-[200px] p-[15px]">
        <img className='w-full h-full object-contain' src={product.image} />
      </div>

      <div className="p-[20px]">

      <h3 className='font-semibold font-rokkit text-[20px]'>{product.name}
      <span className='text-gray-500 italic text-[14px]'>({product.brand})</span>
      </h3>

      

      <span className='absolute bottom-[60px] block text-main text-[18px] font-semibold mt-[30px]'>{product.price} DZD</span>

      </div>

      <button onClick={addView} className="absolute bottom-0 font-rokkit flex justify-center items-center gap-[2px] w-full h-[40px] bg-main text-white font-semibold text-[18px]">
        Show Details
      </button>

    </div>

    
  )
}

export default Product
