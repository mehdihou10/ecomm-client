import {useState,useEffect} from 'react'
import { HiBars3 } from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import DashboardSidebar from './Dashboard.Sidebar';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import axios from 'axios';
import {url} from '../api/api.url';
import Logo from './Logo';



const DashboardHeader = ({active}) => {

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const navigate = useNavigate();

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

    }
  },[isSign])


    const [toggle,setToggle] = useState(false);

  return (
    <>
    {toggle && <span onClick={()=>setToggle(false)} className="fixed w-full h-full top-0 left-0 bg-[#000000b0] z-[11]"></span>}

    <div className={`bg-white p-[20px] w-[300px] max-w-full fixed ${toggle ? 'left-0' : '-left-[300px]'} top-0 h-full z-[12] duration-500`}>

        <MdClose
          className="text-[30px] text-icon cursor-pointer ml-auto"
          onClick={() => setToggle(false)}
        />
        <DashboardSidebar active={active} header={true} />
    </div>

    <div className='flex justify-between items-center p-[20px] md:hidden'>
      <div><Logo /></div>

      <div>
      <img src={data.image} className='w-[30px] h-[30px] mx-auto rounded-full' />
      <h3 className='text-[14px] font-semibold text-center'>{data.first_name}</h3>
      </div>

      <HiBars3 onClick={()=>setToggle(true)} className='text-[30px] text-icon cursor-pointer' />

    </div>

    </>
  )
}

export default DashboardHeader;
