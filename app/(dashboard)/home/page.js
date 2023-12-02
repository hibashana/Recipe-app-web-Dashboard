"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL, imageURL } from '../../utils/constants';
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    recipeCount: 0,
    categoryCount: 0,
    bannerCount: 0,
  });
  const [storedName, setStoredName] = useState('');

  const fetchCounts = async () => {
    try {
      setLoading(true);
      const appId = localStorage.getItem('appId');
      const URL = `${baseURL}/home/totalCount?appId=${appId}`;
      const response = await axios.get(URL);
      const { recipeCount, categoryCount, bannerCount } = response.data;
      setCounts({
        recipeCount,
        categoryCount,
        bannerCount,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching counts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedName = localStorage.getItem('appName');
    if (storedName) {
      setStoredName(storedName);
    }
    fetchCounts();
  }, []); 

  return (
    <div className="max-w-screen-xl mx-auto p-7">
      {loading ? (
     <div className="flex h-screen justify-center my-32">
      <ClipLoader color={'#3d9f49'} size={100} />
      </div>
    )
    :(
      <>
      <div className="text-center text-4xl font-bold text-emerald-600 mb-8">
          {storedName && (
            <p>
              <strong>{storedName}</strong>
            </p>
          )}
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
      
        <div className="relative bg-emerald-100 p-0 rounded-lg shadow-md h-24">
    <div className="relative items-center p-2 w-24 h-24">
      <Image src="/recipeicon.png" layout="fill" objectFit="cover" alt="Recipe Image" />
    </div>
    <div className="absolute  top-0 left-0 right-0 p-4 ml-auto w-1/2 h-24">
    {/* absolute  top-0 left-0 right-0 p-4 ml-auto w-1/2 h-30 bg-emerald-50 rounded-s-3xl */}
      <p className="text-lg text-center font-bold mb-2">Recipes</p>
      <p className="text-2xl text-center">{counts.recipeCount}</p>
    </div>
  </div>
        {/* <div className="ml-auto w-20 h-30 bg-emerald-100 rounded-s-3xl"> */}
  <div className="relative bg-emerald-100 p-0 rounded-lg shadow-md h-24">
    <div className="relative items-center p-2 w-24 h-24">
      <Image src="/1868882.png" layout="fill" objectFit="cover" alt="Recipe Image" />
    </div>
    <div className="absolute  top-0 left-0 right-0 p-4 ml-auto w-1/2 h-24">
          <p className="text-lg text-center font-bold mb-2">Categories</p>
          <p className="text-2xl text-center">{counts.categoryCount}</p>
    </div>
  </div>
        <div className="relative bg-emerald-100 p-2 rounded-lg shadow-md h-24">
    <div className="relative items-center p-2 w-20 h-20">
      <Image src="/soups.png" layout="fill" objectFit="cover" alt="Recipe Image" />
    </div>
    <div className="absolute  top-0 left-0 right-0 p-4 ml-auto w-1/2 h-24">
          <p className="text-lg text-center font-bold mb-2">Banners</p>
          <p className="text-2xl text-center">{counts.bannerCount}</p>
    </div>
  </div>
        
      </div>
      </>
      )}
    </div>
  );
};

export default Home;
