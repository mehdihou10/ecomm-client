import {useState,useEffect} from 'react'
import Header from '../../components/Header';
import {useNavigate,Link} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { url } from '../../api/api.url';
import { FaRegHeart } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { LuShoppingCart } from "react-icons/lu";
import { LiaTableSolid } from "react-icons/lia";
import Footer from '../../components/Footer';



const UserTitle = ({firstName,lastName})=>(
  <h1 className='text-[#233657] text-[22px] capitalize font-semibold'>Welcome,{firstName}_{lastName}</h1>
)

const Card = ({icon,text,link,textLink})=>(

  <div className="card bg-white px-[15px] py-[20px] rounded-[4px] text-center">

    <div className="w-fit mx-auto text-[60px] text-main">{icon}</div>
    <h3 className='text-[20px] opacity-60 text-main font-semibold'>{text}</h3>
    <Link to={link} className='grid place-items-center text-white w-[120px] h-[40px] mx-auto mt-[15px] bg-main'>{textLink}</Link>

  </div>
)

const UserDashboard = () => {

  const navigate = useNavigate();

  const [cookies,setCookies,removeCookies] = useCookies(['user']);

  const [userData,setUserData] = useState({});

  useEffect(()=>{

    axios.post(`${url}/api/decode`,null,{
      headers:{
        Authorization: `Bearer ${cookies.user}`
      }
    }).then((res)=>{

      const data = res.data;

      if(data.status === "success"){
        setUserData(data.user)
      }

    })


  },[])


  return (
    <div>
      <Header />

      {Object.keys(userData).length !== 0 && 

      <div className="p-[20px] flex flex-col lg:flex-row items-start gap-[50px]">

          <div className="lg:hidden"><UserTitle firstName={userData.first_name} lastName={userData.last_name} /></div>


        <div className="w-full lg:sticky lg:top-[100px] l user-info bg-white lg:basis-[30%] text-center px-[15px] py-[20px]">
          <img src={userData.image} className='w-[100px] mx-auto' />
          <h3 className='font-semibold'>{userData.first_name}_{userData.last_name}</h3>
          <span className="block text-[14px] text-gray-500 italic">Buyer</span>

          <div className="links flex flex-wrap justify-center items-center gap-[20px] mt-[15px]">
            <Link to={`/user_dashboard/${userData.first_name}_${userData.last_name}/profile`} className='flex justify-center items-center gap-[10px] text-white w-[120px] h-[40px] bg-main'><CgProfile /> Profile</Link>
            <Link to={`/user_dashboard/${userData.first_name}_${userData.last_name}/contact`} className='flex justify-center items-center gap-[10px] text-white w-[120px] h-[40px] bg-main'><FaGear /> Contact</Link>
          </div>
        </div>

        <div className="w-full content lg:basis-[60%]">

          <div className="hidden lg:block"><UserTitle firstName={userData.first_name} lastName={userData.last_name} /></div>
         
         <div className="mt-[30px] flex flex-col gap-[20px]">

          <Card icon={<LuShoppingCart />} text="Shopping Cart" link="/cart" textLink="view cart" />
          <Card icon={<FaRegHeart />} text="Wishlist" link="/wishlist" textLink="view wishlist" />
          <Card icon={<LiaTableSolid />} text="Orders" link={`/user_dashboard/${userData.first_name}_${userData.last_name}/orders`} textLink="view orders" />


         </div>
        </div>

      </div>
      }

      <Footer />

    </div>
  )
}

export default UserDashboard
