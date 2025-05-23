import React, { useState, useEffect } from 'react';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
// import { Link } from 'react-router-dom';

const GuestRecipePage = () => {
  const { recipes, loading } = useRecipes();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    const filtered = recipes.filter(recipe => 
      recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [searchQuery, recipes]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      {/* <div><Link to={'/'}><button className="text-xl font-semibold text-gray-700">&lt;&lt; Back</button></Link></div> */}

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search recipes..."
        className="w-full px-4 py-2 border rounded mb-6 mt-8"
      />
      {filteredRecipes.length > 0 ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} source="guest" />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          
        </div>
      )}
    </div>
  );
};

export default GuestRecipePage;