

'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import {baseURL,imageURL } from '../utils/constants';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { useRouter } from 'next/navigation';



const AppList = () => {
  const [appData, setAppData] = useState([]);
  // const router = useRouter();


  const fetchAppData = async () => {
    try {
      const URL=`${baseURL}/app/all`
      const res = await fetch(URL, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setAppData(data);
        localStorage.setItem('dataId', data.id);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };
 

  useEffect(() => {
    fetchAppData();
  }, []);

  const appObjects = appData.map((app) => ({
    name: app.name,
    id: app.id,
    image:app.image,
  }));
  // const handleOnClick = (id) => {
  //   router.push(`/home?id=${id}`);
  // };

 

  const deleteApp= async (id,name) => {
    try {
      //const URL= `${baseURL}/app/${id}`;
      console.log(`${id}`);
      const response = await axios.delete(`https://b384-2405-201-f00a-810f-c1c2-e732-e9c5-f564.ngrok-free.app/app/${id}`);
      console.log(`res=${response.status}`);
      if (response.status === 200) {
       
        toast.success(`App ${name} has been deleted.`);
        console.log(`App ${name} has been deleted.`);
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the page after 3 seconds
      } else {
        // Handle any errors that occur during the API call.
        toast.error(`Failed to delete App${name}`);
        console.error(`Failed to delete App ${name}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions.
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };
 
  return (
    <div>
      <h1 className="text-center text-xl font-bold">App List</h1>
      <div className="flex flex-wrap justify-center p-4">
        {appObjects.map((app) => (
          // <div onClick={() => handleOnClick(app.id)} key={app.id} className="max-w-sm rounded overflow-hidden shadow-lg m-4 w-60">
         
            <div  key={app.id} className="max-w-sm rounded overflow-hidden shadow-lg m-4 w-60">
               <Link
          href={{
            pathname: '/home',
            query: { appObject: JSON.stringify(app) }, // Pass the object as a JSON string
          }}
        >
            <img src={`${imageURL}${app.image}`} width="30" height="30" className="w-full" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{app.name}</div>
              <p className="text-gray-700 text-base">{app.description}</p>  
            </div>
            <div></div>
            </Link>
            <button className="hover:text-red-700" onClick={() => deleteApp(app.id, app.name)}>
              
              <AiFillDelete />
    
            </button>
            {/* <div className="hover:text-sky-500"> */}
            <Link  className='hover:text-sky-400 transition-colors p-2'href={`/editapp/${app.id}`}> <AiTwotoneEdit /></Link>

            {/* </div> */}
            </div>   
       
          
        ))}
        <div className="rounded overflow-hidden m-4">
          <div className="flex items-center justify-center h-40">
            <Link href="/addApp">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Add
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppList;
