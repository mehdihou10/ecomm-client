import {useState,useEffect} from 'react'
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Product from '../components/Product';
import axios from 'axios';
import { url } from '../api/api.url';
import { useCookies } from 'react-cookie';


const WishList = () => {

  const isSigned = useSelector(state=>state.isSigned);


  const [cookies,setCookie,removeCookie] = useCookies(['user']);
  const [products,setProducts] = useState([]);

  useEffect(()=>{

    axios.get(`${url}/api/main/wishlist/products`,{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    }).then((res)=>{

      const data = res.data;

      if(data.status === "success"){
        setProducts(data.products)
      }
    })

  },[])

  
  return (
    <div>
      <Header />

      <div className="p-[20px]">

      <div className="text-[13px] capitalize text-gray-500"><span className='font-semibold text-black'><Link to='/'>Home</Link></span>/wishlist</div>

      { products.length !== 0 ?

        <div className="show-products mt-[30px]">
        {
          products.map(product=><Product key={product.id} product={product} />)
        }
        </div>

        : <p className='text-center italic text-gray-500 mt-[30px]'>Nothing to show</p>

        }
        </div>
    </div>
  )
}

export default WishList
