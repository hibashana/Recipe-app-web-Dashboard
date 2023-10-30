'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import {MdOutlineLogout } from "react-icons/md";
import classnames from 'classnames';

const NavBar = () => {

  const currentPath=  usePathname()
//   console.log(currentPath);
  

        const links=[
          
            { label: 'Home', href:'/home'},
            { label: 'Category', href:'/category'},
            { label: 'Recipes', href:'/recipes'},
            { label: 'Banner', href:'/banner'},
            { label: 'User', href:'/user'},
        ]

  return (

    <nav className='flex flex-col space-y-6 border-b-1  mb-5 px-5 h-16'>
     
      <div className='p-10 w-1/2 h-screen bg-cyan-700 z-20 fixed top-0 left-96 lg:w-60 lg:left-0 peer:transition '>
        
        <div className='flex flex-col justify-start items-center'>
       
          <h1 className='text-base text-center cursor-pointer font-bold text-blue-100 pb-4 w-full '>Profile</h1>
        </div>
         
  <ul className=' flex flex-col space-y-2 gap-4 pl-2'>
  {/* <Link href="/home"><AiFillHome/></Link>  */}
    {links.map((link) => (
      
      <li key={link.href}>    
        <Link
          className={classnames({
            // 'hover:bg-gray-500 rounded-md cursor-pointer hover:shadow-lg m-auto': link.href === currentPath,
            'text-zinc-900': link.href === currentPath,
            'text-zinc-300': link.href !== currentPath,
            'hover:text-zinc-800 transition-colors': true
          })}
          href={link.href}
        >
          {link.label}
          
        </Link>  

      </li>
    ))}

<li>
    <div className=" mt-60 flex items-center gap-4 px-5 border border-gray-100 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
      <MdOutlineLogout className="text-2xl text-gray-100 group-hover:text-white" />
      <h3 className="text-base text-gray-100 group-hover:text-white font-semibold">Logout</h3>
    </div>
  </li>
  </ul>
  
  </div>
</nav>

  
  )
}

export default NavBar