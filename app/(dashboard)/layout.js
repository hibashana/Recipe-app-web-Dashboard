
import React from 'react';
import NavBar from '../NavBar';
import Header from '../header';

const DashboardLayout = ({ children }) => {
  const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return (
    <div className="flex h-screen bg-gray-100">
       {/* {token && ( */}
      <div className="w-64  text-white">
      <NavBar />
      </div>
       {/* )} */}
      
      <div className="flex flex-col flex-1 overflow-hidden">
      {/* {token && */}
       <Header />
       {/* } */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto  p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
