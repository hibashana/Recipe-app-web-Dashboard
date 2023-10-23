// pages/AppList.js

import React from 'react';
import Link from 'next/link';
import { AiFillDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai"; 

const AppList = async () => {
  // Sample app data
  const res = await fetch('http://localhost:3002/api/v1/app/all ', { cache: 'no-store' });
  console.log(res);
  const appData = await res.json();    
  

  return (
    <div>
      <h1>App List</h1>

     
<div className="flex flex-wrap justify-center p-4">
      {appData.map((app) => (
        <div key={app.id} className="max-w-sm rounded overflow-hidden shadow-lg m-4 w-60">
          <img src={"http://localhost:3002"+app.image}   width="30" height="30" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{app.name}</div>
            <p className="text-gray-700 text-base">{app.description}</p>
          </div>
          <div className="px-6 py-4">
            <Link href={`/addApplist/${app.id}`}>
              
            </Link>
          </div>
          <div className="hover:text-red-700 ">  //m-10
    <AiFillDelete />
  </div>
  <div className="hover:text-sky-500">
    <AiTwotoneEdit />
  </div>
        </div>
        
      ))}
      <div className=" rounded overflow-hidden  m-4">
        <div className=" flex items-center justify-center h-40">
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
