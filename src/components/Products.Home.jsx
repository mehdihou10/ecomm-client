import {useState,useEffect} from 'react'
import axios from 'axios';
import { url } from '../api/api.url';
import Product from './Product';


const ProductsHome = () => {

    const [products,setProducts] = useState([]);

    useEffect(()=>{

        axios.get(`${url}/api/main/products`)
        .then((res)=>{

            const data = res.data;

            if(data.status === "success"){
                setProducts(data.products);
            }
        })

    },[])

  return (
    <div className='py-[20px] px-[20px] sm:px-[50px]'>
      
      <h3 className='font-semibold text-[22px] sm:text-[28px] mb-[20px]'>Trending Products</h3>

      <div className="show-products">
        {
            products.map(product=><Product key={product.id} product={product} />)
        }
      </div>
    </div>
  )
}

export default ProductsHome;
