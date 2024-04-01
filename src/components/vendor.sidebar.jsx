import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { BiStore } from "react-icons/bi";
import { LiaTableSolid } from "react-icons/lia";
import { TbCalendarStats } from "react-icons/tb";
import { TfiStatsUp } from "react-icons/tfi";
import { GrLogout } from "react-icons/gr";

const SideBar = () => {
  const [clickedDiv, setClickedDiv] = useState(null);

  const handleClick = (index) => {
    setClickedDiv(index);
  };
  return (
    <div>
      <div className="bg-secondary py-28 w-60 h-screen relative">
        <div className="flex flex-col gap-5 px-2 ">
          <div
            onClick={() => handleClick(1)}
            className={`hover:bg-gray-700 transition  duration-300 hover:cursor-pointer text-secondary2 rounded-md px-4 py-2 ${
              clickedDiv === 1 && "bg-gray-700 text-slate-200"
            }`}
          >
            <CgProfile className="text-3xl inline"></CgProfile>
            <span className="ml-2 text-lg ">Profile</span>
          </div>
          <div
            onClick={() => handleClick(2)}
            className={`hover:bg-gray-700 hover:cursor-pointer transition duration-300 text-secondary2 rounded-md px-4 py-2 ${
              clickedDiv === 2 && "bg-gray-700 text-slate-200"
            }`}
          >
            <BiStore className="text-3xl inline "></BiStore>
            <span className="ml-2 text-lg ">Products</span>
          </div>
          <div
            onClick={() => handleClick(3)}
            className={`hover:bg-gray-700 hover:cursor-pointer transition duration-300 text-secondary2 rounded-md px-4 py-2 ${
              clickedDiv === 3 && "bg-gray-700 text-slate-200"
            }`}
          >
            <LiaTableSolid className="text-3xl inline "></LiaTableSolid>
            <span className="ml-2 text-lg ">Orders</span>
          </div>
          <div
            onClick={() => handleClick(4)}
            className={`hover:bg-gray-700 hover:cursor-pointer transition duration-300 text-secondary2 rounded-md px-4 py-2 ${
              clickedDiv === 4 && "bg-gray-700 text-slate-200"
            }`}
          >
            <TbCalendarStats className="text-3xl inline "></TbCalendarStats>
            <span className="ml-2 text-lg ">History</span>
          </div>
          <div
            onClick={() => handleClick(5)}
            className={`hover:bg-gray-700 hover:cursor-pointer transition duration-300 text-secondary2 rounded-md px-4 py-2 ${
              clickedDiv === 5 && "bg-gray-700 text-slate-200"
            }`}
          >
            <TfiStatsUp className="text-3xl inline "></TfiStatsUp>
            <span className="ml-2 text-lg">Stats</span>
          </div>
        </div>
        <div
          className={`hover:bg-gray-700 hover:cursor-pointer ml-2  transition duration-300 text-secondary2 w-56 rounded-md px-4 py-2 absolute bottom-4`}
        >
          <GrLogout className="text-3xl inline "></GrLogout>
          <span className="ml-2 text-lg ">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
