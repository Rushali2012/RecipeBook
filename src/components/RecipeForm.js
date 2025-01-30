import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood } from '@fortawesome/free-solid-svg-icons';
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
    navigate('/dashboard');
  };

  if (userType !== 'host') {
    return <div className="text-center mt-24">Access Denied</div>;
  }

  return (
    <div
      className="w-[50cm] h-[25cm] mx-auto px-4 py-8 bg-cover bg-no-repeat mt-20 bg-[url('https://imgs.search.brave.com/bk-icC1zeDLSDZqJ0QZTbEuDCGllvQQpGuwrGWI2bjM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by93/aGl0ZS1wbGF0ZS1t/YWNhcm9uaS1jYWJi/YWdlLXdoaXRlLXBs/YXRlLWhpZ2gtcXVh/bGl0eS1waG90b18x/MTQ1NzktMzU2OTYu/anBnP3NlbXQ9YWlz/X2h5YnJpZA')]"
      
    >
      
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
            className="max-h-[21cm] w-[15cm] overflow-auto hover:shadow-zinc-950 mx-auto scrollbar-thin p-8 bg-cover bg-opacity-50 bg-blue-200 rounded-lg shadow-md "
            onSubmit={(e) => {
              e.preventDefault();
              setTouched({});
              handleSubmit();
            }}
            noValidate
          >
            <div className="mb-4 ">
              <h3 className="max-w-lg mx-auto bg-[#3b6583] text-white p-2 rounded-lg shadow-md text-2xl  text-center mb-8 ">
                <FontAwesomeIcon icon={faBowlFood}/> {id ? 'Update Recipe' : 'Add Recipe'}
              </h3>
              <label className=" mb-2 text-black flex gap-1">Recipe Name <h6 class="text-red-600"> *</h6></label>
              <Field
                type="text"
                name="strMeal"
                placeholder="Name of the Recipe"
                className={`w-full px-3 hover:bg-blue-100 hover:placeholder-black py-2 border rounded ${touched.strMeal && errors.strMeal ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {touched.strMeal && errors.strMeal && (
                <div className="text-red-500 font-bold text-sm">{errors.strMeal}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="flex text-black gap-1 mb-2">Category <h6 class="text-red-600"> *</h6></label>
              <Field as="select" name="strCategory" className={`hover:bg-blue-100 hover:placeholder-black rounded  w-full border-2 border-b-2 ${touched.strMeal && errors.strMeal ? 'border-red-500' : 'border-gray-300'}`}>
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
                <div className="text-red-500 font-bold text-sm">{errors.strCategory}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="flex text-black gap-1 mb-2">Image URL<h6 class="text-red-600"> *</h6></label>
              <Field
                type="text"
                name="strMealThumb"
                placeholder="Image url..."
                className={`w-full px-3 py-2 border hover:bg-blue-100 hover:placeholder-black rounded ${touched.strMeal && errors.strMeal ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {touched.strMealThumb && errors.strMealThumb && (
                <div className="text-red-500 font-bold text-sm">{errors.strMealThumb}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="flex text-black gap-1 mb-2">Ingredients <h6 class="text-red-600"> *</h6></label>
              <FieldArray name="ingredients">
                {({ push, remove }) => (
                  <div>
                    {values.ingredients.map((ingredient, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex flex-cols-2 gap-2">
                          <Field
                            name={`ingredients[${index}]`}
                            placeholder="Ingredients..."
                            className={`w-full hover:bg-blue-100 hover:placeholder-black px-3 py-2 border rounded ${touched.strMeal && errors.strMeal ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="mt-1 bg-red-500 text-white py-1 px-3 rounded h-8 w-30"
                            >
                              -
                            </button>
                          )}
                        </div>
                        {touched.ingredients && touched.ingredients[index] && errors.ingredients && errors.ingredients[index] && (
                          <div className="text-red-500 font-bold text-sm mt-1">{errors.ingredients[index]}</div>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push('')}
                      className="mt-2 bg-blue-700 text-white py-1 px-3 rounded h-8 w-30"
                    >
                      +
                    </button>
                    {values.ingredients.length === 0 && touched.ingredients && (
                      <div className="text-red-500 font-bold text-sm mt-1">At least one ingredient is required.</div>
                    )}
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="mb-4">
              <label className="flex text-black gap-1 mb-2">Steps<h6 class="text-red-600"> *</h6></label>
              <FieldArray name="steps">
                {({ push, remove }) => (
                  <div>
                    {values.steps.map((step, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex flex-cols-2 gap-2">
                          <Field
                            name={`steps[${index}]`}
                            placeholder="Steps..."
                            className={`w-full hover:bg-blue-100 hover:placeholder-black px-3 py-2 border rounded ${touched.strMeal && errors.strMeal ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="mt-1 bg-red-500 text-white py-1 px-3 rounded h-8 w-30"
                            >
                              -
                            </button>
                          )}
                        </div>
                        {touched.steps && touched.steps[index] && errors.steps && errors.steps[index] && (
                          <div className="text-red-500 font-bold text-sm mt-1">{errors.steps[index]}</div>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push('')}
                      className="mt-2 bg-blue-700 text-white py-1 px-3 rounded h-8 w-30"
                    >
                      +
                    </button>
                    {values.steps.length === 0 && touched.steps && (
                      <div className="text-red-500 font-bold text-sm mt-1">At least one step is required.</div>
                    )}
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="flex gap-x-2 justify-evenly">
              <button
                type="submit"
                className="w-[50%] bg-blue-700 text-white py-2 rounded hover:bg-blue-800 "
              >
                {id ? 'Update Recipe' : 'Add Recipe'}
              </button>
              <Link to={'/dashboard'}>
                <button type="button" className="w-[150px] bg-gray-500 text-white py-2 rounded hover:bg-gray-600">Cancel</button>
              </Link>
            </div>
            {!id ? <p class="text-red-600 ml-5 mt-5"> *  Fields are required</p> : ""}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RecipeForm;

// https://imgs.search.brave.com/bk-icC1zeDLSDZqJ0QZTbEuDCGllvQQpGuwrGWI2bjM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by93/aGl0ZS1wbGF0ZS1t/YWNhcm9uaS1jYWJi/YWdlLXdoaXRlLXBs/YXRlLWhpZ2gtcXVh/bGl0eS1waG90b18x/MTQ1NzktMzU2OTYu/anBnP3NlbXQ9YWlz/X2h5YnJpZA