import React from 'react'
import {Link} from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";

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

const Header = () => {
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

        <Wishlist />
        <Shop />

        <Sign />
        

        </div>

        

        </div>

        <div className="shop flex items-center gap-[20px] md:hidden">
            <Shop />
            <Wishlist />
        </div>
      
    </div>

    <div className="search-sm p-4 block lg:hidden">
        <Search />
    </div>

    </header>
  )
}

export default Header
