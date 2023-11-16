"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL, imageURL } from '../utils/constants';
import NavBar from '../NavBar';

const User = () => {
  const [usersData, setUsersData] = useState([]);
  const [token, setToken] = useState('');
  const [dataResponse, setDataResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${baseURL}/user/all_by_filter?page=${currentPage}`,
          { headers: { 
            'Authorization': `Bearer ${token}`,
            "Cache-Control": "no-store" } }
        );
        setUsersData(response.data.data);
        setDataResponse(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
  }, [currentPage]);

  const deleteuser = async (ruserid, name) => {
    try {
      const token = localStorage.getItem('token');
      const URL = `${baseURL}/user/${ruserid}`;
      const response = await axios.delete(URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success(`User ${name} has been deleted.`);
        fetchData(); // Refresh the data after the delete
      } else {
        toast.error(`Failed to delete user ${name}`);
        console.error(`Failed to delete user ${name}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };

  const handleIsActive = async (ruserid, isactive) => {
    try {
      const token = localStorage.getItem('token');
      const URL = `${baseURL}/user/changeIsActive/${ruserid}`;
      const response = await axios.put(
        URL,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(`Active status updated for User ${ruserid}`);
        fetchData(); // Refresh the data after the update
      } else {
        toast.error(`Failed to update Active status for User ${ruserid}`);
        console.error(`Failed to update Active status for User ${ruserid}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };

  const fetchData = async () => {
    
    try {
      
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${baseURL}/user/alluser`,
        { headers: { 
          'Authorization': `Bearer ${token}`,
          "Cache-Control": "no-store" } }
      );
      setUsersData(response.data.rows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center m-4">
      <div className='m-7'>
        <p className='text-2xl'>You are not logged in. Please log in.</p>
        <button
          className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md m-3"
          type="submit"
          onClick={() => router.push('/')}
        >
          Go to Login
        </button>
      </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center m-4">
      {/* {!token ? (
        <div className='m-7'>
          <p className='text-2xl'>You are not logged in. Please log in.</p>
          <button className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md m-3" type="submit" onClick={() => router.push('/')}>
            Go to Login
          </button>
        </div>
      ) : (
        <> */}
      <Link
        href="/addUser"
        className="bg-emerald-600 text-white hover:text-black p-2 rounded-lg absolute top-4 right-40  transition-colors"
      >
        Register user
      </Link>

      <div className="max-w-screen-md m-4">
        <table className="w-full table-fixed border p-4">
          <thead>
            <tr className="border p-4">
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Type</th>
              <th>Is Active</th>
            </tr>
          </thead>
          <tbody className="text-cyan-900 text-center">
            {usersData.map((data) => (
              <tr className="border p-2" key={data.ruserid}>
                <td className="border p-2">{data.name}</td>
                <td className="border p-2">{data.email}</td>
                <td className="border p-2">{data.contact}</td>
                <td className="border p-2">{data.type}</td>
                <td className="border p-2">
                  {data.isactive ? 'Active' : 'Inactive'}
                </td>
                <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
                  <div className="hover:text-red-700" onClick={() => deleteuser(data.ruserid, data.name)}>
                    <MdDeleteOutline />
                  </div>
                  <div className="hover:text-sky-500">
                    <Link className="transition-colors p-2" href={`/editUser/${data.ruserid}`}>
                      <AiOutlineEdit />
                    </Link>
                  </div>
                  <button
                    onClick={() => handleIsActive(data.ruserid, data.isactive)}
                    className="bg-green-500 text-black p-2 rounded-lg hover:text-white transition-colors"
                  >
                    Active
                  </button>
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
      {/* </> */}
      {/* )} */}
    </div>
  );
};

export default User;
