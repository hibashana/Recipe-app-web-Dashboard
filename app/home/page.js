'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '../NavBar'
// import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

// import { useParams } from 'react-router-dom';

const Home = () => {
  const [appList, setAppList] = useState([]);
  const [selectedApp, setSelectedApp] = useState('');

  const searchParams=useSearchParams();
  const appObjects=searchParams.get('appObject');
  const results=JSON.parse(appObjects);
  console.log(results);


  // const params=useParams();
  

  useEffect(() => {
    fetch('http://localhost:3002/api/v1/app/all')
      .then((response) => response.json())
      .then((data) => setAppList(data));

     
    // Use optional chaining to access the 'id' query parameter
    
  }, []);

  // const router = useRouter();
  // const {id} = router.query;
  // console.log(id);

    

  const handleAppChange = (e) => {
    setSelectedApp(e.target.value);
  };

  return (
    <div>
  <nav className="border-gray-200 bg-slate-300 dark:bg-gray-800 dark.border-gray-700">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-7">
      <div className="w-full flex justify-end items-end">
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-gray-300 hover.bg-gray-50"
          >
            <select
              value={selectedApp || results.name} // Set the default value to results.name
              onChange={handleAppChange}
            >
              <option value={results.name}>{results.name}</option> {/* Set the default option */}
              <option value="">Select an app</option>
              {appList.map((app) => (
                <option key={app.id} value={app.name}>
                  {app.name}
                </option>
              ))}
            </select>
          </button>
        </div>
      </div>
      {/* { */}
       {/* Display the selected app name in the nav  */}
      {/* // selectedApp && ( */}
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          
        <div style={{ fontWeight: 'bold', fontSize: '40px' }}>
    {selectedApp || results.name}
  </div>
        </div>
      {/* )} */}
    </div>
  </nav>
  <NavBar />
</div>
  );
};

export default Home;
