import {useState,useEffect} from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import { url } from '../api/api.url';
import Header from '../components/Header';
import img from '../images/category.jpg';
import Product from '../components/Product';


const CategoryProducts = () => {

    const {categoryName} = useParams();

    const [products,setProducts] = useState([]);

    useEffect(()=>{

        axios.get(`${url}/api/categories/name/${categoryName}/products`)
        .then((res)=>{

            const data = res.data;

            console.log(data)

            if(data.status === "success"){
                setProducts(data.products);
            }
        })

    },[categoryName])



  return (
    <div>
      <Header />

      <div className="image relative">
        <img src={img} className='w-full h-[200px]' />

        <div className="absolute text-center w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
            <h3 className='font-semibold text-[35px] mb-[10px]'>{categoryName}</h3>
            <div className="text-[13px] capitalize text-gray-400"><span className='font-semibold text-white'><Link to='/'>Home</Link></span>/{categoryName}</div>


        </div>
      </div>

      <div className="show-products mt-[40px] p-[20px]">
        {
            products.map(product=><Product key={product.id} product={product} />)
        }
      </div>
    </div>
  )
}

export default CategoryProducts;
