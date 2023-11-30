"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineEdit,AiFillDelete,AiTwotoneEdit} from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL, imageURL } from '../../utils/constants';
// import NavBar from '../NavBar';

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
    const confirmDelete = window.confirm(`Are you sure you want to delete the User "${name}"?`);
    if (confirmDelete) {
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
      {/* <Link
        href="/addUser"
        className="bg-emerald-600 text-white hover:text-black p-2 rounded-lg absolute top-4 right-40  transition-colors"
      >
        Register user
      </Link> */}
      <div className="rounded overflow-hidden m-4">
            <div className="fixed bottom-10 right-10">
              <Link href="/addUser">
                <button className="bg-emerald-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ">
                  <HiPlus className="text-2xl" />
                </button>
              </Link>
            </div>
          </div>

      <div className="max-w-screen-md m-4">
        <table className="w-full table-auto border ">
          <thead>
            <tr className="border p-6 bg-emerald-600 text-white">
              <th className="border p-6">Name</th>
              <th className="border p-6">Email</th>
              <th className="border p-6">Contact</th>
              <th className="border p-6">Type</th>
              <th className="border p-6">Action</th>
              <th className="border p-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-cyan-900 bg-white text-center">
            {usersData.map((data) => (
              <tr className="border p-2" key={data.ruserid}>
                <td className="border p-2">{data.name}</td>
                <td className="border p-2">{data.email}</td>
                <td className="border p-2">{data.contact}</td>
                <td className="border p-2">{data.type}</td>
                {/* <td className="border p-2">
                  {data.isactive ? 'Active' : 'Inactive'}
                </td> */}
                <td  className="flex items-center border p-2 justify-center gap-4">
                  <div className="rounded-full p-2 bg-emerald-100 hover:bg-red-700 hover:text-white transition-colors" onClick={() => deleteuser(data.ruserid, data.name)}>
                    <AiFillDelete/>
                  </div>
                  <div className="rounded-full p-2 bg-emerald-100 hover:bg-sky-400 hover:text-white transition-colors">
                    <Link className="" href={`/editUser/${data.ruserid}`}>
                      <AiTwotoneEdit/>
                    </Link>
                  </div>
                  </td>
                  <td>
                  <button
            onClick={() => handleIsActive(data.ruserid, data.isactive)}
            className={`p-2 w-20 rounded-lg hover:text-white transition-colors ${
            data.isactive ? 'bg-emerald-500 text-black' : 'bg-red-500 text-black'
                          }`}>
                   {data.isactive ? 'Active' : 'Inactive'}
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
      {/* <NavBar /> */}
      <ToastContainer autoClose={3000} />
      {/* </> */}
      {/* )} */}
      
    </div>
  );
};

export default User;
