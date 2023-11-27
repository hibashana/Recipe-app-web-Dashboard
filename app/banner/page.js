
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
import { HiPlus } from "react-icons/hi";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const banner = () => {
  const [bannerData,setBannerData] = useState([]);
  const [dataResponse, setDataResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState('');
  const [searchName, setSearchName] = useState('');
  const router = useRouter();

  const [selectedBanner, setSelectedBanner] = useState(null);

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

  const handleSearch = async () => {
    try {
      const appId = localStorage.getItem('appId');
       const response = await fetch(`${baseURL}/banner/all_by_filter?appID=${appId}&page=${currentPage}&name=${searchName}`,{ cache: 'no-store' });
      const data = await response.json();
      console.log(response);
      setBannerData(data.data);
      setDataResponse(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
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

  const viewRecipes = (id) => {
    setSelectedBanner(selectedBanner === id ? null : id);
  };

  

  return (
    <div className="flex flex-col">
       {!token ? (
        <div className='m-7'>
          <p className='text-2xl'>You are not logged in. Please log in.</p>
          <button className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md m-3" type="submit" onClick={() => router.push('/')}>
            Go to Login
          </button>
        </div>
      ) : (
        <>
        <div className="rounded overflow-hidden m-4">
            <div className="fixed bottom-10 right-10">
              <Link href="/addBanner">
                <button className="bg-emerald-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ">
                  <HiPlus className="text-2xl" />
                </button>
              </Link>
            </div>
          </div>

          <div className="flex mx-12 items-center">
            <div className="flex border mx-60  border-emerald-400 rounded">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-black bg-white border rounded-md focus:border-emerald-600 focus:outline-none  focus:ring-opacity-40"
                    // focus:ring-emerald-600 focus:ring
                    placeholder="Search..."
                    value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                />
                <button className="px-4 text-white bg-emerald-600 border-l rounded "
                onClick={handleSearch}>
                    Search
                </button>
            </div>
            <h1 className="text-center text-xl font-bold gap-30 p-6">{dataResponse.totalCount} Banner</h1>
        </div>
        
          <Link href="/addBanner" className="bg-emerald-600 text-white hover:text-black p-2 rounded-lg transition-colors absolute top-4 right-40">
            Add new
          </Link>
          
          <div className="max-w-screen-md m-4 mx-auto">
            <table className="w-full table-fixed border p-2">
              <thead>
                <tr className="border p-2 bg-emerald-600 text-white">
                  <th className="border p-2 w-32">Image</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Recipes</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody className="border bg-white text-center p-2">
                {bannerData.map((data) => (
                  <React.Fragment key={data.id}>
                  <tr className="border p-2" key={data.id}>
                    <td className="border p-2">
                      <img src={`${imageURL}${data.image}`} className="w-20 h-20 object-cover" alt={data.name} />
                    </td>
                    <td className="border p-2" >
                    {/* onClick={() => handleBannerClick(data.id)} */}
                      {data.name}
                    </td>
                    <td className='border p-2'>
                  {data.Recipes.length} Recipes{' '}
                  <span
                    className="flex justify-center text-emerald-600 hover:text-blue-500 cursor-pointer"
                    onClick={() => viewRecipes(data.id)}
                  >
                    View
                  </span>
                  <Link href={`/bannerRecipe?bannerId=${data.id}&recipeIds=${data.Recipes.map(recipe => recipe.rcpid).join(',')}`}>
                    <span className="flex justify-center text-emerald-600 hover:text-blue-500 cursor-pointer">
                       Add Recipe
                    </span>
                  </Link>
                </td>
                    <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
                      <div className="rounded-full p-2 bg-emerald-100 hover:bg-red-700 hover:text-white transition-colors" onClick={() => deleteBanner(data.id, data.name)}>
                        <AiFillDelete />
                      </div>
                      <div className="rounded-full p-2 bg-emerald-100 hover:bg-sky-400 hover:text-white transition-colors">
                        <Link className="" href={`/editBanner/${data.id}`}>
                          <AiTwotoneEdit />
                        </Link>
                      </div>
                    </td>
                  </tr>
                  {data.Recipes.length > 0 && selectedBanner === data.id && (
              <tr>
              <td colSpan={4}>
          <table className="w-full table-fixed text-center border-black bg-emerald-100">
            <thead>
              <tr className="border-black p-2 bg-emerald-600 text-white">
                <th className="border w-1/6">Image</th>
                <th className="border w-1/6">Name</th>
                <th className="border w-3/6">Description</th>
                <th className="border w-1/6">Premium</th>
                <th className=" w-1/6"></th>
                <th className="w-1/6"></th>
              </tr>
            </thead>
            <tbody>
                   {bannerData
                .find((banner) => banner.id === selectedBanner)
                .Recipes.map((recipe) => (
                  
                                <tr className="border p-2" key={recipe.rcpid}>
                                  <td className="border p-2">
                                    <img
                                      src={`${imageURL}${recipe.image}`}
                                      className="w-20 h-20 object-cover"
                                    />
                                  </td>
                                  <td className="border p-2">{recipe.name}</td>
                                  <td className="border p-2">
                                    {recipe.description}
                                  </td>
                                  <td className="border p-2">
                                    <label className="flex  cursor-pointer">
                                      <input
                                        className="cursor-pointer"
                                        type="checkbox"
                                        checked={recipe.premium}
                                      />
                                    </label>
                                  </td>
                                  
                                  <td></td>
                                  <td className="w-1/4 flex justify-center text-center flex-row gap-4  " colSpan={3}>
                                    <div className="hover:text-sky-500">
                                      <Link href={`/ingredients`}>Ingredients</Link>
                                    </div>
                                    <div className="hover:text-sky-500">
                                      <Link href={`/step`}>Steps</Link>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          </td>
                          
                      </tr>
                           )}
                           
                  </React.Fragment>
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



