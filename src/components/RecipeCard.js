import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe, onDelete, source}) => {
  const navigate = useNavigate();
  const { userType } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    navigate(`/recipe/${recipe.idMeal}`, {
      state: { source },
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(); 
    }
    setIsModalOpen(false); 
  };

  if (!recipe) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transform hover:translate-y-[-10px] " onClick={handleClick}>
      <Link to={`/recipe/${recipe.idMeal || ''}`}>
        <img 
          src={recipe.strMealThumb || 'https://via.placeholder.com/150'} 
          alt={recipe.strMeal || 'Recipe Image'} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">
            {recipe.strMeal || 'Recipe Name'}
          </h2>
          <p className="text-gray-600 mb-4">
            {recipe.strCategory || 'Category Unavailable'}
          </p>
        </div>
      </Link>
      {userType === 'host' && (
        <>
          {/* <button
            onClick={() => setIsModalOpen(true)}
            className="text-red-600 hover:text-red-800 mb-4 ml-5"
          >
            Delete
          </button> */}

          {isModalOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              role="dialog"
              aria-labelledby="modal-title"
              aria-modal="true"
            >
              <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                <h3
                  id="modal-title"
                  className="text-lg font-semibold mb-4 text-gray-800"
                >
                  Are you sure you want to delete this recipe?
                </h3>

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
