import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RecipeCard = ({ recipe, onDelete }) => {
  const { userType } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    onDelete(); 
    setIsModalOpen(false); 
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Link to={`/recipe/${recipe.idMeal}`}>
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{recipe.strMeal}</h2>
          <p className="text-gray-600 mb-4">{recipe.strCategory}</p>
        </div>
      </Link>
      {userType === 'host' && (
        <>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-red-600 hover:text-red-800 mb-4 ml-5"
          >
            Delete
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this recipe?</h3>
                
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => setIsModalOpen(false)} 
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDelete} 
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeCard;
