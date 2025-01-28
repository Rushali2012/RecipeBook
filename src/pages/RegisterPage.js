import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: '', type: '' });
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z.-]+\.[A-Z]{2,}$/i;

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
      .matches(emailRegex, 'Invalid email address')
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .matches(/^[A-Z]/, 'Password must start with an uppercase letter')  
      .matches(/(?=.*\d)/, 'Password must contain at least one number')   
      .matches(/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/, 'Password must contain at least one special character') 
      .min(8, 'Password must be 8 or greater than 8 characters long')              
      .required('Password is required'),
  });

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const onSubmit = (values) => {
    const userData = {
      username: values.username,
      email: values.email,
      id: Date.now(),  
      password: values.password,
    };

    localStorage.setItem('user', JSON.stringify(userData));

    login(userData, 'host');  
    setMessage({ text: 'Registration successful!', type: 'success' });
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <div>
          <Link to={'/'}>
            <button className="text-md text-gray-700">&lt; Back</button>
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Host Registration</h2>

        {message.text && (
          <div
            className={`p-3 rounded mb-4 text-center ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
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
              <label className="block text-gray-700 mb-2">
                <FontAwesomeIcon icon={faUser} /> Username
              </label>
              <Field
                type="text"
                name="username"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <ErrorMessage name="username">
                {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
              </ErrorMessage>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </label>
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
              <label className="block text-gray-700 mb-2">
                <FontAwesomeIcon icon={faLock} /> Password
              </label>
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
              Register
            </button>
          </Form>
        </Formik>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-500 cursor-pointer ml-1"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
