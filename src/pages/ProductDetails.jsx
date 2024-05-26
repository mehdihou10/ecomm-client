import {useState,useEffect} from 'react'
import Header from '../components/Header';
import {useParams,Link,useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { updateCart } from '../store/slices/cart.slice';
import axios from 'axios';
import { url } from '../api/api.url';
import { FaStar } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineZoomOutMap,MdClose } from "react-icons/md";
import Product from '../components/Product';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';

import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import {useCookies} from 'react-cookie';



const ProductDetails = () => {

  const {productName} = useParams();

  const navigate = useNavigate();

  const [cookies,setCookie,removeCookie] = useCookies(['user']);

  const isSigned = useSelector(state=>state.isSigned);
  const dispatch = useDispatch();

  const [product,setProduct] = useState({});
  const [recommendedProducts,setProducts] = useState([]);
  const [similarProducts,setSimilarProducts] = useState([]);
  const [showImage,setShowImage] = useState(false);
  const [quantity,setQuantity] = useState(1);
  const [width,setWidth] = useState(window.innerWidth);
  const [isLiked,setIsLiked] = useState(false);

  window.onresize = (e)=>setWidth(e.target.innerWidth)


  useEffect(()=>{

    axios.get(`${url}/api/main/products/${productName}`)
    .then((res)=>{

      const data = res.data;

      if(data.status === "success"){

        setProduct(data.product)
      }
    })

  },[productName])

  useEffect(()=>{

    axios.get(`${url}/api/main/similar/products/${productName}`)
    .then((res)=>{

      const data = res.data;

      if(data.status === "success"){
        setSimilarProducts(data.products);
      }
    })


  },[productName])

  useEffect(()=>{

    if(Object.keys(product).length !== 0){

      axios.get(`${url}/api/categories/id/${product.category_id}/products`,{
        headers: {
          productid: product.id
        }
      })
    .then((res)=>{

      const data = res.data;

      if(data.status === "success"){
        setProducts(data.products);
      }
    })


    }

  },[product])

  useEffect(()=>{

    if(isSigned && Object.keys(product).length !== 0){

      isExistsInWishlist();
    }

  },[product])

  //functions
  const decreaseQte = ()=>{

    if(quantity !== 1){

      setQuantity((prev)=>prev - 1);

    }
  }


  function addToCart(){

    if(isSigned){

      axios.post(`${url}/api/main/cart/add/${product.id}`,{qte: quantity},{
        headers: {
          Authorization: `Bearer ${cookies.user}`
        }
      }).then((res)=>{

        const data = res.data;

        if(data.status === "success"){

          dispatch(updateCart());

          Swal.fire({
            icon: "success",
            title: "Product Added To Cart"
          })

        } else if(data.status === "fail"){

          Swal.fire({
            icon: "error",
            title: data.message
          })

        }
      })

    } else{
      navigate("/auth/login")
    }

  }

  function isExistsInWishlist(){

    axios.get(`${url}/api/main/wishlist/verify/${product.id}`,{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    }).then((res)=>{

      const data = res.data;

      if(data.status === "success"){
        setIsLiked(data.isExists);
      }
    })


  }

  function toggleWishlist(){

   if(isSigned){

    axios.post(`${url}/api/main/wishlist/toggle/${product.id}`,null,{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    }).then((res)=>{

      const status = res.data.status;

      if(status === "success"){
        isExistsInWishlist();
        dispatch(updateCart());
      }
    })
    

   } else{

    navigate("/auth/login");
   }

  }


  return (
    <div>

      {showImage &&

      <div className="">
        <span className="overlay-screen"></span>

        <img className='fixed top-[50px] left-1/2 -translate-x-1/2 z-[101] w-[500px] max-w-[95%] h-[500px] max-h-full object-contain mx-auto' src={product.image} />
        <MdClose onClick={()=>setShowImage(false)} className='z-[101] cursor-pointer fixed text-[40px] text-white top-[10px] right-[10px]' />

      </div>

      }

      <Header />

      <div className="p-[20px]">

      <div className="text-[13px] capitalize text-gray-500"><span className='font-semibold text-black'><Link to='/'>Home</Link></span>/{productName}</div>

      {Object.keys(product).length !== 0 && 

      <>

      <div className="product flex md:items-start flex-col md:flex-row gap-[30px] mt-[30px]">
        <div className="image relative basis-[40%] h-[400px] bg-white px-[20px] py-[25px] rounded-[10px]">
          <MdOutlineZoomOutMap onClick={()=>setShowImage(true)} className='absolute top-[10px] right-[10px] text-[20px] cursor-pointer' />
          <img className='w-full h-full max-h-[400px] object-contain' src={product.image} alt="" />
        </div>

        <div className="details flex-1 bg-white px-[20px] py-[25px] rounded-[10px]">

          <button onClick={toggleWishlist} className={`grid place-items-center w-[40px] h-[40px]
           ml-auto rounded-full border border-black cursor-pointer ${isLiked ? 'bg-black' : 'bg-white'}`}>
            <FaRegHeart className={`pointer-events-none text-[20px] ${isLiked ? 'text-white' : 'text-black'}`} />
          </button>
          <h3 className='text-[25px] font-semibold'>{product.name} <span className="text-gray-500 text-[12px] italic">({product.brand})</span></h3>
          <div className='flex items-center gap-[5px] mt-[10px] mb-[15px]'>
            <img src={product.vendor_image} className='w-[40px]' />
            <h3 className='font-semibold'>{product.first_name}_{product.last_name}</h3>
          </div>
          <span className='block text-main font-semibold text-[20px] mt-[10px]'>{product.price} DZD</span>

       {product.count > 0 && <div className="flex items-center gap-[10px] mt-[15px]">

          <div className="stars flex gap-[2px]">
            <h3 className='flex items-center gap-[1px] font-bold'><FaStar className='text-yellow-500' /> {(+product.avg).toFixed(1)}</h3>
           
          </div>

          <a href='#reviews' className='text-[14px] text-blue-500 underline'>see all {product.count} reviews</a>
        </div>}

        <h3 className='text-[14px] font-semibold mt-[20px] mb-[5px]'>Description:</h3>
          <p className='text-gray-500'>{product.description}</p>

          <div className="mt-[30px]">

            <div className="flex justify-center items-center gap-[10px]">

            <span onClick={decreaseQte} className='select-none grid place-items-center w-[40px] h-[40px] cursor-pointer bg-gray-500 text-white rounded-[6px]'>-</span>
            <span className="grid place-items-center w-[200px] h-[35px] bg-[#eee] border border-[#ccc] rounded-[6px] font-semibold">{quantity}</span>
            <span onClick={()=>setQuantity((prev)=>prev+1)} className='select-none grid place-items-center w-[40px] h-[40px] cursor-pointer bg-gray-500 text-white rounded-[6px]'>+</span>

            </div>
            <button onClick={addToCart} className='flex justify-center items-center gap-[3px]
             w-[300px] max-w-full mx-auto h-[40px] bg-main text-white mt-[15px]'>
            <LuShoppingCart className='text-[18px]' />  Add To Cart
            </button>


          </div>

        </div>
      </div>

      <div className="reviews mt-[30px]">
        <h3 className='text-[22px] font-semibold'>Product Reviews:</h3>

        <div id='reviews' className="mt-[20px]">
        <Swiper
        slidesPerView={width > 991 ? 3 : (width > 567 && width < 991) ? 2 : 1 }
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
       {
        product.comments.map((comment,index)=>(
          <SwiperSlide className='bg-white px-[15px] py-[10px] rounded-[6px]' key={index}>
            <div className="flex items-center gap-[3px]">
              <img className='w-[40px] h-[40px]' src={comment.image} />
              <h3 className='text-[14px] font-semibold'>{comment.first_name} {comment.last_name}</h3>
            </div>

            {
              comment.rating ?

              <div className="flex gap-[2px] mt-[5px]">
                {
                  [1,2,3,4,5].map(star=><FaStar key={star} className={`${star <= comment.rating ? 'text-yellow-500' : 'text-gray-400'}`} />)
                }
              </div>

              :<p className='text-[13px] text-gray-500 italic mt-[2px]'>No Rating</p>
            }

            <p className='mt-[10px]'>"{comment.value}"</p>
          </SwiperSlide>
        ))
       }
      </Swiper>
        </div>
      </div>

      <div className="recommended-products mt-[40px]">
      <h3 className='text-[22px] font-semibold mb-[20px]'>Recommended Products:</h3>

      <div className="show-products">
        { recommendedProducts.length !== 0 ?
          recommendedProducts.map(product=><Product key={product.id} product={product} />)

          : <p className='text-[14px] text-gray-500 italic'>Nothing to Show</p>
        }
      </div>
      </div>


      <div className="similar-products mt-[40px]">
      <h3 className='text-[22px] font-semibold mb-[20px]'>Similar Products:</h3>

      <div className="show-products">
        { similarProducts.length !== 0 ?
          similarProducts.map(product=><Product key={product.id} product={product} />)

          : <p className='text-[14px] text-gray-500 italic'>Nothing to Show</p>
        }
      </div>
      </div>

      </>

      }
      </div>

      <Footer />

    </div>
  )
}

export default ProductDetails
