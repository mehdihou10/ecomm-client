import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiStore } from "react-icons/bi";
import { LiaTableSolid } from "react-icons/lia";
import { TbCalendarStats } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";
import {jwtDecode} from 'jwt-decode';
import {useSelector,useDispatch} from 'react-redux';
import {isSigned} from '../store/slices/sign.slice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const DashboardSidebar = ({active}) => {
  
  let data;
  const isSign = useSelector(state=>state.isSigned);

  if(!isSign){
    window.location.href = "/"

  } else{

    data = jwtDecode(window.localStorage.getItem('user'));
  }

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // useEffect(()=>{

  //   if(!isSign){
  //     window.location.href = "/"
  //   }

  // },[])
  


  const logout = ()=>{

    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      showCancelButton: true
    }).then((res)=>{

      if(res.isConfirmed){

        window.localStorage.removeItem('user');
        dispatch(isSigned());
      }
    })
  }

  return (
    <>
    {isSign &&
      <div className='w-[200px] max-w-full p-[20px] h-[100vh] max-h-full'>
      <a href="">Logo</a>

      <ul className='flex flex-col  gap-[20px] mt-[40px]'>
        <li><Link to={`/vendor_dashboard/${data.first_name}_${data.last_name}`} className={`sidebar-item ${active === 1 ? 'active' :''} hover:active`}><div className="icon"><AiFillHome /></div>Dashboard</Link></li>
        <li><Link to={`/vendor_dashboard/${data.first_name}_${data.last_name}/products`} className={`sidebar-item ${active === 2 ? 'active' :''} hover:active`}><div className="icon"><BiStore /></div>Products</Link></li>
        <li><Link to={`/vendor_dashboard/${data.first_name}_${data.last_name}/orders`} className={`sidebar-item ${active === 3 ? 'active' :''} hover:active`}><div className="icon"><LiaTableSolid /></div>Orders</Link></li>
        <li><Link to={`/vendor_dashboard/${data.first_name}_${data.last_name}/history`} className={`sidebar-item ${active === 4 ? 'active' :''} hover:active`}><div className="icon"><TbCalendarStats /></div>History</Link></li>
        <li><Link to={`/vendor_dashboard/${data.first_name}_${data.last_name}/profile`} className={`sidebar-item ${active === 5 ? 'active' :''} hover:active`}><div className="icon"><CgProfile /></div>Profile</Link></li>

      </ul>

      <button onClick={logout} className='flex items-center gap-[10px] px-[15px] py-[10px]
       text-[#344767] mt-[35px] font-semibold border-t border-red-[#ccc]'><LuLogOut />Logout</button>
    </div>}

    </>
  )
}

export default DashboardSidebar;
