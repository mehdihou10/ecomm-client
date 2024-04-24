import {useState,useEffect} from 'react';
import DashboardSidebar from "../../components/Dashboard.Sidebar";
import DashboardHeader from "../../components/Dashboard.Header";
import axios from 'axios';
import { url } from '../../api/api.url';
import {useCookies} from 'react-cookie';
import {toast,ToastContainer} from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { BiStore } from "react-icons/bi";
import { LiaTableSolid } from "react-icons/lia";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaCheckCircle,FaPlus } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io"
import { MdClose,MdDelete  } from "react-icons/md";
import { IoCube,IoSaveSharp  } from "react-icons/io5";
import { RiCoupon2Fill } from "react-icons/ri";
import Chart from "react-apexcharts";



const Box = ({icon,text,data})=>(

  <div className="box bg-white px-[20px] py-[15px] rounded-[10px] flex items-center justify-between shadow-lg">

    <div className="text-data">
      <h3 className='text-gray-500 text-[13px] font-semibold italic'>{text}</h3>
      <h1 className='text-[30px] font-bold'>{data}</h1>
    </div>

    <div className="text-white text-[20px] w-[40px] h-[40px] grid place-items-center rounded-[10px] dashboard-icon">{icon}</div>

  </div>
)


const VendorDashboard = () => {

  const [cookies,setCookie,removeCookie] = useCookies(['user']);

  const [vendorData,setVendorData] = useState({});
  const [stats,setStats] = useState({});
  const [showCoupons,setShowCoupons] = useState(false);
  const [showAddCoupon,setShowAddCoupon] = useState(false);
  const [couponText,setCouponText] = useState("");
  const [coupons,setCoupons] = useState([]);


  useEffect(()=>{

    axios.post(`${url}/api/decode`,null,{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    })
    .then((res)=>{

      const data = res.data;

      if(data.status === "success"){
        setVendorData(data.user);
      } else{
        toast.error('Something went Wrong')
      }
    })

  },[])

  useEffect(()=>{

    axios.get(`${url}/api/products/stats/show`,{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    }).then((res)=>{

      const data = res.data;

      if(data.status === "success"){

        setStats(data.data)

      } else{

        toast.error('Something went Wrong')
      }
    })

  },[])

  useEffect(()=>{

    fetchCoupons();

  },[])

  const fetchCoupons = ()=>{
    axios.get(`${url}/api/products/coupons/show`,{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    }).then((res)=>{

      const data = res.data;

      if(data.status === "success"){
        setCoupons(data.coupons);

      } else{
      
        toast.error('Something went Wrong')
      }
    })
  }


  const cities = [];
  const citiesOrders = [];

  if(Object.keys(stats).length !== 0){

    for(let cityData of stats.wilayasData){
      cities.push(cityData.city)
      citiesOrders.push(cityData.city_orders);
    }
  }


  //charts
  const ordersChart = {
          
    series: [stats.ordersPercentage || 0],
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: '16px',
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 76,
              fontSize: '22px',
              color: undefined,
              formatter: function (val) {
                return val + "%";
              }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
        },
      },
      stroke: {
        dashArray: 4
      },
      labels: ['From All Orders'],
    },
   
  
  
  };

  const citiesCharts = {
          
    series: [{
      data: citiesOrders
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      annotations: {
        xaxis: [{
          x: 500,
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              color: '#fff',
              background: '#00E396',
            },
            text: 'X annotation',
          }
        }],
        yaxis: [{
          y: 'July',
          y2: 'September',
          label: {
            text: 'Y annotation'
          }
        }]
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: cities,
      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      yaxis: {
        reversed: false,
        axisTicks: {
          show: true
        }
      }
    },
  
  
  };



  //coupons
  const addCoupon = ()=>{

    axios.post(`${url}/api/products/coupons/add`,{coupon: couponText},{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    }).then((res)=>{

      const status = res.data.status;

      if(status === "success"){
        fetchCoupons();
        setShowAddCoupon(false);

      } else if(status === "fail"){

        const errors = res.data.message;

        for(let error of errors){
          toast.error(error.msg);
        }
      } else{

        toast.error("Something went Wrong");
      }
    })

  }

  const deleteCoupon = (id)=>{

    axios.delete(`${url}/api/products/coupons/delete/${id}`,{
      headers: {
        Authorization: `Bearer ${cookies.user}`
      }
    }).then((res)=>{

      const status = res.data.status;

      if(status === "success"){
        fetchCoupons();
      } else{
        toast.error('Something went Wrong');
      }
    })
  }

  return (

<>
<ToastContainer theme='colored' position='top-left' />

{showCoupons && 
<>
<span className="overlay-screen"></span>


<div className={`fixed top-[50px] left-1/2 -translate-x-1/2 w-[500px] max-w-[95%] bg-[#eee] h-[400px] ${showAddCoupon ? 'z-[99]' : 'z-[101]'}`}>

<div className="head bg-white flex items-center justify-between px-[20px] py-[10px] border-b">

<h3 className='flex items-center gap-[3px] text-[14px]'><RiCoupon2Fill className='text-blue-500' /> <span className="font-semibold">coupons</span></h3>
<MdClose onClick={()=>setShowCoupons(false)} className='text-[25px] cursor-pointer' />

</div>

<div className="bg-white mt-[20px] mx-[10px]">
<div className="flex justify-between items-center px-[20px] py-[10px] border-b">
  <h3 className='text-[14px] font-semibold'>columns</h3>
  <FaPlus onClick={()=>setShowAddCoupon(true)} className='cursor-pointer' />
</div>

<div className="coupons">
  {
    coupons.length === 0
    ? <p className='text-center text-[14px] text-gray-500 italic mt-[5px]'>Nothing to show</p>

    : <>
    {
      coupons.map(couponData=>(

        <div key={couponData.id} className="coupon flex items-center gap-[10px] p-3 border-b">
          <MdDelete onClick={()=>deleteCoupon(couponData.id)} className='text-[20px] cursor-pointer'/>
          <p className='border px-[15px] py-[5px] rounded-[10px] flex-1'>{couponData.coupon}</p>
        </div>

      ))
    }
      </>
  }
</div>
</div>

</div>

<div className={`fixed p-3 top-[50px] left-1/2 -translate-x-1/2 w-[300px] max-w-[95%] bg-[#eee] h-[150px] ${showAddCoupon ? 'z-[101]' : 'z-[99]'}`}>
  <MdClose onClick={()=>setShowAddCoupon(false)} className='text-[25px] ml-auto cursor-pointer' />
  <input type="text" onChange={(e)=>setCouponText(e.target.value)} className='block mt-[10px] w-full rounded-[6px] border-2 px-[15px] py-[5px]' />
  <button onClick={addCoupon} className='grid place-items-center w-[100px] h-[40px] text-white bg-main mt-[10px] mx-auto'>Save</button>
</div>
</>
}

<div className="flex gap-[40px]">
      <div className="hidden md:block"><DashboardSidebar active={1} /></div>

      <div className="flex-1">
        <DashboardHeader active={1} />

        <div className='h-full'>

        <div className="header p-8 bg-white rounded shadow">
          <div className="sm:flex-row gap-5 flex-col flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </div>

        { Object.keys(stats).length !== 0 &&
          <div className="mt-[30px] px-[15px]">

            <div className="flex flex-wrap items-center justify-between gap-[20px]">  
             <h1 className='text-[#233657] text-[22px] capitalize font-semibold'>Welcome,{vendorData.first_name}_{vendorData.last_name} </h1>
             <button onClick={()=>setShowCoupons(true)} className='grid place-items-center text-white w-fit px-[15px] py-[10px] bg-main'>Coupons</button>
            </div>

        <div className="data grid sm:grid-cols-2 xl:grid-cols-4 gap-[30px] mt-[20px]">
          
          <Box icon={<FaEye />} text="Total Views" data={stats.productsData.views}/>
          <Box icon={<BiStore />} text="Total Products" data={stats.productsData.products}/>
          <Box icon={<FaPeopleGroup />} text="Total Clients" data={stats.clientsData}/>
          <Box icon={<LiaTableSolid />} text="Total Orders" data={stats.productsData.orders}/>

        </div>

        <div className="mt-[40px] grid xl:grid-cols-2 gap-[30px]">

          <div className="orders-chart bg-white p-3 rounded-[10px] w-full max-w-full">
            <h3 className='text-center font-semibold italic text-[#233657]'>Orders Confirmed Percentage:</h3>

          <Chart
              options={ordersChart.options}
              series={ordersChart.series}
              type="radialBar"
              height={350}
              width={"100%"}
            />

            <div className='flex justify-center gap-[20px]'>

            <div className="flex items-center gap-[5px] text-[16px]"><FaCheckCircle className='text-green-500' /> <span className='font-semibold text-[18px]'>{stats.accepted_orders} <span className='text-[12px] italic text-gray-500'>orders</span></span></div>
            <div className="flex items-center gap-[5px] text-[18px]"><IoMdCloseCircle className='text-red-500' /> <span className='font-semibold text-[18px]'>{stats.rejected_orders} <span className='text-[12px] italic text-gray-500'>orders</span></span></div>
            
            </div>

          </div>

          <div className="cities-data bg-white p-3 rounded-[10px] w-full max-w-full">

          <h3 className='text-center font-semibold italic text-[#233657]'>Your Top Ranked Cities:</h3>

          <Chart
              options={citiesCharts.options}
              series={citiesCharts.series}
              type='bar'
              height={350}
              width={"100%"}
            />

            <div className="text-center text-[14px] italic text-gray-600 flex items-center justify-center gap-[5px]"><IoCube />Total Cities: <span className='text-black not-italic font-semibold text-[18px]'>{stats.wilayasCount}</span></div>
          </div>

        </div>

        </div>}

        </div>
      </div>

      
</div>

</>
  );
};

export default VendorDashboard;
