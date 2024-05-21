import { useEffect,useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import {useSelector,useDispatch} from 'react-redux';
import {isSigned} from '../store/slices/sign.slice';
import Swal from 'sweetalert2'
import axios from 'axios';
import {url} from '../api/api.url';
import {useCookies} from 'react-cookie';
import Logo from './Logo';
import { FaEnvelope } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { FaUserCheck } from "react-icons/fa";



const AdminSidebar = ({active,header}) => {

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
        <li><Link to={`/admin_dashboard/${data.first_name}_${data.last_name}`} className={`sidebar-item ${active === 1 ? 'active' :''} hover:active`}><div className="icon"><AiFillHome /></div>Dashboard</Link></li>
        <li><Link to={`/admin_dashboard/${data.first_name}_${data.last_name}/profile`} className={`sidebar-item ${active === 2 ? 'active' :''} hover:active`}><div className="icon"><CgProfile /></div>Profile</Link></li>
        <li><Link to={`/admin_dashboard/${data.first_name}_${data.last_name}/pendingvendors`} className={`sidebar-item ${active === 3 ? 'active' :''} hover:active`}><div className="icon"><FaUserClock /></div>Pending Vendors</Link></li>
        <li><Link to={`/admin_dashboard/${data.first_name}_${data.last_name}/acceptedvednors`} className={`sidebar-item ${active === 4 ? 'active' :''} hover:active`}><div className="icon"><FaUserCheck /></div>Accepted Vendors</Link></li>
        <li><Link to={`/admin_dashboard/${data.first_name}_${data.last_name}/clients`} className={`sidebar-item ${active === 5 ? 'active' :''} hover:active`}><div className="icon"><BsCartCheckFill /></div>Clients</Link></li>
        <li><Link to={`/admin_dashboard/${data.first_name}_${data.last_name}/clientmessages`} className={`sidebar-item ${active === 6 ? 'active' :''} hover:active`}><div className="icon"><FaEnvelope /></div>Clients Messages</Link></li>
        <li><Link to={`/admin_dashboard/${data.first_name}_${data.last_name}/vendormessages`} className={`sidebar-item ${active === 7 ? 'active' :''} hover:active`}><div className="icon"><FaEnvelope /></div>Vendors Messages</Link></li>


      </ul>

      <button onClick={logout} className='flex items-center gap-[10px] px-[15px] py-[10px]
       text-[#344767] mt-[35px] font-semibold border-t border-red-[#ccc]'><LuLogOut />Logout</button>
    </div>

    
  )
}

export default AdminSidebar;
