"use client"

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { AiFillDelete,AiTwotoneEdit } from 'react-icons/ai';
import { HiPlus } from "react-icons/hi";
import axios from 'axios';
import Link from 'next/link';
// import NavBar from '../NavBar';
import { baseURL } from '../../../utils/constants';
import tablesize from "../../../tablestyle.css";
import { ClipLoader } from 'react-spinners';
import { useRouter,useSearchParams } from 'next/navigation';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const step = () => {
  const [stepData, setstepData] = useState([]);
  const [token, setToken] = useState('');
  const [dataResponse, setDataResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const recipesId = searchParams.get('id');

useEffect(() => {
  fetchData();
  const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
}, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // const recipesId = localStorage.getItem('recipesId');
      const response = await fetch(`${baseURL}/steps/all_by_filter?RecipeID=${recipesId}&page=${currentPage}`, { cache: 'no-store' });
     console.log(recipesId);
      const data = await response.json();
      console.log(response);
      setstepData(data.data);
      setDataResponse(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

//   const handleIngredientClick = (intrdid) => {
//     // Store the selected intrdid in localStorage
//     localStorage.setItem('IngredientId', intrdid);
//     console.log(intrdid);
//     onClick={() => handleIngredientClick(data.intrdid)}
//   };

  const deleteStep = async (id,) => {
    const confirmDelete = window.confirm('Are you sure you want to delete the step ?');
    if (confirmDelete) {
    try {
      const token = localStorage.getItem('token');
      const URL = `${baseURL}/steps/${id}`;
      console.log(`${id}`);
      const response = await axios.delete(`${URL}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(`res=${response.status}`);
      if (response.status === 200) {
        toast.success("Step has been deleted.");
        console.log("Step has been deleted.");
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the page after 3 seconds
      } else {
        // Handle any errors that occur during the API call.
        toast.error("Failed to delete Step" );
        console.error("Failed to delete Step");
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
      {loading ? (
     <div className="flex h-screen justify-center my-32">
      <ClipLoader color={'#3d9f49'} size={100} />
      </div>
    )
    :
      !token ? (
        <div className='m-7'>
        <p className='flex flex-col items-center text-2xl'>You are not logged in. Please log in.</p>
        <button className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md m-3" type="submit" onClick={() => router.push('/')}>
          Go to Login
        </button>
      </div>
    ) : (
      <>  
      {/* <Link href="/addStep" className="bg-emerald-600 text-white hover:text-black p-2 rounded-lg  transition-colors absolute top-4 right-40">
        Add new
      </Link> */}
      <div className="rounded overflow-hidden m-4">
            <div className="fixed bottom-6 right-10">
              <Link href={`/recipes/step/add?id=${recipesId}`}>
                <button className="bg-emerald-600 hover:bg-green-700 text-white font-bold p-3 rounded-full ">
                  <HiPlus className="text-2xl" />
                </button>
              </Link>
            </div>
          </div>
      <h1 className="ml-auto text-xl font-bold">{dataResponse.totalCount} Steps</h1>
      <div className={tablesize.fullWidthTable}>
        <table className="w-full table-fixed border p-2">
          <thead>
            <tr className="border p-2 bg-emerald-600 text-white">
              <th className="border p-2">Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="border bg-white text-center p-2">
            {stepData.map((data) => (
              <tr className="border p-2" key={data.stpid}>
                <td className="border p-2" >
                  {data.description}
                </td>
                <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
                  <div className="rounded-full p-2 bg-emerald-100 hover:bg-red-700 hover:text-white transition-colors cursor-pointer" onClick={() => deleteStep(data.stpid, data.description)}>
                    <AiFillDelete />
                  </div>
                  <div className="rounded-full p-2 bg-emerald-100 hover:bg-sky-400 hover:text-white transition-colors cursor-pointer">
                    <Link className="" href={`/recipes/step/edit/${data.stpid}?id=${recipesId}`}>
                      <AiTwotoneEdit />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mx-2 flex ">
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
      {/* <NavBar/> */}
      <ToastContainer autoClose={3000} />
      </>
      )}
    </div>
  );
};

export default step;



