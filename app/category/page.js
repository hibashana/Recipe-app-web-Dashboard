"use client"

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { AiFillDelete,AiTwotoneEdit } from 'react-icons/ai';
import { HiPlus } from "react-icons/hi";
import axios from 'axios';
import Link from 'next/link';
import NavBar from '../NavBar';
import { baseURL } from '../utils/constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [dataResponse, setDataResponse] = useState([]);
  const [searchName, setSearchName] = useState('');
  // const [searchResults, setSearchResults] = useState([]);
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
      const response = await fetch(`${baseURL}/category/all_by_filter?appID=${appId}&page=${currentPage}`, { cache: 'no-store' });
      // const response = await fetch(`${baseURL}/category/getall`, { cache: 'no-store' });
      const data = await response.json();
      console.log(response);
      setCategoryData(data.data);
      setDataResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const handleCategoryClick = (ctgyid) => {
  //   localStorage.setItem('CategoryId', ctgyid);
  //   console.log(ctgyid);
  // };

  const handleSearch = async () => {
    try {
      const appId = localStorage.getItem('appId');
       const response = await fetch(`${baseURL}/category/all_by_filter?appID=${appId}&name=${searchName}&page=${currentPage}`,{ cache: 'no-store' });
      // const response = await fetch(`${baseURL}/category/search?item=${searchName}`,{ cache: 'no-store' });
      const data = await response.json();
      console.log(response);
      setCategoryData(data.data);
      setDataResponse(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const deleteApp = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the category "${name}"?`);
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        // if (!token && !isChecked) {
        //   return; // redirect to the login page 
        // }
        const URL = `${baseURL}/category/${id}`;
        const response = await axios.delete(`${URL}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          toast.success(`Category ${name} has been deleted.`);
          console.log(`Category ${name} has been deleted.`);
          setTimeout(() => {
            window.location.reload();
          }, 3000); // Reload the page after 3 seconds
        } else {
          toast.error(`Failed to delete Category ${name}`);
          console.error(`Failed to delete Category ${name}`);
        }
      } catch (error) {
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
      <div className="m-7">
        <p className="text-2xl">You are not logged in. Please login.</p>
        <button
          className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md m-3"
          type="submit"
          onClick={() => router.push('/')}
        >
          Go to Login
        </button>
      </div>
    ) : (
      <>
      
      <div className="rounded overflow-hidden m-4">
        
  <div className="fixed bottom-10 right-10">
    <Link href="/addCategory">
      <button className="bg-emerald-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ">
        <HiPlus className="text-2xl" />
      </button>
    </Link>
  </div>
</div>
        {/* <Link
          href="/addCategory"
          className="bg-emerald-600 text-white hover:text-black p-2 rounded-lg transition-colors absolute top-4 right-40"
        >
          Add new
        </Link> */}
        
        <div className="flex items-center">
            <div className="flex border border-emerald-400 rounded">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-black bg-white border rounded-md focus:border-emerald-600  focus:outline-none  focus:ring-opacity-40"
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
        </div>
    
        <h1 className="text-center text-xl p-2 font-bold">{dataResponse.totalCount} Categories</h1>
        <div className="max-w-screen-md p-2">
          <table className="w-full table-fixed text-center border">
            <thead>
              <tr className="border p-2">
                <th className="border p-2">Name</th>
                <th className="border p-2">Total Recipes</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody >
              {categoryData.map((data) => (
                <tr className=" border p-2" key={data.ctgyid}>
                  <td className="border p-2">{data.name}</td>
                  <td className="border p-2">{data.Recipes.length}</td>
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
          <div className="mt-4 flex justify-center">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`mx-2 p-2 border rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={!dataResponse.hasNext}
              className={`mx-2 p-2 border rounded-lg ${
                !dataResponse.hasNext ? 'opacity-50 cursor-not-allowed' : ''
              }`}
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

export default Category;
