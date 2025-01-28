import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Recipe Book</h1>
        <p className="text-xl mb-8 text-gray-600">
          Discover and Create Delicious Recipes
        </p>
        <div className="space-x-4">
          <Link 
            to="/guest/recipes" 
            className="bg-[#557e9b] text-black px-6 py-3 rounded-lg hover:bg-[#203e53] hover:text-white transition"
          >
            Browse Recipes
          </Link>
          {/* <Link 
            to="/login" 
            className="bg-[#444C38] text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
          >
            Host Login
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

