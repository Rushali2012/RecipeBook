import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, userType, logout } = useAuth();

  return (
    <nav className="bg-[#72A0C1] p-4 text-black ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Recipe Book</Link>
        <div className="flex items-center space-x-5">
          {!user ? (
            <>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
              <Link to="/register" className="hover:text-gray-200">Register</Link>
            </>
          ) : (
            <>
              {/* {userType === 'host' && (
                <Link to="/recipe/new" className="hover:text-gray-200">Add Recipe</Link>
              )} */}
              <button 
                onClick={logout} 
                className="bg-blue-800 text-white hover:bg-red-600 hover:text-black px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;