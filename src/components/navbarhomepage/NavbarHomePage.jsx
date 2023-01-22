import React,{useState} from 'react'
import { MenuIcon, XIcon} from '@heroicons/react/outline';
import {useNavigate} from "react-router-dom";
import { NavLink } from "react-router-dom";
const Navbar = () => {


  const [nav, setNav] = useState(false)
  const handleClick = () => setNav(!nav)




  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;

    navigate(`/search/?q=${search}`)
    setSearch("")
  }

  return (
    <nav className='w-full shadow-lg py-2 bg-white'>
        <div className=' mx-auto'>
          <div className='justify-around items-center flex  max-sm:hidden'>
            <NavLink to='/'><h1 className='text-3xl font-bold hover:scale-110 duration-1000'>CRUD</h1></NavLink>
            <form onSubmit={handleSubmit} className='shadow rounded-lg '>
              <input onChange={(e) => setSearch(e.target.value)} value={search} type='text' className='px-8 py-1 text-center border border-black rounded-lg placeholder:italic hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-1 hover:scale-110 duration-1000' placeholder='Search a register...' />
            </form>
            <NavLink to='/add'><button className=' bg-[#1467E2] text-white text-xl font-semibold p-2 rounded-xl hover:scale-110 duration-1000'>New register</button></NavLink>
          </div>


              
                <div className='mx-auto sm:hidden mr-4 '>
                  <div className='justify-around items-center flex'>
                    <NavLink to='/'><h1 className='text-3xl font-bold hover:scale-110 duration-1000'>CRUD</h1></NavLink>
                    <div onClick={handleClick}>
                      {!nav ? <MenuIcon className='w-10' /> :  <XIcon className='w-10' /> }   
                    </div>
                  </div>
                </div>

               
                   </div>   

                  <div className='sm:hidden'>
                      <div className={!nav ? 'hidden' : 'mx-auto  w-full text-center my-1 border-t'}>
                        <NavLink to='/add'><button className=' mb-5 mt-5  bg-[#1467E2] text-white text-xl font-semibold p-2 rounded-xl hover:scale-110 duration-1000'>New register</button></NavLink>  
                        <form onSubmit={handleSubmit} className='rounded-lg'>
                          <input onChange={(e) => setSearch(e.target.value)} value={search} type='text' className='px-8 py-1 text-center border border-black rounded-lg placeholder:italic hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-1 hover:scale-110 duration-1000' placeholder='Search a register...' />
                        </form>
                  </div>  

        </div>
    </nav>
  )
}

export default Navbar