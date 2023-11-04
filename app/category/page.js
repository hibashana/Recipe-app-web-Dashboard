"use client"

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { AiFillDelete } from 'react-icons/ai';
import { AiTwotoneEdit } from 'react-icons/ai';
import axios from 'axios';
import Link from 'next/link';
import NavBar from '../NavBar';
import { baseURL } from '../utils/constants';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/category/getall`, { cache: 'no-store' });
      const data = await response.json();
      setCategoryData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCategoryClick = (ctgyid) => {
    // Store the selected ctgyid in localStorage
    localStorage.setItem('CategoryId', ctgyid);
    console.log(ctgyid);
  };

  const deleteApp = async (id, name) => {
    try {
      const token = localStorage.getItem('token');
      const URL = `${baseURL}/category/${id}`;
      console.log(`${id}`);
      const response = await axios.delete(`${URL}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(`res=${response.status}`);
      if (response.status === 200) {
        toast.success(`Category ${name} has been deleted.`);
        console.log(`Category ${name} has been deleted.`);
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the page after 3 seconds
      } else {
        // Handle any errors that occur during the API call.
        toast.error(`Failed to delete Category ${name}`);
        console.error(`Failed to delete Category ${name}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions.
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Link href="/addCategory" className="bg-sky-600 text-black p-2 rounded-lg hover:text-white transition-colors absolute top-4 right-40">
        Add new
      </Link>
      <div className="max-w-screen-md m-20">
        <table className="w-full table-fixed border p-2">
          <thead>
            <tr className="border p-2">
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="border p-2">
            {categoryData.map((data) => (
              <tr className="border p-2" key={data.ctgyid}>
                <td className="border p-2" onClick={() => handleCategoryClick(data.ctgyid)}>
                  {data.name}
                </td>
                <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
                  <div className="hover:text-red-700" onClick={() => deleteApp(data.ctgyid, data.name)}>
                    <AiFillDelete />
                  </div>
                  <div className="hover:text-sky-500">
                    <Link className="transition-colors p-2" href={`/editCategory/${data.ctgyid}`}>
                      <AiTwotoneEdit />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NavBar />
    </div>
  );
};

export default Category;



// import React from 'react';
// import 'tailwindcss/tailwind.css';
// import { AiFillDelete } from "react-icons/ai";
// import { AiTwotoneEdit } from "react-icons/ai"; 
// import Link from 'next/link';
// import NavBar from '../NavBar';
// import {baseURL,imageURL } from '../utils/constants';



// const category = async () => {

//   const handleCategoryClick = (ctgyid) => {
//     // Store the selected ctgyid in localStorage
//     localStorage.setItem('selectedCategoryId', ctgyid);
//   };

//   const deleteApp = async (id, name) => {
//     try {
//       const token = localStorage.getItem('token');
//       const URL = `${baseURL}/category/${id}`;
//       console.log(`${id}`);
//       const response = await axios.delete(`${URL}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       console.log(`res=${response.status}`);
//       if (response.status === 200) {
//         toast.success(`Category ${name} has been deleted.`);
//         console.log(`Category ${name} has been deleted.`);
//         setTimeout(() => {
//           window.location.reload();
//         }, 3000); // Reload the page after 3 seconds
//       } else {
//         // Handle any errors that occur during the API call.
//         toast.error(`Failed to delete Category ${name}`);
//         console.error(`Failed to delete Category ${name}`);
//       }
//     } catch (error) {
//       // Handle network errors or other exceptions.
//       toast.error(`An error occurred: ${error.message}`);
//       console.error(`An error occurred: ${error.message}`);
//     }
//   };


//   const res = await fetch(`${baseURL}/category/getall`, { cache: 'no-store' });
//   console.log(res);
//   const categoryData = await res.json();
 
//   return (
//     <div className="flex flex-col items-center"> {/* Center the content */}
//       <Link href='/addCategory' className="bg-sky-600 text-black p-2 rounded-lg hover:text-white transition-colors absolute top-4 right-40">
//         Add new
//       </Link>
     
//       {/* <h1 className="text-center absolute top-14 left-40">Category</h1> */}
//       <div className="max-w-screen-md m-20"> {/* Limit the table width */}
//         <table className="w-full table-fixed  border p-2"> {/* Set table width to full and add a thin border */}
//           <thead>
//             <tr className="border p-2">
//               {/* <th className="border p-2">Image</th>  */}
//               <th>Name</th>
//               <th></th> 
              
//             </tr>
//           </thead>
//           <tbody className="border p-2">
//              {categoryData.map((data) => (
//               <tr className="border p-2" key={data.ctgyid}>
//                  {/* <td className="border p-2"><img src={"http://localhost:3001"+data.image}  width="100" height="100" /></td> */}
//                 <td className="border p-2"
//                   onClick={() => handleCategoryClick(data.ctgyid)} >{data.name}</td>
               
//                 <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
//                 <div className="hover:text-red-700" onClick={() => deleteApp(data.ctgyid, data.name)}>
//   <AiFillDelete />
// </div>
//   <div className="hover:text-sky-500">
//   <Link className='transition-colors p-2' href={`/editCategory/${data.ctgyid}`}> <AiTwotoneEdit /></Link>
//   </div>
// </td>        
//    </tr>
//             ))}
//           </tbody>  
//         </table>
//       </div>
//       <NavBar/>
//     </div>
//   );
// };


// export default category;