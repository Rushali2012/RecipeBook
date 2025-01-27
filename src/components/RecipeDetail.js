// import React from 'react';
// import { useParams, useNavigate,useLocation  } from 'react-router-dom';
// import { useRecipes } from '../context/RecipeContext';
// import { useAuth } from '../context/AuthContext';

// const RecipeDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { recipes } = useRecipes();
//   const { userType } = useAuth();
//   const location = useLocation();
//   const recipe = recipes.find(r => r.idMeal === id);

//   if (!recipe) {
//     return <div>Loading...</div>;
//   }

//   const instructions = recipe.strInstructions ? recipe.strInstructions.split('\n') : [];
//   const ingredients = recipe.strIngredient ? recipe.strIngredient.split('\n') : [];
  
//   for (let i = 1; i <= 20; i++) {
//     const ingredient = recipe[`strIngredient${i}`];
//     if (ingredient) {
//       ingredients.push(ingredient);
//     }
//   }
//   const handleBackClick = () => {
//     if (location.pathname.includes('host')) {
//         navigate('/host/dashboard');
//     } else {
//       navigate('/guest/recipes');
//     }
//   };
//   return (
//     // <div class="flex cols-4">
//     <div className="container mx-auto px-4 py-8 mt-12 " >
//       <div className="flex gap-[32cm] ">
//       <button onClick={handleBackClick} className="text-2xl font-semibold ">
//       &lt;&lt; Back
//         </button>
//         {userType === 'host' && (
//              <div className="mt-6 flex space-x-4">
//               <button
//                 onClick={() => navigate(`/recipe/edit/${id}`)}
//                 className=" ml-5 mb-5 bg-blue-800 text-white h-9 w-[4cm] rounded hover:bg-blue-600"
//               >
//                 Edit Recipe
//               </button>
//                </div> 
//           )}
//       </div>
      
//       <div class="flex cols-2 justify-items-center">
//       <div className="max-w-xl h-[13cm] mx-auto  bg-white shadow-lg rounded-lg overflow-hidden mt-[1cm]">
//         <img
//           src={recipe.strMealThumb}
//           alt={recipe.strMeal}
//           className="w-full h-[100] object-cover"
//         />
//         </div>
//         <div className="w-[15cm] mt-[1cm] h-[13cm] ml-0 mx-auto bg-white shadow-xl rounded-md overflow-hidden">
//         <h1 className="text-3xl font-bold mb-4 ml-2 mt-2">{recipe.strMeal}</h1>
//         <p className="text-gray-600 mb-4 ml-2 mt-2">{recipe.strCategory}</p>
//         {/* </div> */}
//         {/* <div> */}
//         {/* <div className="w-[10cm] max-h-[13cm] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-[1cm]"> */}
//         <hr className='w-full h-0.5 bg-[#636060]'/>
//         <h2 className="text-2xl font-semibold mb-2 ml-2 mt-2">Ingredients</h2>
//           <ul
//             className="max-h-[8cm] overflow-y-auto border border-gray-200 p-4 rounded ml-2 mt-2 mr-2"
//             style={{ scrollbarWidth: 'thin' }}
//           >
//             {ingredients.map((ingredient, index) => (
//               <li key={index}>{ingredient}</li>
//             ))}
//           </ul>
          
//         </div>
//         </div> 
//         {/* </div> */}
//         <div className="w-[33.5cm] h-[15cm] ml-[3.2cm] mx-auto  bg-white shadow-xl rounded-lg overflow-hidden mt-[1cm]">
//         <h2 className="text-2xl font-semibold mb-2 ml-2 mt-2 ">Steps</h2>
//           <ol
//             className="list-disc ml-5 h-[12cm] overflow-y-auto border border-gray-200 p-4 rounded ml-2 mt-2 mr-2"
//             style={{ scrollbarWidth: 'thin' }}
//           >
//             {instructions.map((step, i) =>
//               step.trim() ? <li key={i}>{step.trim()}</li> : null
//             )}
//           </ol>
          
//             </div>
    
//     </div>
   
//   );
// };

// export default RecipeDetail;

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
    <div className="container mx-auto px-4 py-8 mt-12">
      <div className="flex items-center justify-between">
        <button
          onClick={handleBackClick}
          className="text-xl font-medium text-gray-500"
        >
          &lt;&lt; Back
        </button>
        {userType === 'host' && (
          <button
            onClick={() => navigate(`/recipe/edit/${id}`)}
            className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Edit Recipe
          </button>
        )}
      </div>

      {/* Recipe Title and Image */}
      <div className="mt-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="rounded-xl shadow-2xl w-[50] h-[400px] object-cover"
            />
          </div>
          <div >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{recipe.strMeal}</h1>
            <p className="text-xl text-gray-600 mb-4">{recipe.strCategory}</p>
          </div>
        </div>

        <hr className="border-t-2 border-gray-300 my-6" />
      </div>

      {/* Ingredients and Instructions Section */}
      <div className="flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-1/3">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ingredients</h2>
          <ul className="bg-transparent  rounded-lg p-4  overflow-y-auto">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700 mb-2">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Instructions</h2>
          <ol className="list-decimal pl-6 space-y-2  bg-transparent  rounded-lg p-4">
            {instructions.map((step, index) => (
              step.trim() ? <li key={index} className="text-gray-700">{step.trim()}</li> : null
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
