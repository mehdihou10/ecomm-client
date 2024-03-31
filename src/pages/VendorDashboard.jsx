import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { BiStore } from "react-icons/bi";
import { LiaTableSolid } from "react-icons/lia";
import { TbCalendarStats } from "react-icons/tb";
import { IoStatsChart } from "react-icons/io5";

const VendorDashboard = () => {
  const [clickedDiv, setClickedDiv] = useState(null);

  const handleClick = (index) => {
    setClickedDiv(index);
  };

  return (
    <div>
      <div className="bg-zinc-200 py-28 w-60 h-screen">
        <div className="flex flex-col gap-5 px-2">
          <div
            onClick={() => handleClick(1)}
            className={`hover:bg-main hover:cursor-pointer hover:text-slate-200 rounded-md px-4 py-2 ${
              clickedDiv === 1 && "bg-main text-slate-200"
            }`}
          >
            <CgProfile className="text-3xl inline"></CgProfile>
            <span className="ml-2 text-lg ">Profile</span>
          </div>
          <div
            onClick={() => handleClick(2)}
            className={`hover:bg-main hover:cursor-pointer hover:text-slate-200 rounded-md px-4 py-2 ${
              clickedDiv === 2 && "bg-main text-slate-200"
            }`}
          >
            <BiStore className="text-3xl inline "></BiStore>
            <span className="ml-2 text-lg ">Products</span>
          </div>
          <div
            onClick={() => handleClick(3)}
            className={`hover:bg-main hover:cursor-pointer hover:text-slate-200 rounded-md px-4 py-2 ${
              clickedDiv === 3 && "bg-main text-slate-200"
            }`}
          >
            <LiaTableSolid className="text-3xl inline "></LiaTableSolid>
            <span className="ml-2 text-lg ">Orders</span>
          </div>
          <div
            onClick={() => handleClick(4)}
            className={`hover:bg-main hover:cursor-pointer hover:text-slate-200 rounded-md px-4 py-2 ${
              clickedDiv === 4 && "bg-main text-slate-200"
            }`}
          >
            <TbCalendarStats className="text-3xl inline "></TbCalendarStats>
            <span className="ml-2 text-lg ">History</span>
          </div>
          <div
            onClick={() => handleClick(5)}
            className={`hover:bg-main hover:cursor-pointer hover:text-slate-200 rounded-md px-4 py-2 ${
              clickedDiv === 5 && "bg-main text-slate-200"
            }`}
          >
            <IoStatsChart className="text-3xl inline "></IoStatsChart>
            <span className="ml-2 text-lg ">Stats</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
