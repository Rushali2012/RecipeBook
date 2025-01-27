import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  strMeal: Yup.string().required('Recipe Name is required'),
  strCategory: Yup.string().required('Category is required'),
  strMealThumb: Yup.string().url('Invalid image URL').required('Image URL is required'),
  ingredients: Yup.array().of(Yup.string().required('Ingredient is required')).min(1, 'At least one ingredient is required'),
  steps: Yup.array().of(Yup.string().required('Step is required')).min(1, 'At least one step is required')
});

const RecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, addRecipe, updateRecipe } = useRecipes();
  const { userType } = useAuth();

  const [formData, setFormData] = useState({
    idMeal: id || Date.now().toString(),
    strMeal: '',
    strCategory: '',
    strMealThumb: '',
    strInstructions: '',
    ingredients: [''],
    steps: ['']
  });


useEffect(() => {
  if (id) {
    const existingRecipe = recipes.find(r => r.idMeal === id);
    if (existingRecipe) {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = existingRecipe[`strIngredient${i}`];
        if (ingredient) {
          ingredients.push(ingredient.trim());
        }
      }

      setFormData({
        idMeal: existingRecipe.idMeal,
        strMeal: existingRecipe.strMeal,
        strCategory: existingRecipe.strCategory,
        strMealThumb: existingRecipe.strMealThumb,
        strInstructions: existingRecipe.strInstructions || '',
        ingredients: ingredients.length ? ingredients : [''],  
        steps: existingRecipe.strInstructions ? existingRecipe.strInstructions.split('\n').map(step => step.trim()) : ['']
      });
    }
  }
}, [id, recipes]);

  

  const handleSubmit = (values) => {
    values.strIngredient = values.ingredients.join('\n');
    values.strInstructions = values.steps.join('\n');

    if (id) {
      updateRecipe(values); 
    } else {
      addRecipe(values); 
    }
    navigate('/host/dashboard');
  };

  if (userType !== 'host') {
    return <div className="text-center mt-[4rem]">Access Denied</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      
      

<Formik
  enableReinitialize={true}
  initialValues={formData}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
  validateOnBlur={false}
  validateOnChange={true}
>
  {({ values, errors, touched, handleSubmit, setTouched }) => (
    <Form
      className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
      onSubmit={(e) => {
        e.preventDefault();
        setTouched({});
        handleSubmit();
      }}
      noValidate
    >
      <div className="mb-4">
        <label className="block mb-2">Recipe Name</label>
        <Field
          type="text"
          name="strMeal"
          placeholder="Name of the Recipe"
          className="w-full px-3 py-2 border rounded"
          required
        />
        {touched.strMeal && errors.strMeal && (
          <div className="text-red-500 text-sm">{errors.strMeal}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Category</label>
        <Field as="select" name="strCategory" className="w-full border-2 border-b-2">
          <option value="">Select a Category</option>
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
        {touched.strCategory && errors.strCategory && (
          <div className="text-red-500 text-sm">{errors.strCategory}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Image URL</label>
        <Field
          type="text"
          name="strMealThumb"
          placeholder="Image link..."
          className="w-full px-3 py-2 border rounded"
          required
        />
        {touched.strMealThumb && errors.strMealThumb && (
          <div className="text-red-500 text-sm">{errors.strMealThumb}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Ingredients</label>
        <FieldArray name="ingredients">
          {({ push, remove }) => (
            <div>
              {values.ingredients.map((ingredient, index) => (
                <div key={index} className="flex flex-col mb-2">
                  <Field
                    name={`ingredients[${index}]`}
                    placeholder="Ingredients..."
                    className="w-full px-3 py-2 border rounded"
                  />
                  {touched.ingredients && touched.ingredients[index] && errors.ingredients && errors.ingredients[index] && (
                    <div className="text-red-500 text-sm">{errors.ingredients[index]}</div>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 mt-1"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => push('')}
                className="mt-2 bg-blue-700 text-white py-1 px-3 rounded h-8 w-30"
              >
                Add Ingredient
              </button>
            </div>
          )}
        </FieldArray>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Steps</label>
        <FieldArray name="steps">
          {({ push, remove }) => (
            <div>
              {values.steps.map((step, index) => (
                <div key={index} className="flex flex-col mb-2">
                  <Field
                    name={`steps[${index}]`}
                    placeholder="Steps..."
                    className="w-full px-3 py-2 border rounded"
                  />
                  {touched.steps && touched.steps[index] && errors.steps && errors.steps[index] && (
                    <div className="text-red-500 text-sm">{errors.steps[index]}</div>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 mt-1"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => push('')}
                className="mt-2 bg-blue-700 text-white py-1 px-3 rounded h-8 w-30"
              >
                Add Step
              </button>
            </div>
          )}
        </FieldArray>
      </div>

      <div className="flex gap-x-2 justify-evenly">
        <button
          type="submit"
          className="w-[50%] bg-blue-500 text-white py-2 rounded hover:bg-blue-600 "
        >
          {id ? 'Update Recipe' : 'Add Recipe'}
        </button>
        <Link to={'/host/dashboard'}>
          <button type="button" className="w-[150px] bg-gray-500 text-white py-2 rounded hover:bg-gray-600">Cancel</button>
        </Link>
      </div>
    </Form>
  )}
</Formik>

    </div>
  );
};

export default RecipeForm;
