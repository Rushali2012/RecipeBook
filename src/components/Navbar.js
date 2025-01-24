import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, userType, logout } = useAuth();

  return (<>
    
    <nav className=" z-10 fixed top-0 w-full  bg-[#72A0C1] p-3 text-black ">
    <Link to="/"><img class="top-0 ml-28 mt-1 fixed w-15 h-12 justify-center" src="https://imgs.search.brave.com/pwmbqKzHMYjAVar4tLdlrOS9eu81_au56XyVjd8W5lk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzU1LzczLzE5/LzM2MF9GXzEwNTU3/MzE5NDhfcWRrbzNX/NVJkVEs2NHhuRUU2/Mm9mWlk0UXU4OFZF/M0YuanBn"></img></Link>
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
    </>
  );
};

export default Navbar;

