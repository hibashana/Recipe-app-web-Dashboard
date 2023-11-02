'use client'

import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import { baseURL } from '../utils/constants';
import NavBar from '../NavBar';

const user = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Use localStorage within a useEffect to ensure it runs on the client side
    const token = localStorage.getItem('token');
    
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseURL}/alluser`, { cache: 'no-store' });
        console.log(res);
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once, like componentDidMount

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-screen-md">
        <table className="w-full table-fixed border p-2">
          <thead>
            <tr className="border p-2">
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="border p-2">
            {userData.map((data) => (
              <tr className="border p-2" key={data.id}>
                <td className="border p-2">{data.name}</td>
                <td className="border p-2">{data.email}</td>
                <td className="border p-2">{data.contact}</td>
                <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
                  {/* Add your delete and edit icons here */}
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

export default user;
