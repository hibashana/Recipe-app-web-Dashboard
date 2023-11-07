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

const step = () => {
  const [stepData, setstepData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/steps/getall`, { cache: 'no-store' });
      const data = await response.json();
      setstepData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

//   const handleIngredientClick = (intrdid) => {
//     // Store the selected intrdid in localStorage
//     localStorage.setItem('IngredientId', intrdid);
//     console.log(intrdid);
//     onClick={() => handleIngredientClick(data.intrdid)}
//   };

  const deleteStep = async (id,) => {
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
  };

  return (
    <div className="flex flex-col items-center">
      <Link href="/addStep" className="bg-sky-600 text-black p-2 rounded-lg hover:text-white transition-colors absolute top-4 right-40">
        Add new
      </Link>
      <div className="max-w-screen-md m-20">
        <table className="w-full table-fixed border p-2">
          <thead>
            <tr className="border p-2">
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="border p-2">
            {stepData.map((data) => (
              <tr className="border p-2" key={data.stpid}>
                <td className="border p-2" >
                  {data.description}
                </td>
                <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
                  <div className="hover:text-red-700" onClick={() => deleteStep(data.stpid, data.description)}>
                    <AiFillDelete />
                  </div>
                  <div className="hover:text-sky-500">
                    <Link className="transition-colors p-2" href={`/editStep/${data.stpid}`}>
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

export default step;



