'use client'
import React from "react"

import {FiSearch,FiUser} from 'react-icons/fi'
import {AiOutlineInfoCircle,AiOutlineHome} from 'react-icons/ai'
import {BiMenu} from 'react-icons/bi'
import Link from "next/link"
import Genre from "./Genre"


const Navbar = () => {
    
     
      
   
    const [searchAnime, setSearchAnime] = React.useState('')
    const [menuShow, setMenuShow] = React.useState(false)
   

 
    
    function replaceSpacesWithDashes(input) {
        return input.replace(/ /g, '-');
      }
    const handleSubmit = (e) => {
        e.preventDefault()
        const legitSearch = replaceSpacesWithDashes(searchAnime)
        // window.location.href = `/detail/${legitSearch}`
        window.location.href = `/searched/${legitSearch}`

    }

    const handleMenuShow = () => {
        setMenuShow(!menuShow)
    }
  
    return (
        <>
            <nav className=' bg-black text-white border-white mb-[1px] h-16  relative  '>
                <div className="w-[90%] md:w-[80%] m-auto flex justify-between  items-center    md:py-2">
                    <div className="logo md:flex items-center md:justify-evenly md:gap-5">
                        <Link href='/home'>
                            <h1 className='font-outfits md:text-4xl font-black text-3xl text-orange-400'>Insane anime</h1>
                        </Link>
                        
                    </div>
                    
                    <form action="" onSubmit={handleSubmit} className='relative group w-[-200px]' >
                        <input type="text" placeholder='Search Anime' className='px-5 group-hover:pr-10 group-hover:w-[200px] md:duration-500 ring-1 outline-none text-sm py-2 group-hover:placeholder:text-slate-500 duration-500 text-gray-800 w-0 rounded-md' onChange={(e) => setSearchAnime(e.target.value)} />
                        <FiSearch className='absolute top-[8px] right-3 flex text-lg text-slate-500 group-hover:text-slate-600' />
                    </form>
                </div>

               <div className="absolute bottom-0 bg-orange-400 w-full h-[2px]"></div>
            </nav>

            <div id="navbarForMobile" className="flex sm:hidden z-50 items-center gap-2  fixed right-6 bottom-10">
                <div className={`${menuShow ? 'flex' : 'hidden'} gap-4 bg-[#272931] text-xs items-center  py-2 px-4 rounded-md`}>
                    <a href="/" className="flex flex-col items-center gap-1 font-medium">
                        <AiOutlineHome className="text-white text-xl" />
                        <span className="text-white text-[13px] block">Home</span>
                    </a>
                    <a href="/about" className="flex flex-col items-center gap-1 font-medium">
                        <AiOutlineInfoCircle className="text-white text-xl" />
                        <span className="text-white text-[13px] block">About</span>
                    </a>
                   

                   

                </div>
                <div className="hamburgerMenu px-2 py-2 rounded-md bg-[#272931]" onClick={handleMenuShow}>
                    <BiMenu className="text-4xl text-[#f07e5c]" />
                </div>
            </div>

        </>
    )
}

export default Navbar