import {useState,useEffect} from 'react'
import axios from 'axios';
import {url} from '../../api/api.url';
import {useCookies} from 'react-cookie';
import {toast,ToastContainer} from 'react-toastify';
import { BsThreeDotsVertical } from "react-icons/bs";
import Header from '../../components/Header';


const UserOrders = () => {

  const [cookies,setCookie,removeCookie] = useCookies(['user']);

  const [userData,setUserData] = useState({});
  const [pendingOrders,setPendingOrders] = useState([]);
  const [acceptedOrders,setAcceptedOrders] = useState([]);
  const [rejectedOrders,setRejectedOrders] = useState([]);

  const [type,setType] = useState("pending");
  const [showTypes,setShowTypes] = useState(false);

  useEffect(()=>{

    axios.post(`${url}/api/decode`,null,{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    }).then((res)=>{

      const userData = res.data;

      if(userData.status === "success"){

        setUserData(userData.user);
      }
    })

  },[])

  useEffect(()=>{

    if(Object.keys(userData).length !== 0){
      getTypeOrders();
    }

  },[userData,type])

  const getTypeOrders = ()=>{

    axios.get(`${url}/api/users/${userData.id}/${type}`)
    .then((res)=>{

      const data = res.data;

      if(data.status === "success"){

        if(type === "pending"){
          setPendingOrders(data.orders);

        } else if(type === "accepted"){
          setAcceptedOrders(data.orders);

        } else if(type === "rejected"){
          setRejectedOrders(data.orders);
        }

      } else{
        toast.error('Something went Wrong');
      }
    })
  }

  document.addEventListener('click',(e)=>{

    if(!e.target.classList.contains('orders-dots')){
      setShowTypes(false);
    }
  })


  return (
    <div>
      <ToastContainer theme='colored' position='top-left' />
      <Header />
      
      <div className="bg-white mt-[30px] mx-[10px] md:mx-[30px] px-[15px] py-[20px]">
        <div className="head flex items-center justify-between relative">
          <h3 className='font-semibold text-[22px]'>{type === "pending" ? "Pending" : type === "accepted" ? "Accepted" : "Rejected"} Orders</h3>
          <BsThreeDotsVertical onClick={()=>setShowTypes((prev)=>!prev)} className='orders-dots text-[22px] cursor-pointer' />

         {showTypes &&  <ul className="types absolute bg-white box-shadow right-0 top-full rounded-[6px]">
            <li onClick={()=>setType("pending")} className='cursor-pointer duration-300 hover:bg-[#eee] py-2 px-[20px] border-b'>Pending</li>
            <li onClick={()=>setType("accepted")} className='cursor-pointer duration-300 hover:bg-[#eee] py-2 px-[20px] border-b'>Accepted</li>
            <li onClick={()=>setType("rejected")} className='cursor-pointer duration-300 hover:bg-[#eee] py-2 px-[20px]'>Rejected</li>


          </ul>}

        </div>

        <div className="overflow-x-auto">

        <div className="table mt-[20px] w-full">

          {/* <div className="overflow-x-scroll"></div> */}
          {type === "pending" &&
           <table className="table-auto w-full overflow-x-scroll">
           <thead className="bg-gray-50 border-b-2 border-gray-200">
             <tr>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Product
               </th>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Name
               </th>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Vendor
               </th>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Phone Number
               </th>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Qte
               </th>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Total
               </th>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Status
               </th>

        
             </tr>
           </thead>
           <tbody className="">
             {pendingOrders.map((order) => (
               <tr
                 className="border-b-2 h-16 border-gray-200"
                 key={order.id}
               >
                 <td className="p-3 text-sm text-gray-700">
                   {" "}
                   <img
                     src={order.image}
                     className="w-10 h-10 sm:w-16 object-cover"
                   />{" "}
                 </td>
                 <td className="p-3 text-sm text-gray-700">
                   {order.name}
                 </td>
                 <td className=" p-3 text-sm text-gray-700">
                   {order.first_name} {order.last_name}
                 </td>
                 <td className=" p-3 text-sm text-gray-700">
                   {order.phone_number}
                 </td>
                 <td className=" p-3 text-sm text-gray-700">
                   {order.qte}
                 </td>
                 <td className=" p-3 text-sm text-gray-700">
                   {order.total} DZD
                 </td>
                 <td className=" p-3 text-sm text-gray-700">
                   {type}
                 </td>
              
               </tr>
             ))}
           </tbody>
          </table>

          }

          {
            type === "accepted" &&
            <table className="table-auto w-full overflow-x-scroll">
           <thead className="bg-gray-50 border-b-2 border-gray-200">
             <tr>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Product
               </th>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Name
               </th>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Vendor
               </th>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Phone Number
               </th>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Qte
               </th>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Total
               </th>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Status
               </th>

        
             </tr>
           </thead>
           <tbody className="">
             {acceptedOrders.map((order) => (
               <tr
                 className="border-b-2 h-16 border-gray-200"
                 key={order.id}
               >
                 <td className="p-3 text-sm text-gray-700">
                   {" "}
                   <img
                     src={order.image}
                     className="w-10 h-10 sm:w-16 object-cover"
                   />{" "}
                 </td>
                 <td className="p-3 text-sm text-gray-700">
                   {order.name}
                 </td>
                 <td className=" p-3 text-sm text-gray-700">
                   {order.first_name} {order.last_name}
                 </td>
                 <td className=" p-3 text-sm text-gray-700">
                   {order.phone_number}
                 </td>
                 <td className=" p-3 text-sm text-gray-700">
                   {order.qte}
                 </td>
                 <td className=" p-3 text-sm text-gray-700">
                   {order.total} DZD
                 </td>
                 <td className=" p-3 text-sm text-gray-700">
                   {type}
                 </td>
              
               </tr>
             ))}
           </tbody>
          </table>
          }

          {
            type === "rejected" &&
            <table className="table-auto w-full overflow-x-scroll">
           <thead className="bg-gray-50 border-b-2 border-gray-200">
             <tr>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Product
               </th>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Name
               </th>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Vendor
               </th>
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Phone Number
               </th>
               
               <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                 Status
               </th>

        
             </tr>
           </thead>
           <tbody className="">
             {pendingOrders.map((order) => (
               <tr
                 className="border-b-2 h-16 border-gray-200"
                 key={order.id}
               >
                 <td className="p-3 text-sm text-gray-700">
                   {" "}
                   <img
                     src={order.image}
                     className="w-10 h-10 sm:w-16 object-cover"
                   />{" "}
                 </td>
                 <td className="p-3 text-sm text-gray-700">
                   {order.name}
                 </td>
                 <td className=" p-3 text-sm text-gray-700">
                   {order.first_name} {order.last_name}
                 </td>
                 <td className=" p-3 text-sm text-gray-700">
                   {order.phone_number}
                 </td>
                 
                
                 <td className=" p-3 text-sm text-gray-700">
                   {type}
                 </td>
              
               </tr>
             ))}
           </tbody>
          </table>
          }
        </div>

        </div>

      </div>
    </div>
  )
}

export default UserOrders;
