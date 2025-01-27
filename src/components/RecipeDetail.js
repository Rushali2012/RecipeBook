import React from 'react';
import { useParams, useNavigate,useLocation  } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes } = useRecipes();
  const { userType } = useAuth();
  const location = useLocation();
  const recipe = recipes.find(r => r.idMeal === id);

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
    if (location.pathname.includes('host')) {
      navigate('/host/dashboard');
    } else {
      navigate('/guest/recipes');
    }
  };
  return (
    // <div class="flex cols-4">
    <div className="container mx-auto px-4 py-8 mt-12">
      <div className="flex gap-[32cm] ">
      <button onClick={handleBackClick} className="text-2xl font-semibold ">
      &lt;&lt; Back
        </button>
        {userType === 'host' && (
             <div className="mt-6 flex space-x-4">
              <button
                onClick={() => navigate(`/recipe/edit/${id}`)}
                className=" ml-5 mb-5 bg-blue-800 text-white h-9 w-[4cm] rounded hover:bg-blue-600"
              >
                Edit Recipe
              </button>
               </div> 
          )}
      </div>
      
      <div class="flex cols-2 justify-items-center">
      <div className="max-w-xl h-[13cm] mx-auto  bg-white shadow-lg rounded-lg overflow-hidden mt-[1cm]">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-[100] object-cover"
        />
        </div>
        <div className="w-[15cm] mt-[1cm] h-[13cm] ml-0 mx-auto bg-white shadow-xl rounded-md overflow-hidden">
        <h1 className="text-3xl font-bold mb-4 ml-2 mt-2">{recipe.strMeal}</h1>
        <p className="text-gray-600 mb-4 ml-2 mt-2">{recipe.strCategory}</p>
        {/* </div> */}
        {/* <div> */}
        {/* <div className="w-[10cm] max-h-[13cm] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-[1cm]"> */}
        <hr className='w-full h-0.5 bg-[#636060]'/>
        <h2 className="text-2xl font-semibold mb-2 ml-2 mt-2">Ingredients</h2>
          <ul
            className="max-h-[8cm] overflow-y-auto border border-gray-200 p-4 rounded ml-2 mt-2 mr-2"
            style={{ scrollbarWidth: 'thin' }}
          >
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          
        </div>
        </div> 
        {/* </div> */}
        <div className="w-[33.5cm] h-[15cm] ml-[3.2cm] mx-auto  bg-white shadow-xl rounded-lg overflow-hidden mt-[1cm]">
        <h2 className="text-2xl font-semibold mb-2 ml-2 mt-2 ">Steps</h2>
          <ol
            className="list-disc ml-5 h-[12cm] overflow-y-auto border border-gray-200 p-4 rounded ml-2 mt-2 mr-2"
            style={{ scrollbarWidth: 'thin' }}
          >
            {instructions.map((step, i) =>
              step.trim() ? <li key={i}>{step.trim()}</li> : null
            )}
          </ol>
          
            </div>
    
    </div>
   
  );
};

export default RecipeDetail;

