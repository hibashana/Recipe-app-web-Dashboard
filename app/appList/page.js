

'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import {baseURL,imageURL } from '../utils/constants';
import { useRouter } from 'next/navigation';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AppList = () => {
  const [appData, setAppData] = useState([]);
  const [token, setToken] = useState('');
 
  const router = useRouter();


  const handleOnClick = (appModel) => {
    localStorage.setItem('appId', appModel.id); // Store app.id in local storage
   // console.log(id);
    router.push(`/home?id=${appModel.id}&&name=${appModel.name}`);
  };

  
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
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
  }, []);

  const appObjects = appData.map((app) => ({
    name: app.name,
    id: app.id,
    image:app.image,
    description:app.description,
  }));

  // const handleOnClick = (id) => {
  //   router.push(`/home?id=${id}`);
  // };


  const deleteApp= async (id,name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the  "${name}"?`);
    if (confirmDelete) {
    try {

      const token = localStorage.getItem('token');

      const URL=`${baseURL}/app/${id}`;
      console.log(`${id}`);
      const response = await axios.delete(`${URL}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(`res=${response.status}`);
      if (response.status === 200) {
       
        toast.success(`App ${name} has been deleted.`);
        console.log(`App ${name} has been deleted.`);
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the page after 3 seconds
      } else {
        
        toast.error(`Failed to delete App${name}`);
        console.error(`Failed to delete App ${name}`);
      }
    } catch (error) {
     
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  }
  };
 
  return (
    <div>
     {!token ? (
        <div className='m-7 flex flex-col items-center'>
          <p className='text-2xl'>You are not logged in. Please log in.</p>
          <button className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md m-3" type="submit" onClick={() => router.push('http://localhost:3000/')}>
            Go to Login
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-center text-xl font-bold">App List</h1>
          <div className="rounded overflow-hidden m-4">
            <div className="flex justify-end">
              <Link href="/addApp">
                <button className="bg-emerald-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Add
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-center p-4">
            {appObjects.map((app) => (
              <div key={app.id} className="max-w-sm rounded overflow-hidden shadow-lg m-4 w-60">
                <img src={`${imageURL}${app.image}`} width="30" height="30" className="w-full" onClick={() => handleOnClick(app)} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2" onClick={() => handleOnClick(app)}>{app.name}</div>
                  <p className=" text-sm mb-2" onClick={() => handleOnClick(app)}>{app.description}</p>
                </div>
                <div className="hover:text-red-700" onClick={() => deleteApp(app.id, app.name)}>
                  <AiFillDelete />
                </div>
                <Link className='hover:text-sky-400 transition-colors p-2' href={`/editapp/${app.id}`}>
                  <AiTwotoneEdit />
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
  
};

export default AppList;