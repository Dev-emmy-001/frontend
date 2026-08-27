import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, User } from 'lucide-react';
import autonexaLogo from '../assets/autonexa_logo.png';


const Navbar = () => {
  const location = useLocation();

  // Hide navigation bar on Login and Signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center">
            <img src={autonexaLogo} alt="AutoNexa Logo" style={{ height: '36px', width: 'auto' }} />
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-300">
            <Link to="/" className="hover:text-brand-red transition-colors">HOME</Link>
            <Link to="/inventory" className="hover:text-brand-red transition-colors">INVENTORY</Link>
            <Link to="/about" className="hover:text-brand-red transition-colors">ABOUT US</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="flex items-center space-x-2 text-sm font-semibold px-4 py-2 text-slate-300 hover:text-white">
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
            <Link to="/signup" className="bg-brand-red hover:bg-brand-red-dark text-white text-sm font-bold px-5 py-2.5 rounded-md transition-all uppercase">
              Register
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;