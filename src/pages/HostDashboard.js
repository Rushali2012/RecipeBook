import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';

const HostDashboard = () => {
  const { recipes, deleteRecipe, loading } = useRecipes(); 
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [showModal, setShowModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  useEffect(() => {
    const filtered = recipes.filter(recipe => 
      recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    setFilteredRecipes(filtered);
  }, [searchQuery, recipes]);

  const handleDelete = (recipeId) => {
    setRecipeToDelete(recipeId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (recipeToDelete) {
      deleteRecipe(recipeToDelete);
      setShowModal(false);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setRecipeToDelete(null);
  };
  

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="flex justify-between items-center mb-8 mt-5">
        <div><Link to={'/login'}><button className="text-xl font-semibold text-gray-700">&lt;&lt; Back</button></Link></div>
        <h1 className="text-3xl font-bold">
        Welcome, {user?.email.split('@')[0].charAt(0).toUpperCase() + user?.email.split('@')[0].slice(1).toLowerCase() ?? 'Host'}
        </h1>
        <Link 
          to="/recipe/new" 
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Recipe
        </Link>
      </div>
      
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search recipes..."
        className="w-full px-4 py-2 border rounded mb-6"
      />

      {loading ? ( 
        <div className="text-center text-black-600 mt-[4rem]">
          Loading recipes...
        </div>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {filteredRecipes.map(recipe => (
            <div key={recipe.idMeal} className="relative">
              <RecipeCard 
                recipe={recipe} 
                source="host"
              />
              <button
                onClick={() => handleDelete(recipe.idMeal)} 
                className="absolute bottom-5 right-5 text-[red] px-4 py-2 rounded hover:text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-black-600 mt-[4rem]">
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Are you sure you want to delete this recipe?</h2>
            <div className="flex justify-end gap-4">
              <button onClick={cancelDelete} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostDashboard;