import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';

const HostDashboard = () => {
  const { recipes, deleteRecipe } = useRecipes();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    const filtered = recipes.filter(recipe => 
      recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [searchQuery, recipes]);

  const handleDelete = (recipeId) => {
    deleteRecipe(recipeId);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-11">
      <div className="flex justify-between items-center mb-8 mt-5">
              <div><Link to={'/login'}><button class="text-xl font-semibold">Back</button></Link></div>
        
        <h1 className="text-3xl font-bold">
          Welcome, {user?.username || 'Host'}
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

      {filteredRecipes.length > 0 ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard 
              key={recipe.idMeal} 
              recipe={recipe} 
              onDelete={() => handleDelete(recipe.idMeal)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-black-600 mt-[4rem]">
          No recipes found matching your search.
        </div>
      )}
    </div>
  );
};

export default HostDashboard;