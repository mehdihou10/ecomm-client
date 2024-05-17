import {useState,useEffect} from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import {cities} from '../data/cities';
import axios from 'axios';
import { url } from '../api/api.url';
import { useCookies } from 'react-cookie';

const Checkout = () => {

  const [cookies,setCookie,removeCookie] = useCookies(['user']);

  const [products,setProducts] = useState([]);


  useEffect(()=>{

    axios.get(`${url}/api/main/cart/products`,{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    }).then((res)=>{

      const data = res.data;

      if(data.status === "success"){
        setProducts(data.products);
      }
    })


  },[])

  console.log(products)



  return (
    <div className='bg-white h-[100vh]'>
      <Header />

      <div className="p-[20px]">
      <div className="text-[13px] capitalize text-gray-500"><span className='font-semibold text-black'><Link to='/'>Home</Link></span>/checkout</div>

      <div className="mt-[30px] flex flex-col-reverse lg:flex-row lg:items-start gap-[30px]">

        
        <form className="details flex-1 bg-background px-[20px] py-[25px]">
          <h3 className='font-rokkit font-semibold text-[20px] mb-[20px]'>Billing Details</h3>

          <div className="">

            <label className='block'>Select a City</label>

          <select className='checkout-input'>
            {
              cities.map(city=><option key={city}>{city}</option>)
            }
          </select>

          </div>


          <div className="my-[20px] flex flex-col sm:flex-row gap-[20px] sm:gap-[15px]">
            <div className="flex-1">
              <label className="block">First Name</label>
              <input type="text" placeholder='First Name' className='checkout-input' />
            </div>


            <div className="flex-1">
              <label className="block">Last Name</label>
              <input type="text" placeholder='Last Name' className='checkout-input' />
            </div>


          </div>

          <div className="flex flex-col sm:flex-row gap-[20px] sm:gap-[15px]">

          <div className="flex-1">
            <label className="block">Address</label>
            <input type="text" placeholder='Full Address' className='checkout-input' />
          </div>

          <div className="flex-1">
            <label className="block">Phone Number</label>
            <input type="text" placeholder='Phone Number' className='checkout-input' />
          </div>

          </div>

          <input type="submit" value="Place Order" className='grid place-items-center mx-auto mt-[20px] w-[150px] h-[40px] text-white bg-main' />

        </form>


        <div className="cart flex-1 bg-background px-[20px] py-[25px] text-gray-500">

        <h3 className='font-rokkit font-semibold text-[20px] mb-[20px] text-black'>Cart Total</h3>

        <div className="cart-data">

          {
            products.map(product=>(

              <div key={product.id} className="flex flex-wrap gap-[15px] items-center justify-between border-b border-[#ccc] pb-[15px] mb-[20px]">

                <div className=""><span className='text-black font-semibold'>{product.product_qte}</span> X {product.name}</div>

                <h3>{+product.product_qte * +product.price} DZD</h3>

                <button className='w-fit px-[10px] py-[5px] grid place-items-center text-white bg-main text-[14px]'>Apply Coupon</button>
              </div>
            ))
          }

          <div className="flex justify-between items-center mb-[20px]">
            <span>Delivery(For Each Buyer)</span>

            <span><span className='text-black font-semibold'>2</span> X 200 DZD</span>
          </div>

          <div className="text-center">
            <h3 className='text-[30px] font-semibold text-black'>Total:</h3>
            <h4 className='text-main font-semibold text-[25px] mt-[5px]'>800444 DZD</h4>
          </div>


        </div>

        </div>


      </div>
      </div>
    </div>
  )
}

export default Checkout
