import React from 'react';
import NavBar from '../NavBar';
import Header from '../header';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-100 text-white">
      <NavBar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header/>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
