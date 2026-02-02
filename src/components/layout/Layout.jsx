import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, user, onLogout, showNavbar = true, showFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showNavbar && user && <Navbar user={user} onLogout={onLogout} />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
