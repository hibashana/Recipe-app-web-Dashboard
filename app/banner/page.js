
import React from 'react';
import 'tailwindcss/tailwind.css';
import { AiFillDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import {baseURL,imageURL } from '../utils/constants';
import NavBar from '../NavBar';



const banner = async () => {

  
  const res = await fetch(`${baseURL}/banner/getall`, { cache: 'no-store' });
  console.log(res);
  const bannerData = await res.json();
 
  return (
    <div className="flex flex-col items-center"> {/* Center the content */}
      <button className="bg-sky-600 text-black p-2 rounded-lg hover:text-white transition-colors absolute top-4 right-40">
        Add new
      </button>
     
      {/* <h1 className="text-center absolute top-14 left-40">Category</h1> */}
      <div className="max-w-screen-md"> {/* Limit the table width */}
        <table className="w-full    table-fixed border p-2"> {/* Set table width to full and add a thin border */}
          <thead>
            <tr className="border p-2">
              <th className="border p-2">Image</th> 
              <th>Name</th>
              <th></th> 
              
            </tr>
          </thead>
          <tbody className="border p-2">
             {bannerData.map((data) => (
              <tr  className="border p-2 " key={data.id}>
                 <td className="border p-2"><img    src={`${imageURL}${data.image}`}  width="100" height="100" /></td>
                <td className="border p-2">{data.name}</td>
               
                <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
  <div className="hover:text-red-700">
    <AiFillDelete />
  </div>
  <div className="hover:text-sky-500">
    <AiTwotoneEdit />
  </div>
</td>        
   </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NavBar/>
    </div>
  );
};


export default banner;



