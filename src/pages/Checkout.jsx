import {useState,useEffect} from 'react'
import Header from '../components/Header'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { updateCart } from '../store/slices/cart.slice';
import {cities} from '../data/cities';
import axios from 'axios';
import { url } from '../api/api.url';
import { useCookies } from 'react-cookie';
import { MdClose } from 'react-icons/md';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';



const Checkout = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [cookies,setCookie,removeCookie] = useCookies(['user']);

  const [userData,setUserData] = useState({});
  const [products,setProducts] = useState([]);
  const [vendors,setVendors] = useState(0);
  const [prices,setPrices] = useState([]);
  const [coupon,setCoupon] = useState("");
  const [appliedCoupons,setAppliedCoupons] = useState([]);
  const [showInput,setShowInput] = useState(false);
  const [currentIndex,setCurrentIndex] = useState(0);

  const totalAmount = prices.reduce((prev,cur)=>prev+cur,0) + (vendors * 200);

  //order data
  const [orderData,setOrderData] = useState({
    user_city: "",
    user_phone_number: "",
    address: "",
    date: new Date()

  })


  useEffect(()=>{

    axios.post(`${url}/api/decode`,null,{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    }).then((res)=>{

      const data = res.data;

      if(data.status === "success"){
        setUserData(data.user);
      }
    })
  },[])

  useEffect(()=>{

    getData();

  },[])


  useEffect(()=>{

    axios.get(`${url}/api/main/cart/products`,{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    }).then((res)=>{

      const data = res.data;

      if(data.status === "success"){
        
        const newArray = [];

        for(let price of data.prices){

          newArray.push(+price.price * +price.qte)
        }

        setPrices(newArray);

      }
    })

  },[])


