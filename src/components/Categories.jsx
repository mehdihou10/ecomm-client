import {useState,useEffect} from 'react'
import axios from 'axios'
import { url } from '../api/api.url'
import { Link } from 'react-router-dom'


const Categories = () => {

    const [categories,setCategories] = useState([]);

    useEffect(()=>{
        axios.get(`${url}/api/categories`)
       .then((res)=>{
        
        const data = res.data;

        if(data.status === "success"){
            setCategories(data.categories)
        }

    })

    },[])


  return (
    <div className='my-[50px]'>
      <div className="categories grid grid-cols-2 xl:grid-cols-4 place-items-center gap-[30px]">

        {
            categories.map(category=> (

                <div key={category.id} className="text-center">

                
                <Link to={`/categories/${category.name}`} key={category.id} className=''>

                    <div className="flex flex-col justify-center items-center
                 text-center w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] mx-auto rounded-full bg-white
                 p-[15px] box-shadow duration-500 hover:bg-[#eee] hover:-translate-y-[10px]">

                    
                    <img className='w-[60px] h-[60px] mx-auto' src={category.image} />
                    </div>

                    <h3 className='max-w-[120px] text-[14px] text-center font-semibold mt-[5px]'>{category.name}</h3>
                    
                </Link>

                </div>

            ))
        }

      </div>
    </div>
  )
}

export default Categories
