import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes } = useRecipes();
  const { userType } = useAuth();

  const recipe = recipes.find(r => r.idMeal === id);

  if (!recipe) return <div className="text-center mt-10">Recipe Not Found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
          <p className="text-gray-600 mb-4">{recipe.strCategory}</p>
          
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul
            className="max-h-40 overflow-y-auto border border-gray-200 p-4 rounded"
            style={{ scrollbarWidth: 'thin' }}
          >
            {Array.from({ length: 20 }, (_, index) => {
              const ingredient = recipe[`strIngredient${index + 1}`];
              if (ingredient) {
                return <li key={index}>{ingredient}</li>;
              }
              return null;
            })}
          </ul>
          <br />
          
          <h2 className="text-2xl font-semibold mb-2">Steps</h2>
          <ol
            className="list-decimal ml-5 max-h-40 overflow-y-auto border border-gray-200 p-4 rounded"
            style={{ scrollbarWidth: 'thin' }}
          >
            {recipe.strInstructions?.split('\n').map((step, i) => 
              step.trim() && <li key={i}>{step.trim()}</li>
            )}
          </ol>

          {userType === 'host' && (
            <div className="mt-6 flex space-x-4">
              <button 
                onClick={() => navigate(`/recipe/edit/${id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit Recipe
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
