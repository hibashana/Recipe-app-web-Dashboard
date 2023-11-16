
'use client';

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { AiFillDelete } from 'react-icons/ai';
import { AiTwotoneEdit } from 'react-icons/ai';
import axios from 'axios';
import Link from 'next/link';
import NavBar from '../NavBar';
import { baseURL, imageURL } from '../utils/constants';
import { useRouter } from 'next/navigation';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const banner = () => {
  const [bannerData,setBannerData] = useState([]);
  const [dataResponse, setDataResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchData();
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const appId = localStorage.getItem('appId');
      console.log(appId);
      // const response = await fetch(`${baseURL}/banner/getall`, { cache: 'no-store' });
      const response = await fetch(`${baseURL}/banner/all_by_filter?appID=${appId}&page=${currentPage}`, { cache: 'no-store' });
      const data = await response.json();
      console.log(response);
      setBannerData(data.data);
      setDataResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const handleBannerClick = (id) => {
  //   // Store the selected bannerId in localStorage
  //   localStorage.setItem('bannerId', id);
  // };

  const deleteBanner = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the  "${name}"?`);
    if (confirmDelete) {
    try {
      const token = localStorage.getItem('token');
      const URL = `${baseURL}/banner/${id}`;
      const response = await axios.delete(`${URL}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success(`Banner ${name} has been deleted.`);
        console.log(`Banner ${name} has been deleted.`);
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the page after 3 seconds
      } else {
        // Handle any errors that occur during the API call.
        toast.error(`Failed to delete Banner ${name}`);
        console.error(`Failed to delete Banner ${name}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions.
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col items-center">
       {!token ? (
        <div className='m-7'>
          <p className='text-2xl'>You are not logged in. Please log in.</p>
          <button className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md m-3" type="submit" onClick={() => router.push('/')}>
            Go to Login
          </button>
        </div>
      ) : (
        <>
          <Link href="/addBanner" className="bg-emerald-600 text-white hover:text-black p-2 rounded-lg transition-colors absolute top-4 right-40">
            Add new
          </Link>
          <h1 className="text-center text-xl font-bold">{dataResponse.totalCount}Banner</h1>
          <div className="max-w-screen-md m-20">
            <table className="w-full table-fixed border p-2">
              <thead>
                <tr className="border p-2">
                  <th>Image</th>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="border p-2">
                {bannerData.map((data) => (
                  <tr className="border p-2" key={data.id}>
                    <td className="border p-2">
                      <img src={`${imageURL}${data.image}`} width="100" height="100" alt={data.name} />
                    </td>
                    <td className="border p-2" >
                    {/* onClick={() => handleBannerClick(data.id)} */}
                      {data.name}
                    </td>
                    <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
                      <div className="hover:text-red-700" onClick={() => deleteBanner(data.id, data.name)}>
                        <AiFillDelete />
                      </div>
                      <div className="hover:text-sky-500">
                        <Link className="transition-colors p-2" href={`/editBanner/${data.id}`}>
                          <AiTwotoneEdit />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-center">
          <button onClick={prevPage} disabled={currentPage === 1} className={`mx-2 p-2 border rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={!dataResponse.hasNext}
            className={`mx-2 p-2 border rounded-lg ${!dataResponse.hasNext ?'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </div>
          </div>
          <NavBar />
          <ToastContainer autoClose={3000} />
        </>
      )}
    </div>
  );
};
  

export default banner;




// import React from 'react';
// import 'tailwindcss/tailwind.css';
// import { AiFillDelete } from "react-icons/ai";
// import { AiTwotoneEdit } from "react-icons/ai";
// import {baseURL,imageURL } from '../utils/constants';
// import NavBar from '../NavBar';
// import Link from 'next/link';



// const banner = async () => {

  
//   const res = await fetch(`${baseURL}/banner/getall`, { cache: 'no-store' });
//   console.log(res);
//   const bannerData = await res.json();

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
 
//   return (
//     <div className="flex flex-col items-center"> {/* Center the content */}
//       {/* <button className="bg-sky-600 text-black p-2 rounded-lg hover:text-white transition-colors absolute top-4 right-40">
//         Add new
//       </button> */}
//       <Link href="/addBanner" className="bg-sky-600 text-black p-2 rounded-lg hover:text-white transition-colors absolute top-4 right-40">
//         Add new
//       </Link>
     
//       {/* <h1 className="text-center absolute top-14 left-40">Category</h1> */}
//       <div className="max-w-screen-md"> {/* Limit the table width */}
//         <table className="w-full    table-fixed border p-2"> {/* Set table width to full and add a thin border */}
//           <thead>
//             <tr className="border p-2">
//               <th className="border p-2">Image</th> 
//               <th>Name</th>
//               <th></th> 
              
//             </tr>
//           </thead>
//           <tbody className="border p-2">
//              {bannerData.map((data) => (
//               <tr  className="border p-2 " key={data.id}>
//                  <td className="border p-2"><img    src={`${imageURL}${data.image}`}  width="100" height="100" /></td>
//                 <td className="border p-2">{data.name}</td>
               
//                 <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
//   <div className="hover:text-red-700">
//     <AiFillDelete />
//   </div>
//   <div className="hover:text-sky-500">
//   <Link  className='hover:text-sky-400 transition-colors p-2'href={`/editBanner/${data.id}`}> <AiTwotoneEdit /></Link>
    
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


// export default banner;



