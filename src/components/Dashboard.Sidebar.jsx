import React from 'react'
import {Link} from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiStore } from "react-icons/bi";
import { LiaTableSolid } from "react-icons/lia";
import { TbCalendarStats } from "react-icons/tb";
import { TfiStatsUp } from "react-icons/tfi";
import { LuLogOut } from "react-icons/lu";


const DashboardSidebar = () => {
  return (
    <div className='w-[200px] max-w-full p-[20px]'>
      <a href="">Logo</a>

      <ul className='flex flex-col gap-[20px] mt-[40px]'>
        <li><Link to="" className='sidebar-item active hover:active'><div className="icon"><AiFillHome /></div>Dashboard</Link></li>
        <li><Link to="" className='sidebar-item hover:active'><div className="icon"><BiStore /></div>Products</Link></li>
        <li><Link to="" className='sidebar-item hover:active'><div className="icon"><LiaTableSolid /></div>Orders</Link></li>
        <li><Link to="" className='sidebar-item hover:active'><div className="icon"><TbCalendarStats /></div>History</Link></li>
        <li><Link to="" className='sidebar-item hover:active'><div className="icon"><CgProfile /></div>Profile</Link></li>

      </ul>

      <button className='flex items-center gap-[10px] px-[15px] py-[10px]
       text-[#344767] mt-[35px] font-semibold border-t border-red-[#ccc]'><LuLogOut />Logout</button>
    </div>
  )
}

export default DashboardSidebar;
