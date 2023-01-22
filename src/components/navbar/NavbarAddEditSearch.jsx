import React from 'react'
import { NavLink } from "react-router-dom";

const NavbarAddEditSearch = () => {
  return (
    <nav className='w-full shadow-lg py-2 bg-white'>
        <div className=' mx-auto'>
          <div className='justify-around items-center flex'>
            <NavLink to='/'><h1 className='text-3xl font-bold'>CRUD</h1></NavLink>
            <NavLink to='/'><button className=' bg-[#1467E2] text-white text-xl font-semibold p-2 rounded-xl hover:scale-110 duration-1000'>Return</button></NavLink>
          </div>
        </div>
    </nav>
  )
}

export default NavbarAddEditSearch