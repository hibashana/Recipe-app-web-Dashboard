"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import NavBar from '../../NavBar';
// import Header from '../layout/header';

const Home = () => {

  const [storedName, setStoredName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('appName');
    if (storedName) {
      setStoredName(storedName);
    }
  }, []); 

  return (
    <div>
      {/* <Header /> */}
      {/* <nav className="border-gray-200 dark:bg-gray-800 dark.border-gray-700"> */}
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-7">
          <div className="w-full flex justify-end items-end">
            {/* Omitted select dropdown for simplicity */}
          </div>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
            <div className="text-emerald-600" style={{ fontWeight: 'bold', fontSize: '40px' }}>
              <div>
                {storedName && (
                  <p>
                    <strong>{storedName}</strong>
                  </p>
                )}
                {/* Rest of your Home component */}
              </div>
            </div>
          </div>
        </div>
      {/* </nav> */}
      {/* <NavBar/> */}
    </div>
  );
};

export default Home;
