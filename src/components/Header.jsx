import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { FaBars,FaChevronDown,FaChevronUp,FaRegHeart } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { LuShoppingCart,LuLogOut } from "react-icons/lu";
import { AiFillHome } from "react-icons/ai";
import {useSelector,useDispatch} from 'react-redux';
import {isSigned} from '../store/slices/sign.slice';
import axios from 'axios';
import {url} from '../api/api.url';
import {useCookies} from 'react-cookie';
import Swal from 'sweetalert2';



const Search = ()=>{

    return(

        <div className="search border flex w-[500px] max-w-full mx-auto rounded-full overflow-hidden">
            <input type="text" className='block px-[20px] py-2 border-0 outline-none flex-1' placeholder='Search For' />

            <div className="icon w-[50px] grid place-items-center font-semibold cursor-pointer text-[20px] bg-main text-white h-[40px]">
                <IoSearchSharp className='pointer-events-none' />
            </div>
        </div>

    )
}

const Shop = ()=>(

    <Link to='/cart' className='text-[25px]'>
        <LuShoppingCart />
    </Link>

)

const Wishlist = ()=>(
    <Link to='/wishlist' className='text-[25px]'>
        <FaRegHeart />
    </Link>
)

const Sign = ()=>(

    <div className="btns flex">
            <Link to='/auth/login' className='btn text-[18px]'>Login</Link>
            <Link to='/auth/type' className='btn bg-main text-white'>Signup</Link>
    </div>

)

const Profile = ()=>{

    const dispatch = useDispatch();

    const [cookie,setCookie,removeCookie] = useCookies(['user']);
    const [userData,setUserData] = useState({});
    const [showOptions,setShowOptions] = useState(false);

    document.addEventListener('click',(e)=>{

        if(e.target.dataset.info !== "profile"){

            setShowOptions(false);
        }
    })

    useEffect(()=>{

        axios.post(`${url}/api/decode`,null,{
            headers: {
                Authorization: `Bearer ${cookie.user}`
            }
        })
        .then((res)=>{

            const data = res.data;

            if(data.status === "success"){
                setUserData(data.user)
            }

        })

    },[])

    const logout = ()=>{

        Swal.fire({
            icon: "warning",
            title: "Are You Sure?",
            showCancelButton: true
        }).then((res)=>{

            if(res.isConfirmed){

                removeCookie('user');
                dispatch(isSigned())
            }
        })
        
    }


    return (

        <div className="text-black relative">
            <div data-info="profile" onClick={()=>setShowOptions((prev)=>!prev)} className="profile flex items-center gap-[5px] cursor-pointer text-[14px]">

            <img data-info="profile" src={userData.image} className='w-[30px]' />
            <h3 data-info="profile" className='font-semibold'>{userData.first_name}</h3>
            {
                showOptions ? <div data-info="profile" className="cursor-pointer"><FaChevronUp className='pointer-events-none' /></div>

                : <div data-info="profile" className="cursor-pointer"><FaChevronDown className='pointer-events-none' /></div>
            }

            </div>

            {showOptions && <div className="absolute -left-[50px] bg-[#f3f3f3] rounded-[6px] w-[150px] shadow-lg">
                <Link to={`/user_dashboard/${userData.id}`} className='flex items-center gap-[5px] py-[12px] px-[15px] border-b'>
                    <AiFillHome /> Dashboard
                </Link>

                <button onClick={logout} className='flex items-center gap-[5px] py-[12px] px-[15px] cursor-pointer'>
                    <LuLogOut /> Logout
                </button>
            </div>}


        </div>
    )
}


const Header = () => {

    const isSigned = useSelector(state=>state.isSigned);

  return (

    <header className="bg-white">

    <div className='px-[20px] py-[25px] border-b flex justify-between items-center'>

        <div className="toggle text-[25px] cursor-pointer md:hidden">
            <FaBars />
        </div>

        <Link to='/'>Logo</Link>

        <div className="search-bar hidden lg:block">
            <Search />
        </div>

        <div className="hidden md:flex gap-[30px]">

        <div className='flex items-center gap-[50px]'>

        {isSigned && <Profile /> }  
        <Wishlist />
        <Shop />

        {!isSigned && <Sign />}
        

        </div>

        </div>

        <div className="flex items-center gap-[20px] md:hidden">
            {
                isSigned ?
                <Profile />
                :
                <>
                <Shop />
                <Wishlist />
                </>
            }
        </div>
      
    </div>

    {/* search bar -small devices- */}
    <div className="search-sm p-4 block lg:hidden">
        <Search />
    </div>

    </header>
  )
}

export default Header
