import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

const RecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, addRecipe, updateRecipe } = useRecipes();
  const { userType } = useAuth();

  const initialValues = {
    idMeal: id || Date.now().toString(),
    strMeal: '',
    strCategory: '',
    strMealThumb: '',
    strInstructions: '',
    strIngredient: ''
  };

  useEffect(() => {
    if (id) {
      const existingRecipe = recipes.find(r => r.idMeal === id);
      if (existingRecipe) {
        initialValues.strMeal = existingRecipe.strMeal;
        initialValues.strCategory = existingRecipe.strCategory;
        initialValues.strMealThumb = existingRecipe.strMealThumb;
        initialValues.strInstructions = existingRecipe.strInstructions;
        initialValues.strIngredient = existingRecipe.strIngredient;
      }
    }
  }, [id, recipes]);

  const handleSubmit = (values) => {
    if (id) {
      updateRecipe(values);
    } else {
      addRecipe(values);
    }
    navigate('/host/dashboard');
  };

  if (userType !== 'host') {
    return <div className="text-center mt-10">Access Denied</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {id ? 'Edit Recipe' : 'Add New Recipe'}
            </h2>
            <div className="mb-4">
              <label className="block mb-2">Recipe Name</label>
              <Field
                type="text"
                name="strMeal"
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Category</label>
              <Field as="select" name="strCategory" className="w-full border-2 border-b-2">
                <option value="Seafood">Seafood</option>
                <option value="Side">Side</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Beef">Beef</option>
                <option value="Pork">Pork</option>
                <option value="Pasta">Pasta</option>
                <option value="Dessert">Dessert</option>
                <option value="Miscellaneous">Miscellaneous</option>
                <option value="Lamb">Lamb</option>
                <option value="Chicken">Chicken</option>
              </Field>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Image URL</label>
              <Field
                type="text"
                name="strMealThumb"
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Ingredients</label>
              <Field
                as="textarea"
                name="strIngredient"
                className="w-full px-3 py-2 border rounded"
                rows="4"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Steps</label>
              <Field
                as="textarea"
                name="strInstructions"
                className="w-full px-3 py-2 border rounded"
                rows="4"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-[50%] bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {id ? 'Update Recipe' : 'Add Recipe'}
            </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to={'/host/dashboard'}>
              <button type="button" className="w-[35%] bg-gray-500 text-white py-2 rounded hover:bg-gray-600"> Cancel</button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RecipeForm;
