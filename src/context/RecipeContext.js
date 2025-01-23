import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const RecipeContext = createContext(null);

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async (query = '') => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      setRecipes(response.data.meals || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setLoading(false);
    }
  };

  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const updateRecipe = (updatedRecipe) => {
    setRecipes(recipes.map(r => r.idMeal === updatedRecipe.idMeal ? updatedRecipe : r));
  };

  const deleteRecipe = (recipeId) => {
    setRecipes(recipes.filter(r => r.idMeal !== recipeId));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <RecipeContext.Provider value={{ 
      recipes, 
      loading, 
      fetchRecipes, 
      addRecipe, 
      updateRecipe, 
      deleteRecipe 
    }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipeContext);