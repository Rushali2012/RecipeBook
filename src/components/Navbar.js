
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, userType, logout } = useAuth();
  const [isHost, setIsHost] = useState(false);  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  const handleToggle = () => {
    setIsHost(!isHost); 
    if (!isHost) {
      setIsDropdownOpen(true);  
    } else {
      setIsDropdownOpen(false); 
    }
  };

  return (
    <>
      <nav className="z-10 fixed top-0 w-full bg-[#72A0C1] p-4 text-black">
        <Link to="/">
          <img className="fixed top-0 ml-[3.3cm] mt-2 w-15 h-12 justify-center" src="https://imgs.search.brave.com/pwmbqKzHMYjAVar4tLdlrOS9eu81_au56XyVjd8W5lk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzU1LzczLzE5/LzM2MF9GXzEwNTU3/MzE5NDhfcWRrbzNX/NVJkVEs2NHhuRUU2/Mm9mWlk0UXU4OFZF/M0YuanBn" alt="Logo" />
        </Link>
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="ml-0 text-2xl font-bold">Recipe Book</Link>
          <div className="flex items-center space-x-5">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isHost}
                onChange={handleToggle}  
              />
              <div className="relative w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#002D62] dark:peer-checked:bg-[#002D62]"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Switch to Host user</span>
            </label>

            {isHost && !user && (
              <div className="relative">
                {/* <button
                  className="hover:text-gray-200"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}  // Toggle dropdown visibility
                >
                  Account
                </button> */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 mt-5">
                    <Link to="/login" className="block px-4 py-2 text-black hover:bg-gray-200">Login</Link>
                    <Link to="/register" className="block px-4 py-2 text-black hover:bg-gray-200">Register</Link>
                  </div>
                )}
              </div>
            )}

            {user && (
              <>
                <Link to={'/'}>
                  <button
                    onClick={logout}
                    className="bg-blue-800 text-white hover:bg-red-600 hover:text-black px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
