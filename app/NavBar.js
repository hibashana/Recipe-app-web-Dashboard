'use client';

// Import necessary modules and components
import Link from 'next/link';
import { useRouter, useSearchParams , usePathname} from 'next/navigation';
import { MdOutlineLogout,MdFastfood} from 'react-icons/md';
import { BiSolidCategory } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { AiOutlineHome, AiOutlineBook, AiOutlineTags, AiOutlinePicRight, AiOutlineUser } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import classnames from 'classnames';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import AppBar from './AppBar';


const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  // const currentPath = useRouter();
  const searchParams = useSearchParams(); // Retrieve query parameters
  const [storedName, setStoredName] = useState('');

  const router = useRouter();

  useEffect(() => {
    const paramName = searchParams.get('name');

    if (paramName) {
      localStorage.setItem('appName', paramName);
      setStoredName(paramName);
    } else {
      const storedName = localStorage.getItem('appName');
      if (storedName) {
        setStoredName(storedName);
      }
    }
  }, [searchParams]);

  const handleLogout = () => {
    const shouldLogout = window.confirm('Are you sure you want to logout?');

    if (shouldLogout) {
      // Clear the authentication token from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('appName');
      localStorage.removeItem('CategoryId');
      toast.success('Logged Out');
      console.log('Logged Out');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  };

  // Define navigation links
  const links = [
    { label: 'Home', href: '/home',icon:  <FaHome/>},
    { label: 'Category', href: '/category', icon: <BiSolidCategory />  },
    { label: 'Recipes', href: '/recipes' , icon:<MdFastfood />},
    { label: 'Banner', href: '/banner',icon:<AiOutlinePicRight />},
    { label: 'User', href: '/user',icon:<AiOutlineUser /> },
  ];

  return (
    <nav className="flex fixed flex-col">
       {/* <AppBar title={storedName} /> */}
      <div className="w-1/2 py-10 h-screen bg-emerald-600 fixed top-0 left-96 lg:w-60 lg:left-0">
      <div className="flex items-center justify-between  mb-4">
      <h2 className="flex items-center px-2 gap-2  font-bold text-white text-3xl">
      <Link href="/appList">
        <IoIosArrowBack className="text-3xl text-white cursor-pointer hover:text-black" />
        </Link>
        {storedName}
      </h2>
    </div>
        {/* <div className="flex items-center  justify-between  mb-4">
       <Link href="/appList">
            <div className="flex items-center text-3xl  text-white cursor-pointer hover:text-black">
              <IoIosArrowBack />
            </div>
          </Link>
          <h2 className="flex flex-col space-y-2 px-5   gap-4 pl-10 font-bold text-white text-3xl ">
            {storedName}
          </h2>
        </div> */}

<ul className="flex flex-col space-y-2 gap-4 pl-12">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className={classnames({
                  'text-zinc-900': link.href === currentPath,
                  'text-white': link.href !== currentPath,
                  'hover:text-zinc-800 transition-colors': true,
                })}
                href={link.href}
              >
                <div className="flex items-center gap-2">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
              </Link>
            </li>
          ))}

          <li className="p-5 pl-0 px-10">
            <div className="fixed bottom-10">
              <div
                className="flex gap-2 p-2 bg-white border hover:border-gray-900  rounded-md cursor-pointer "
                onClick={handleLogout}
              >
                <MdOutlineLogout
                  className="text-2xl text-gray-100 group-hover:text-white"
                  style={{ color: '#1fb476' }}
                />
                <h3 className="text-base text-emerald-600 font-semibold">Logout</h3>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

