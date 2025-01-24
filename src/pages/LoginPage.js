import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {Link} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: '', type: '' });

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z.-]+\.[A-Z]{2,}$/i;

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(emailRegex, 'Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    console.log('Stored user:', storedUser);  

    if (
      storedUser &&
      storedUser.email === values.email &&
      storedUser.password === values.password
    ) {
      const userData = { email: values.email, id: storedUser.id };
      login(userData, 'host');
      navigate('/host/dashboard');
    } else {
      setMessage({ text: 'Invalid email or password', type: 'error' });
    }
  };

  return (<>
    
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    
      <div className="bg-white p-9 rounded-xl shadow-md w-96">
      <div><Link to={'/'}><button class="text-md">Back</button></Link></div><h2 className="text-2xl font-bold mb-6 text-center">Host Login</h2>

        {message.text && (
          <div
            className={`p-3 rounded mb-4 text-center ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <ErrorMessage name="email">
                {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
              </ErrorMessage>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <ErrorMessage name="password">
                {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
              </ErrorMessage>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </Form>
        </Formik>

        <p className="text-center mt-4">
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')} className="text-blue-500 cursor-pointer ml-1">
            Register
          </span>
        </p>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
