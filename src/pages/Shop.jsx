import { useState,useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { updateCart } from '../store/slices/cart.slice';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { url } from '../api/api.url';
import { useCookies } from 'react-cookie';
import {MdClose} from 'react-icons/md';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';


const Shop = () => {

  const isSigned = useSelector(state=>state.isSigned);
  const dispatch = useDispatch();


  const [cookies,setCookie,removeCookie] = useCookies(['user']);
  const [products,setProducts] = useState([]);

  useEffect(()=>{

    getCartProducts();

  },[]);



  //functions
  function getCartProducts(){

    axios.get(`${url}/api/main/cart/products`,{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    }).then((res)=>{

      const data = res.data;

      if(data.status === "success"){

        setProducts(data.products)
      }
    })

  }

  function removeProduct(id){

    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      showCancelButton: true

    }).then((result)=>{

      if(result.isConfirmed){

        axios.delete(`${url}/api/main/cart/products/${id}`,{
          headers: {
            Authorization: `Bearer ${cookies.user}`
          }
        }).then((res)=>{
    
          if(res.data.status === "success"){
            getCartProducts();
            dispatch(updateCart());
          }
        })

      }
    })
  }


  return (
    <div>
      <Header />

      <div className="p-[20px] min-h-[50vh]">
      <div className="text-[13px] capitalize text-gray-500"><span className='font-semibold text-black'><Link to='/'>Home</Link></span>/shop</div>

      { products.length !== 0 ?

      <div className="">

      <div className="overflow-x-auto">

<div className="table mt-[20px] w-full">

  
   <table className="table-auto w-full overflow-x-scroll">
   <thead className="bg-gray-50 border-b-2 border-gray-200">
     <tr>
       <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
         Product
       </th>
       <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
         Name
       </th>
       <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
         Price
       </th>
       <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
         Quantity
       </th>
      
       <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
         Total
       </th>
       <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
         Remove
       </th>
    


     </tr>
   </thead>
   <tbody className="">
     {products.map((product) => (
       <tr
         className="border-b-2 h-16 border-gray-200 bg-white"
         key={product.id}
       >
         <td className="p-3 text-sm text-gray-700">
           {" "}
           <img
             src={product.image}
             className="w-10 h-10 sm:w-16 object-contain"
           />{" "}
         </td>
         <td className="p-3 text-sm text-gray-700">
           {product.name}
         </td>
         <td className=" p-3 text-sm text-gray-700">
           {product.price} DZD
         </td>
         <td className=" p-3 text-sm text-gray-700">
           <div className="w-[40px] h-[30px] grid place-items-center border rounded-[6px]">{product.product_qte}</div>
         </td>

         <td className=" p-3 text-sm text-main">
           {+product.product_qte * +product.price} DZD
         </td>
         
         <td className=" p-3 text-sm text-gray-700">
           <MdClose onClick={()=>removeProduct(product.id)} className='text-red-500 text-[25px] cursor-pointer' />
         </td>
      
       </tr>
     ))}
   </tbody>
  </table>

 
  

  

  
</div>

      </div>

      <Link to="/checkout" className='grid place-items-center w-[150px] h-[40px]
           text-white bg-main rounded-[10px] mx-auto mt-[20px]'>Go Checkout</Link>

      </div>

        :<div className='text-center mt-[30px]'>
          <p className='italic font-semibold text-[20px] mb-[15px]'>Your Cart is Empty!</p>
          <Link to="/" className='grid place-items-center w-[150px] h-[40px]
           text-white bg-main rounded-[10px] mx-auto'>Go Shopping</Link>
        </div>
      }
      </div>

      <Footer />
    </div>
  )
}

export default Shop
