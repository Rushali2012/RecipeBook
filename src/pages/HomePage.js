import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen relative">
      <img 
        className="w-full h-[59.8rem] object-cover " 
        src="https://t4.ftcdn.net/jpg/09/23/42/11/240_F_923421104_mYOB6gXTT34T12InuDi0wKNtVI3IpYyf.jpg" 
        alt="Recipe Book" 
      />
      
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-white" /> */}
      
      <div className="text-center bg-white p-8 rounded-xl shadow-2xl absolute inset-0 flex flex-col justify-center items-center bg-opacity-40">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Recipe Book</h1>
        <p className="text-xl mb-8 text-gray-700">
          Discover and Create Delicious Recipes
        </p>
        <div className="space-x-4">
          <Link 
            to="/recipes" 
            className="bg-[#2f4f66] text-white px-6 py-3 rounded-lg hover:bg-[#203e53] hover:text-white transition"
          >
            Browse Recipes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;