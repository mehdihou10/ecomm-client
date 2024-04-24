import axios from "axios";
import { url } from "../../api/api.url";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import DashboardSidebar from "../../components/Dashboard.Sidebar";
import DashboardHeader from "../../components/Dashboard.Header";
import { FaStar } from "react-icons/fa6";
import moment from 'moment';



const VendorProductDeatils = () => {
  const { productId } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [category, setCategory] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    price: "",
    qte: "",
    description: "",
    category_id: "",
    vendor_id: "",
    image: "",
  });

  const [comments,setComments] = useState([]);
  useEffect(() => {
    axios
      .get(`${url}/api/products/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      })
      .then((res) => {
        const data = res.data;


        if (data.status === "success") {
          const product = data.product;

          setProductData({
            name: product.name,
            brand: product.brand,
            price: product.price,
            qte: product.qte,
            description: product.description,
            category_id: product.category_id,
            vendor_id: product.vendor_id,
            image: product.image,
            views: product.views,
            orders: product.orders,
            date: product.date
          });
        } else {
          toast.error("Something wrong happend");
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/api/categories/${productData.category_id}`)
      .then((res) => {
        const data = res.data;
        const category = data.category;
        if (data && productData.category_id) {
          if (data.status === "success") {
            setCategory(category[0].name);
          }
        }
      });
  }, [productData.category_id]);

  useEffect(()=>{

    axios.get(`${url}/api/products/${productId}/comments`)
    .then((res)=>{
      const data = res.data;

      if(data.status === "success"){
        setComments(data.comments);
      } else{

        toast.error('Something went Wrong');
      }
    })

  },[])


  function showStars(num){

    const all = [1,2,3,4,5];

    return (
      <>
      {
        all.map(star=><FaStar key={star} className={`${star <= num ? 'text-yellow-500' : 'text-gray-500'}`} />)
      }
        
      </>
    )

  }

  return (
    <>
    <ToastContainer theme="colored" position="top-left" />
    <div className="sm:flex">
      <div className="hidden md:block">
        <DashboardSidebar active={2} />
      </div>

      <div className="flex-1">
      <DashboardHeader active={2} />
        <div className="header p-8 bg-white rounded shadow">
          <div className="sm:flex-row gap-5 flex-col flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Product Deatils - {productData.name}
              <span className="block text-gray-500 text-[12px] font-semibold">{moment(productData.date).fromNow()}</span>
            </h1>
          </div>
        </div>
        <hr />
        <div className=" bg-white p-4 mt-4 rounded-lg shadow-lg">
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{productData.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Category</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{category}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Brand</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{productData.brand}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Price</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{productData.price} DZD</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Quantity in Stock</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{productData.qte}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Views</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{productData.views}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Orders</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{productData.orders}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {productData.description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="image text-sm font-medium leading-6 text-gray-900">Image</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <img src={productData.image} alt="" className="sm:w-96 sm:h-96 w-auto object-cover" />
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900 pb-[15px] sm:pb-0">Comments</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {
                comments.length !== 0 ?
                comments.map((comment,index)=>(

                  <div key={index} className={`${index !== 0 ? 'pt-[20px]' : ''} ${index !== comments.length - 1 ? 'pb-[20px] border-b' : ''}`}>

                    <div className="flex items-start gap-[5px]">
                      <img src={comment.image} className="w-[30px]" />

                      <div className="">
                        <h3 className="font-semibold">{comment.first_name} {comment.last_name}</h3>

                        <div className="">
                          {
                            comment.rating ?

                            <div className="stars flex">
                              {
                                showStars(comment.rating)
                              }
                            </div>

                            : <p className="italic text-gray-500 text-[13px]">No Rating</p>
                          }
                        </div>
                      </div>
                    </div>
                    <p className="mt-[6px]">"{comment.value}"</p>
                  </div>
                ))

                :<p className="italic">No comments</p>
              }
            </dd>
          </div>


        </dl>
      </div>
    </div>
      </div>
    </div>
    </>
  );
};

export default VendorProductDeatils;
