import React from 'react';
import NavBar from '../NavBar';
import Header from '../header';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <NavBar />
        <main className="flex-grow p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
