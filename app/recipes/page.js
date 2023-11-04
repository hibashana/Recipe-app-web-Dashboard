
'use client';

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { AiFillDelete } from 'react-icons/ai';
import { AiTwotoneEdit } from 'react-icons/ai';
import axios from 'axios';
import Link from 'next/link';
import NavBar from '../NavBar';
import { baseURL, imageURL } from '../utils/constants';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const recipes = () => {
  const [recipesData, setrecipesData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/recipes/getall`, { cache: 'no-store' });
      const data = await response.json();
      setrecipesData(data);
      localStorage.setItem("dataId", data.rcpid);
      console.log()
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const handlerecipesClick = (rcpid) => {
  //   localStorage.setItem('recipesId', rcpid);
  // };

  const deleterecipes = async (rcpid, name) => {
    try {
      const token = localStorage.getItem('token');
      const URL = `${baseURL}/recipes/${rcpid}`;
      const response = await axios.delete(`${URL}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success(`recipes ${name} has been deleted.`);
        console.log(`recipes ${name} has been deleted.`);
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the page after 3 seconds
      } else {
        // Handle any errors that occur during the API call.
        toast.error(`Failed to delete recipes ${name}`);
        console.error(`Failed to delete recipes ${name}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions.
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };

 const handlePremiumChange = async (rcpid, isPremium) => {
    try {
      const token = localStorage.getItem('token');
      const URL = `${baseURL}/recipes/change_premium_status/?id=${rcpid}`;
      const response = await axios.get(
        URL,
        // { isPremium: !isPremium }, // Toggle the premium status
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(`Premium status updated for Recipe ${rcpid}`);
        fetchData(); // Refresh the data after the update
      } else {
        toast.error(`Failed to update Premium status for Recipe ${rcpid}`);
        console.error(`Failed to update Premium status for Recipe ${rcpid}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };


  return (
    <div className="flex flex-col items-center">
      <Link href="/addRecipes" className="bg-sky-600 text-black p-2 rounded-lg hover:text-white transition-colors absolute top-4 right-40">
        Add new
      </Link>
      <div className="max-w-screen-md m-20">
        <table className="w-full table-fixed border p-2">
          <thead>
            <tr className="border p-2">
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Premium</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="border p-2">
            {recipesData.map((data) => (
              <tr className="border p-2" key={data.rcpid}>
                <td className="border p-2">
                  <img src={`${imageURL}${data.image}`} width="100" height="100" />
                </td>
                <td className="border p-2" onClick={() => handlerecipesClick(data.rcpid)}>
                  {data.name}
                </td>
                <td className="border p-2" onClick={() => handlerecipesClick(data.rcpid)}>
                  {data.description}
                </td>    
                <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={data.premium}
                    onChange={() => handlePremiumChange(data.rcpid, data.premium)}
                  />
                </td>
                <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
                  <div className="hover:text-red-700" onClick={() => deleterecipes(data.rcpid, data.name)}>
                    <AiFillDelete />
                  </div>
                  <div className="hover:text-sky-500">
                    <Link className="transition-colors p-2" href={`/editRecipe/${data.rcpid}`}>
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

export default recipes;














// import React from 'react';
// import 'tailwindcss/tailwind.css';
// import { AiFillDelete } from "react-icons/ai";
// import { AiTwotoneEdit } from "react-icons/ai"; 
// import Link from 'next/link';
// import NavBar from '../NavBar';
// import {baseURL} from '../utils/constants';



// const recipes = async () => {

  
//   const res = await fetch(`${baseURL}/recipes/getall`, { cache: 'no-store' });
//   console.log(res);
//   const recipeData = await res.json();

  
 
//   return (
//     <div className="flex flex-col items-center"> {/* Center the content */}
//       <Link href='/' className="bg-sky-600 text-black p-2 rounded-lg hover:text-white transition-colors absolute top-4 right-40">
//         Add new
//       </Link>
      
//       <div className="max-w-screen-md m-20">
//         <table className="w-full table-fixed  border p-2">
//           <thead>
//             <tr className="border p-2">
             
//               <th>Name</th>
//               <th></th> 
              
//             </tr>
//           </thead>
//           <tbody className="border p-2">
//              {recipeData.map((data) => (
//               <tr  className="border p-2" key={data.id}>
//                 <td className="border p-2">{data.name}</td>
//                 <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
//   <div className="hover:text-red-700">
//     <AiFillDelete />
//   </div>
//   <div className="hover:text-sky-500">
//     <AiTwotoneEdit />
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


// export default recipes;