//functions

  function getData(){

    axios.get(`${url}/api/main/cart/products`,{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    }).then((res)=>{

      const data = res.data;

      if(data.status === "success"){
        setProducts(data.products);
        setVendors(data.vendors)

      }
    })

  }


  function applyCoupon(){

    setShowInput(false);


    if(appliedCoupons.includes(coupon.toLowerCase())){

      Swal.fire({icon: "error",title: "Coupon Already Applied"})

    } else{

    axios.post(`${url}/api/main/coupon/verify`,{coupon})
    .then((res)=>{

      const status = res.data.status;

      if(status === "success"){

        Swal.fire({icon: "success",title: "Coupon Applied"})


        const newArray = appliedCoupons;

        newArray.push(coupon.toLowerCase());
        setAppliedCoupons(newArray);

        const newPricesArray = prices;

        newPricesArray[currentIndex] = newPricesArray[currentIndex] - (newPricesArray[currentIndex] * 25) / 100;

        setPrices(newPricesArray);
        getData();


      } else if(status === "fail"){

        Swal.fire({icon: "error",title: res.data.message})

      } else{

        Swal.fire({icon: "error",title: "Something went Wrong"})

      }


    })

  }

  }

  function completeOrder(e){

    e.preventDefault();


    for(let i = 0; i < products.length;i++){

      const product = products[i];

      const order = {
        ...orderData,
        qte: product.product_qte,
        user_id: userData.id,
        product_id: product.id,
        total: prices[i],
        user: userData
      }

      axios.post(`${url}/api/main/order/complete`,order).then((res)=>{

        const data = res.data;

        console.log(data)

        if(data.status === "success"){

          dispatch(updateCart());

          navigate("/checkout/order/confirm");

        } else if(data.status === "fail"){

          const errors = data.message;

          for(let error of errors){
              Swal.fire({icon: "error",title: error.msg})
          }
        }
      })
    }

  }


  return (
    
    <div className='bg-white'>

      {showInput &&

      <div className="">

      <span className='overlay-screen'></span>

      <div className="fixed top-[50px] left-1/2 -translate-x-1/2 bg-white z-[101] px-[15px] pt-[10px] pb-[20px]">

        <MdClose onClick={()=>setShowInput(false)} className='ml-auto mb-[10px] text-[30px] text-gray-500 cursor-pointer' />
        <input onChange={(e)=>setCoupon(e.target.value)} type="text" placeholder='Coupon' className='block w-full border px-[10px] py-[5px]' />
        <button onClick={applyCoupon} className='grid place-items-center w-fit bg-main text-white px-[10px] py-[5px] mx-auto mt-[15px]'>Apply</button>

      </div>

      </div>

      }


      <Header />

      { Object.keys(userData).length !== 0 &&

        <div className="p-[20px]">
      <div className="text-[13px] capitalize text-gray-500">
        <span className='font-semibold text-black'><Link to='/'>Home</Link></span>/
        <span className='font-semibold text-black'><Link to='/cart'>cart</Link></span>
        /checkout
        </div>

      <div className="mt-[30px] flex flex-col-reverse lg:flex-row lg:items-start gap-[30px]">

        
        <form onSubmit={completeOrder} className="details flex-1 bg-background px-[20px] py-[25px]">
          <h3 className='font-rokkit font-semibold text-[20px] mb-[20px]'>Billing Details</h3>

          <div className="">

            <label className='block'>Select a City</label>

          <select onChange={(e)=>setOrderData({...orderData,user_city: e.target.value})} className='checkout-input'>
            {
              cities.map(city=><option key={city}>{city}</option>)
            }
          </select>

          </div>

          <div className="my-[20px] flex flex-col sm:flex-row gap-[20px] sm:gap-[15px]">

          <div className="flex-1">
            <label className="block">First Name</label>
            <input type="text" disabled defaultValue={userData.first_name} className='checkout-input bg-gray-200 border-[#ccc]' />
          </div>

          <div className="flex-1">
            <label className="block">Last Name</label>
            <input type="text" disabled defaultValue={userData.last_name} className='checkout-input bg-gray-200 border-[#ccc]' />
          </div>

          </div>

          <div className="my-[20px]">
            <label className="block">Address</label>
            <input onChange={(e)=>setOrderData({...orderData,address: e.target.value})} type="text" placeholder='Full Address' className='checkout-input' />
          </div>


          <div className="flex flex-col sm:flex-row gap-[20px] sm:gap-[15px]">

          <div className="flex-1">
            <label className="block">Email</label>
            <input type="text" disabled defaultValue={userData.email} className='checkout-input bg-gray-200 border-[#ccc]' />
          </div>

          <div className="flex-1">
            <label className="block">Phone Number</label>
            <input onChange={(e)=>setOrderData({...orderData,user_phone_number: e.target.value})} type="text" placeholder='Phone Number' className='checkout-input' />
          </div>

          </div>

          <button type="submit" className='grid place-items-center mx-auto mt-[20px] w-[150px] h-[40px] text-white bg-main'>
          Place Order
           </button> 

        </form>


        <div className="cart flex-1 bg-background px-[20px] py-[25px] text-gray-500">

        <h3 className='font-rokkit font-semibold text-[20px] mb-[20px] text-black'>Cart Total</h3>

        <div className="cart-data">

          {
            products.map((product,index)=>(

              <div key={product.id} className="flex flex-wrap gap-[15px] items-center justify-between border-b border-[#ccc] pb-[15px] mb-[20px]">

                <div className=""><span className='text-black font-semibold'>{product.product_qte}</span> X {product.name}</div>

                <h3>{prices[index]} DZD</h3>

                <button onClick={()=>{

                  setShowInput(true);
                  setCurrentIndex(index);

                }} className='w-fit px-[10px] py-[5px] grid place-items-center text-white bg-main text-[14px]'>Apply Coupon</button>
              </div>
            ))
          }

          <div className="flex justify-between items-center mb-[20px]">
            <span>Delivery(For Each Buyer)</span>

            <span><span className='text-black font-semibold'>{vendors}</span> X 200 DZD</span>
          </div>

          <div className="text-center">
            <h3 className='text-[30px] font-semibold text-black'>Total:</h3>
            <h4 className='text-main font-semibold text-[25px] mt-[5px]'>{totalAmount} DZD</h4>
          </div>


        </div>

        </div>


      </div>
      </div>
      }

      <Footer />
    </div>

  )
}

export default Checkout
