import { useEffect,useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiStore } from "react-icons/bi";
import { LiaTableSolid } from "react-icons/lia";
import { TbCalendarStats } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";
import { FaGear } from "react-icons/fa6";
import {useSelector,useDispatch} from 'react-redux';
import {isSigned} from '../store/slices/sign.slice';
import Swal from 'sweetalert2'
import axios from 'axios';
import {url} from '../api/api.url';
import {useCookies} from 'react-cookie';
import Logo from './Logo';



const DashboardSidebar = ({active,header}) => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  
  const isSign = useSelector(state=>state.isSigned);

  const [data,setData] = useState({});

  useEffect(()=>{

    if(isSign){

      axios.post(`${url}/api/decode`,null,{
        headers: {
          Authorization: `Bearer ${cookies.user}`
        }
      }).then((res)=>{

        const userData = res.data;

        if(userData.status === "success"){

          setData(userData.user)
        }
      })

    } else{

      navigate('/')
    }


  },[isSign])



  const logout = () => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        removeCookie('user',{path: "/"});

        dispatch(isSigned());

        navigate('/')
      }
    })
  };


  return (
    
    
    <div className={`w-[250px] max-w-full ${!header ? 'p-[20px]' : ''} h-[100vh] max-h-full sticky top-0 overflow-y-auto`}>
      <div className='hidden md:block'><Logo /></div>

      <ul className='flex flex-col  gap-[20px] mt-[40px]'>
        <li><Link to={`/vendor_dashboard/${data.first_name}_${data.last_name}`} className={`sidebar-item ${active === 1 ? 'active' :''} hover:active`}><div className="icon"><AiFillHome /></div>Dashboard</Link></li>
        <li><Link to={`/vendor_dashboard/${data.first_name}_${data.last_name}/products`} className={`sidebar-item ${active === 2 ? 'active' :''} hover:active`}><div className="icon"><BiStore /></div>Products</Link></li>
        <li><Link to={`/vendor_dashboard/${data.first_name}_${data.last_name}/orders`} className={`sidebar-item ${active === 3 ? 'active' :''} hover:active`}><div className="icon"><LiaTableSolid /></div>Orders</Link></li>
        <li><Link to={`/vendor_dashboard/${data.first_name}_${data.last_name}/history`} className={`sidebar-item ${active === 4 ? 'active' :''} hover:active`}><div className="icon"><TbCalendarStats /></div>History</Link></li>
        <li><Link to={`/vendor_dashboard/${data.first_name}_${data.last_name}/profile`} className={`sidebar-item ${active === 5 ? 'active' :''} hover:active`}><div className="icon"><CgProfile /></div>Profile</Link></li>
        <li><Link to={`/vendor_dashboard/${data.first_name}_${data.last_name}/contact`} className={`sidebar-item ${active === 6 ? 'active' :''} hover:active`}><div className="icon"><FaGear /></div>Contact</Link></li>


      </ul>

      <button onClick={logout} className='flex items-center gap-[10px] px-[15px] py-[10px]
       text-[#344767] mt-[35px] font-semibold border-t border-red-[#ccc]'><LuLogOut />Logout</button>
    </div>

    
  )
}

export default DashboardSidebar;
