import React, { useEffect } from "react";
import AdminSidebar from "../../components/Admin.Sidebar";
import AdminHeader from "../../components/Admin.Header";
import { useState } from "react";
import { url } from "../../api/api.url";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { BiStore } from "react-icons/bi";
import { LiaTableSolid } from "react-icons/lia";
import { FaPeopleGroup } from "react-icons/fa6";
import Chart from "react-apexcharts";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [stats, setStats] = useState({});

  let clients = 0;
  let vendors = 0;
  let ordersPercentage = 0;

  if (Object.keys(stats).length !== 0) {
    clients = stats.clients.clients;
    vendors = stats.vendors.vendors;
    ordersPercentage = stats.ordersPercentage;
  }

  const ordersChart = {
    series: [ordersPercentage || 0],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120,
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              color: undefined,
              formatter: function (val) {
                return val + "%";
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: {
        dashArray: 4,
      },
      labels: ["From All Orders"],
    },
  };
  const bars = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["clients", "vendors"],
      },
    },
    series: [
      {
        name: "series-1",
        data: [clients, vendors],
      },
    ],
  };

  useEffect(() => {
    axios.get(`${url}/api/admin/stats`).then((res) => {
      const data = res.data;

      if (data.status === "success") {
        console.log(data);
        setStats(data.data);
        console.log(stats);
      } else {
        console.log(data);
        toast.error("Something went Wrong");
      }
    });
  }, []);

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
            <h1 className="text-[#233657] text-[22px] capitalize  my-4 font-semibold">
              Welcome,{adminData.first_name}_{adminData.last_name}{" "}
            </h1>

            {Object.keys(stats).length !== 0 && (
              <div className="data grid sm:grid-cols-2 xl:grid-cols-4 gap-[30px] mt-[20px]">
                <Box
                  icon={<FaPeopleGroup />}
                  text="Total Vendors"
                  data={stats.vendors.vendors || 0}
                />
                <Box
                  icon={<BiStore />}
                  text="Total Products"
                  data={stats.products.products || 0}
                />
                <Box
                  icon={<FaPeopleGroup />}
                  text="Total Clients"
                  data={stats.clients.clients || 0}
                />
                <Box
                  icon={<LiaTableSolid />}
                  text="Total Accepted Orders"
                  data={stats.acceptedOrders.acceptedorders || 0}
                />
              </div>
            )}
          </div>

          <div className="mt-[40px] overflow-y-auto grid xl:grid-cols-2 gap-[30px]">
            <div className=" bg-white p-3 rounded-[10px] w-full max-w-full">
              <Chart
                options={bars.options}
                series={bars.series}
                type="bar"
                width="500"
              />
            </div>

            <div className=" bg-white p-3 rounded-[10px] w-full max-w-full">
            <h3 className='text-center font-semibold italic text-[#233657]'>Orders Confirmed Percentage:</h3>
              <Chart
                options={ordersChart.options}
                series={ordersChart.series}
                type="radialBar"
                height={350}
                width={"100%"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
