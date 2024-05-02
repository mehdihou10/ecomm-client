import React, { useEffect } from "react";
import AdminSidebar from "../../components/Admin.Sidebar";
import AdminHeader from "../../components/Admin.Header";
import { useState } from "react";
import { url } from "../../api/api.url";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { BiStore } from "react-icons/bi";
import { LiaTableSolid } from "react-icons/lia";
import { FaPeopleGroup } from "react-icons/fa6";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const Box = ({ icon, text, data }) => (
    <div className="box bg-white px-[20px] py-[15px] rounded-[10px] flex items-center justify-between shadow-lg">
      <div className="text-data">
        <h3 className="text-gray-500 text-[13px] font-semibold italic">
          {text}
        </h3>
        <h1 className="text-[30px] font-bold">{data}</h1>
      </div>

      <div className="text-white text-[20px] w-[40px] h-[40px] grid place-items-center rounded-[10px] dashboard-icon">
        {icon}
      </div>
    </div>
  );

  useEffect(() => {
    axios
      .post(`${url}/api/decode`, null, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      })
      .then((res) => {
        const data = res.data;

        if (data.status === "success") {
          setAdminData(data.user);
        } else {
          toast.error("Something went Wrong");
        }
      });
  }, []);

  return (
    <>
      <ToastContainer theme="colored" position="top-left" />
      <div className="sm:flex">
        <div className="hidden md:block">
          <AdminSidebar active={1} />
        </div>

        <div className="flex-1">
          <AdminHeader active={1} />
          <div className="header p-8 bg-white rounded shadow">
            <div className="sm:flex-row gap-5 flex-col flex items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Dashboard
              </h1>
            </div>
          </div>
          <div className="content p-4">
          <h1 className='text-[#233657] text-[22px] capitalize  my-4 font-semibold'>Welcome,{adminData.first_name}_{adminData.last_name} </h1>
          <div className="data grid sm:grid-cols-2 xl:grid-cols-4 gap-[30px] mt-[20px]">
          
          <Box icon={<FaEye />} text="Total Vndors" data={2}/>
          <Box icon={<BiStore />} text="Total Products" data={3}/>
          <Box icon={<FaPeopleGroup />} text="Total Clients" data={4}/>
          <Box icon={<LiaTableSolid />} text="Total Accepted Orders" data={2}/>

        </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
