import {useState,useEffect,useRef} from 'react'
import {Link} from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { FaChevronDown,FaChevronUp,FaRegHeart,FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import { LuShoppingCart,LuLogOut } from "react-icons/lu";
import { AiFillHome } from "react-icons/ai";
import {useSelector,useDispatch} from 'react-redux';
import {isSigned} from '../store/slices/sign.slice';
import axios from 'axios';
import {url} from '../api/api.url';
import {useCookies} from 'react-cookie';
import Swal from 'sweetalert2';


//local components
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
                showOptions ? 
                <div data-info="profile" className="cursor-pointer"><FaChevronUp className='pointer-events-none' /></div>

                : <div data-info="profile" className="cursor-pointer"><FaChevronDown className='pointer-events-none' /></div>
            }

            </div>

            {showOptions && <div className="absolute -left-[50px] bg-[#f3f3f3] rounded-[6px] w-[200px] shadow-lg">
                <Link to={`/user_dashboard/${userData.first_name}_${userData.last_name}`} className='flex items-center gap-[5px] py-[12px] px-[15px]'>
                    <AiFillHome /> Dashboard
                </Link>


                <Link to='/cart' className='flex md:hidden items-center gap-[5px] py-[12px] px-[15px]'>
                    <LuShoppingCart /> Shop Cart
                </Link>

                <Link to='/wishlist' className='flex md:hidden items-center gap-[5px] pt-[12px] pb-[20px] px-[15px] border-b'>
                    <FaRegHeart /> Wishlist
                </Link>

                <button onClick={logout} className='flex items-center gap-[5px] py-[12px] px-[15px] cursor-pointer md:border-b'>
                    <LuLogOut /> Logout
                </button>

            </div>}


        </div>
    )
}

const ToggleSidebar = ()=>{

    const dispatch = useDispatch();

    const isSign = useSelector(state=>state.isSigned);

    const [cookie,setCookie,removeCookie] = useCookies(['user']);

    const [toggle,setToggle] = useState(false);
    const [userData,setUserData] = useState({});

    useEffect(()=>{

        if(isSign){

            axios.post(`${url}/api/decode`,null,{
                headers: {
                    Authorization: `Bearer ${cookie.user}`
                }
            }).then((res)=>{

                const data = res.data;

                if(data.status === "success" && data.user){
                    setUserData(data.user);
                }
            })
        }

    },[])

    const sideBarRef = useRef();

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

    return(
    <>
    {toggle && <span onClick={()=>setToggle(false)} className="fixed w-full h-full top-0 left-0 bg-[#000000b0] z-[11]"></span>}  
    
        <HiBars3 className='text-[30px] text-icon cursor-pointer' onClick={()=>setToggle(true)} />


            <div ref={sideBarRef} className={`sidebar px-[15px] py-[10px] fixed h-full ${toggle ? 'left-0': '-left-[300px]'} duration-500 top-0 w-[300px] max-w-full bg-white z-[11] overflow-y-auto`}>
                <MdClose className='text-[30px] text-icon cursor-pointer ml-auto' onClick={()=>setToggle(false)} />

                <div className="account mt-[20px]">
                    <h3 className='text-gray-500 text-semibold text-[14px]'>Account</h3>

                    {
                        isSign ?

                        <>

                     <Link to={`/user_dashboard/${userData.first_name}_${userData.last_name}`} className="flex items-center gap-[20px] mt-[15px]">
                        <AiFillHome className='text-[18px] text-icon' /> 
                        Dashboard
                    </Link>

                    <button onClick={logout} className="cursor-pointer flex items-center gap-[20px] mt-[15px] w-full">
                        <LuLogOut className='text-[23px] text-icon' /> 
                        Logout
                    </button>

                    </>

                    :
                    <>
                    
                    <Link to="/auth/login" className="flex items-center gap-[20px] mt-[15px]">
                        <FaUser className='text-[18px] text-icon' /> 
                        Login
                    </Link>

                    <Link to="/auth/type" className="flex items-center gap-[20px] mt-[15px]">
                        <FaUserPlus className='text-[23px] text-icon' /> 
                        Register
                    </Link>

                    </>
                    
                    

                       }

                </div>
            </div>
        

    </>
    )
}

//main component
const Header = () => {

    const isSign = useSelector(state=>state.isSigned);

  return (

    <header className="bg-white">

    <div className='px-[20px] py-[25px] border-b flex justify-between items-center'>

        <div className="flex items-center gap-[10px]">

        <div className="hidden md:block"><ToggleSidebar /></div>
        <Link to='/'>Logo</Link>

        </div>

        <div className="search-bar hidden lg:block">
            <Search />
        </div>

        <div className="hidden md:flex gap-[30px]">

        <div className='flex items-center gap-[50px]'>

        {isSign && <Profile /> }  
        <Wishlist />
        <Shop />

        {!isSign && <Sign />}
        

        </div>

        </div>

        <div className="flex items-center gap-[20px] md:hidden">

            {
                isSign ?
                <Profile />

                : <> 
                <Shop />
                <Wishlist />
                 </>

            }
                
            
        </div>

        <div className="md:hidden"><ToggleSidebar /></div>
      
    </div>

    {/* search bar -small devices- */}
    <div className="search-sm p-4 block lg:hidden">
        <Search />
    </div>

    </header>
  )
}

export default Header
