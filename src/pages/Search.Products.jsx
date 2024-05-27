import {useState,useEffect} from 'react'
import {useParams,useNavigate, Link} from 'react-router-dom';
import Header from '../components/Header';
import Product from '../components/Product';
import axios from 'axios';
import { url } from '../api/api.url';
import { IoTelescopeOutline } from "react-icons/io5";
import Footer from '../components/Footer';
import Loader from "react-js-loader";



const SearchProducts = () => {

  const {searchText} = useParams();

  const navigate = useNavigate();

  const [products,setProducts] = useState([]);
  const [isExists,setIsExists] = useState(true);

  useEffect(()=>{

    axios.post(`${url}/api/main/search`,{text: searchText})
    .then((res)=>{

      const data = res.data;

      if(data.status === "success"){
        setProducts(data.products);
        setIsExists(true);
      } else if(data.status === "fail"){

        setProducts([]);
        setIsExists(false);

      } else if(data.status === "error"){
        navigate("/");
      }
    })

  },[searchText])


  return (
    <div>
      <Header />
      <div className="p-[20px] min-h-[50vh]">
        {
          isExists ?
          <>
          <div className="text-[13px] capitalize text-gray-500 mb-[30px]"><span className='font-semibold text-black'><Link to='/'>Home</Link></span>/search</div>

          <h1 className='text-gray-500 text-[25px]'>results for <span className='font-bold text-black'>"{searchText}"</span></h1>

        <div className="show-products mt-[10px]">
          {
            products.length === 0 ?

            <div className="my-[20px] w-fit mx-auto">
            <Loader type="spinner-default" bgColor={"blue"} color={"blue"} size={100} />
            </div>

            :
            products.map(product=><Product key={product.id} product={product} />)
          }
        </div>
          </>

          :
          <div className='text-center'>
            <div className="grid place-items-center bg-white w-[60px] h-[60px] rounded-full mx-auto text-[30px]"><IoTelescopeOutline className='text-main' /></div>
            <p className='font-semibold text-[25px] my-[10px]'>No results for "{searchText}" </p>
            <Link to='/' className='text-blue-500 underline'>Back Home</Link>
          </div>
        }
      </div>

      <Footer />
    </div>
  )
}

export default SearchProducts;
