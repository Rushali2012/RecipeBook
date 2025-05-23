import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isHost, setIsHost] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHostState = localStorage.getItem('isHost');
    if (storedHostState === 'true') {
      setIsHost(true);
    }
  }, []);

  const handleToggle = () => {
    const newIsHost = !isHost;
    setIsHost(newIsHost);
    localStorage.setItem('isHost', newIsHost.toString());
    
    if (newIsHost) {
    } else {
      handleLogout();
    }
  };

  const handleLogout = () => {
    logout();
    setIsHost(false);
    setIsDropdownOpen(false);
    localStorage.removeItem('isHost');
    navigate('/home');
  };

  const handleLoginOrRegister = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="z-10 fixed top-0 w-full bg-[#72A0C1] p-8 text-black">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="ml-0 text-2xl font-bold">
          <FontAwesomeIcon icon={faUtensils} /> Recipe Book
        </Link>
        <div className="flex items-center space-x-5">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isHost}
              onChange={handleToggle}
            />
            <div className="relative w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#002D62] dark:peer-checked:bg-[#002D62]"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Switch to Host user
            </span>
          </label>
          {isHost && (
            <div className="relative user-dropdown">
              <FontAwesomeIcon
                icon={faUser}
                className="cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2">
                  {isHost && !user ? (
                    <>
                      <Link
                        to="/login"
                        onClick={handleLoginOrRegister}
                        className="block px-4 py-2 text-black hover:bg-gray-200"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={handleLoginOrRegister}
                        className="block px-4 py-2 text-black hover:bg-gray-200"
                      >
                        Register
                      </Link>
                    </>
                  ) : user ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;