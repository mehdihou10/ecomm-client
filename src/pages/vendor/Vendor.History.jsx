import {useState,useEffect} from 'react'
import DashboardSidebar from '../../components/Dashboard.Sidebar';
import DashboardHeader from '../../components/Dashboard.Header';
import axios from 'axios';
import { url } from '../../api/api.url';
import { useCookies } from 'react-cookie';
import {toast,ToastContainer} from 'react-toastify';
import moment from 'moment';


const VendorHistory = () => {

  const [cookies,setCookie,removeCookie] = useCookies(['user']);

  const [history,setHistory] = useState([]);

  useEffect(()=>{

    axios.get(`${url}/api/products/history/show`,{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    }).then((res)=>{

      const data = res.data;

      if(data.status === "success"){
        setHistory(data.data)
      } else{
        toast.error('Something wrong happened')
      }

      
    })
  },[])
  
  return (
    <div className='sm:flex'>
      <ToastContainer theme='colored' position='top-left' />

        <div className="hidden md:block"><DashboardSidebar active={4} /></div>
        
        <div className="flex-1 overflow-x-auto">
          <DashboardHeader active={4} />

          <div className="header p-8 bg-white rounded shadow">
          <div className="sm:flex-row gap-5 flex-col flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Confirmed Orders
            </h1>
          </div>
        </div>

        <hr />
        {history.length === 0 ? (
          <h1 className="p-4">
            No History Yet...
          </h1>
        ) : (
          <div className="">
            <div className="bg-white rounded-lg  overflow-y-auto shadow mt-4">
              <table className="sm:w-full table-auto ">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                      Product
                    </th>
                    <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                      Name
                    </th>
                    <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                      Username
                    </th>
                    <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                      Qte
                    </th>
                    <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                      Total
                    </th>
                    <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                      City
                    </th>
                    <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                      Since
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {history.map((his,ind) => (
                    <tr
                      className="border-b-2 h-16 border-gray-200"
                      key={ind}
                    >
                      <td className="p-3 text-sm text-gray-700">
                        {" "}
                        <img
                          src={his.image}
                          className="w-10 h-10 sm:w-16 object-contain"
                        />{" "}
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        {his.name}
                      </td>
                      <td className=" p-3 text-sm text-gray-700">
                        {his.first_name} {his.last_name}
                      </td>
                      <td className=" p-3 text-sm text-gray-700">
                        {his.qte}
                      </td>
                      <td className=" p-3 text-sm text-gray-700">
                        {his.total} DZD
                      </td>
                      <td className=" p-3 text-sm text-gray-700">
                        {his.city}
                      </td>
                      <td className=" p-3 text-sm text-gray-700">
                        {moment(his.date).fromNow()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


        </div>
      
    </div>
  )
}

export default VendorHistory;
