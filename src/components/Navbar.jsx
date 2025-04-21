import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between p-6 backdrop-blur-sm bg-blue-900/30 border-b border-amber-100/10 sticky top-0 z-50">
      <Link to="/" className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-200">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-amber-100 to-amber-300">
          TravelScape
        </span>
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8">
        <button className="relative group text-white/80 hover:text-white transition-all">
          Features
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-200 group-hover:w-full transition-all duration-300"></span>
        </button>
        <button className="relative group text-white/80 hover:text-white transition-all">
          Destinations
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-200 group-hover:w-full transition-all duration-300"></span>
        </button>
        <button className="relative group text-white/80 hover:text-white transition-all">
          Stories
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-200 group-hover:w-full transition-all duration-300"></span>
        </button>
        <button className="relative group text-white/80 hover:text-white transition-all">
          About Us
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-200 group-hover:w-full transition-all duration-300"></span>
        </button>
      </div>
      
      {/* Mobile Menu Button (visible only on mobile) */}
      <button className="md:hidden p-2 text-white rounded-md hover:bg-blue-800/50">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      
      {user ? (
        <div className="flex items-center space-x-4">
          <span className="text-white">Welcome, {user}</span>
          <Link to="/dashboard" className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-blue-600/30 transition-all">
            Dashboard
          </Link>
          <button 
            onClick={logout}
            className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-red-500/30 transition-all flex items-center space-x-2"
          >
            <span>Logout</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <Link 
            to="/login"
            className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-blue-600/30 transition-all flex items-center space-x-2 border border-amber-100/10"
          >
            <span>Sign In</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
          </Link>
          <Link 
            to="/register"
            className="px-6 py-2 rounded-full font-medium text-white border border-amber-200/30 hover:bg-white/10 transition-all"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;