import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes } = useRecipes();
  const { userType } = useAuth();
  const location = useLocation();
  const recipe = recipes.find((r) => r.idMeal === id);
  const { source } = location.state || { source: 'default' };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const instructions = recipe.strInstructions ? recipe.strInstructions.split('\n') : [];
  const ingredients = recipe.strIngredient ? recipe.strIngredient.split('\n') : [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(ingredient);
    }
  }

  const handleBackClick = () => {
    if (source === 'host') {
      navigate('/host/dashboard');
    } else {
      navigate('/guest/recipes');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-12">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBackClick}
          className="text-xl font-medium text-gray-500 hover:text-gray-700"
        >
          &lt;&lt; Back
        </button>
        {userType === 'host' && (
          <button
            onClick={() => navigate(`/recipe/edit/${id}`)}
            className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Edit Recipe
          </button>
        )}
      </div>

      <div className="relative rounded-2xl overflow-hidden shadow-xl">
        <div className="relative h-[600px]">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />
          
          <div className="absolute top-1/4 left-8 text-white">
            <h1 className="text-5xl font-bold mb-4">{recipe.strMeal}</h1>
            <p className="text-xl">{recipe.strCategory}</p>
          </div>
        </div>

        <div className="relative bg-white/90 rounded-b-2xl">
          <div className="px-8 py-12">
            <div className="flex flex-col md:flex-row gap-16">
              <div className="w-full md:w-1/3">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Ingredients</h2>
                <ul className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <li 
                      key={index} 
                      className="text-gray-700 text-lg flex items-center"
                    >
                      <span className="w-2 h-2 bg-blue-800 rounded-full mr-3"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Instructions</h2>
                <ol className="list-decimal pl-6 space-y-4">
                  {instructions.map((step, index) => (
                    step.trim() ? (
                      <li 
                        key={index} 
                        className="text-gray-700 text-lg pl-4"
                      >
                        {step.trim()}
                      </li>
                    ) : null
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
