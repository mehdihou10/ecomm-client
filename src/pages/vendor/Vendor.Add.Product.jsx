import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import DashboardSidebar from '../../components/Dashboard.Sidebar';
import DashboardHeader from '../../components/Dashboard.Header';
import { PhotoIcon } from '@heroicons/react/24/solid'
import { FaTrashAlt } from "react-icons/fa";
import {handleFileChange} from '../../functions/image.upload';
import {toast,ToastContainer} from 'react-toastify';
import axios from 'axios';
import { url } from '../../api/api.url';
import {useCookies} from 'react-cookie';


const VendorAddProduct = () => {

  const navigate = useNavigate();


  const [cookies,setCookie,removeCookie] = useCookies(['user']);

  const [userData,setUserData] = useState({});

  const [productData,setProductData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    category_id: "",
    vendor_id: "",
    image: "",
    qte: "",
    date: new Date()
  })

  useEffect(()=>{

    axios.post(`${url}/api/decode`,null,{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    })
    .then((res)=>{

      const data = res.data;

      if(data.status === "success"){

        setUserData(data.user);
        setProductData({...productData,vendor_id: data.user.id})
      }
    })

  },[])


  const [categories,setCategories] = useState([]);

  useEffect(()=>{

    axios.get(`${url}/api/categories`)
    .then((res)=>{

      const data = res.data;

      if(data.status === "success"){
        setCategories(data.categories);
      }
    })
  },[])

  const addProduct = (e)=>{

    e.preventDefault();

    axios.post(`${url}/api/products/add`,productData)
    .then((res)=>{

      const data = res.data;

      if(data.status === "success"){
        navigate(`/vendor_dashboard/${userData.first_name}_${userData.last_name}/products`);
      } else if(data.status === "fail"){

        for(const error of data.message){
          toast.error(error.msg);
        }

      } else{

        toast.error('Something Wrong Happend');
      }
      
    })

    
  }


return (

<>
<ToastContainer theme='colored' position='top-left' />

<div className='flex'>

    <div className="hidden md:block"><DashboardSidebar active={2} /></div>
    
    <div className="flex-1">

      <DashboardHeader active={2} />

      <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="head text-center">
          <h3 className='text-[30px] font-semibold'>Product Form:</h3>
          <p className='text-gray-500 text-[14px] mt-[20px]'>Please Fill in All The Product Information</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={addProduct} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Product name
              </label>
              <div className="mt-2">
                <input
                onChange={(e)=>setProductData({...productData,name: e.target.value})}
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block px-[10px] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Brand
              </label>
              <div className="mt-2">
                <input
                onChange={(e)=>setProductData({...productData,brand: e.target.value})}
                  id="brand"
                  name="brand"
                  type="text"
                  required
                  className="block px-[10px] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price(DZD)
              </label>
              <div className="mt-2">
                <input
                onChange={(e)=>setProductData({...productData,price: e.target.value})}
                  id="price"
                  name="price"
                  type="number"
                  min={0}
                  required
                  className="block px-[10px] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Quantity in Stock
              </label>
              <div className="mt-2">
                <input
                onChange={(e)=>setProductData({...productData,qte: e.target.value})}
                  id="qte"
                  name="qte"
                  type="number"
                  min={1}
                  required
                  className="block px-[10px] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            

            <div>
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <select
                onChange={(e)=>setProductData({...productData,category_id: e.target.value})}
                  id="category"
                  name="category"
                  required
                  className="block px-[10px] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                >

                  <option selected disabled value="Select Category">Select Category</option>
                  
                  {
                    categories.map(category=><option key={category.id} value={category.id}>{category.name}</option>)
                  }

                </select>
                
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Product Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                {productData.image === "" ?
                  <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2  hover:text-indigo-500"
                    >
                      <span>Upload an image</span>
                      <input onChange={(ev)=>handleFileChange(ev,setProductData,productData)} id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG,JPEG less than 10MB</p>
                </div>

                : <div className="image">
                  <img src={productData.image} className='w-full h-full object-cover' />
                  <FaTrashAlt
                  onClick={()=>setProductData({...productData,image: ""})}
                   className='text-red-500 ml-auto mt-[5px] cursor-pointer text-[20px]' />
                </div>
                }
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2 relative">
                <textarea
                onChange={(e)=>{
                  setProductData({...productData,description: e.target.value});

                  if(e.target.value.length >= 100){

                    e.target.value = e.target.value.slice(0,99)
                  }
                }}
                  id="description"
                  name="description"
                  required
                  className="block resize-none h-[150px] px-[10px] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />

                <span className={`absolute ${productData.description.length < 50  ? 'text-red-500' : 'text-green-600'} right-[10px] bottom-[10px] text-[10px]`}>{productData.description.length}/100</span>
              </div>
            </div>

            <div className='submit-btn'>
              <button
              type='submit'
                className="flex w-full justify-center rounded-md bg-main px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add
              </button>
            </div>
          </form>

        
        </div>
      </div>
    </div>
  
</div>

</>

)
}

export default VendorAddProduct;

<div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
</div>

