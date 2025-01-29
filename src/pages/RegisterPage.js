import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
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

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = existingUsers.some(user => user.email === values.email);

    if (emailExists) {
      setMessage({ text: 'Email already exists. Please use another email.', type: 'error' });
      return;
    }

    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    login(userData, 'host');
    setMessage({ text: 'Registration successful!', type: 'success' });
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  return (
    <div className=" max-sm:px-4 min-h-screen flex flex-col items-center justify-center">
      <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
        <div className="md:max-w-md w-full px-4 py-4">
          <div>
            <Link to={'/'}>
              <button className="text-md text-gray-700 ">&lt; Back</button>
            </Link>
          </div>
          <div className="mb-12">
            <h3 className="text-gray-800 text-3xl font-extrabold">Create an Account</h3>
          </div>

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
              <div className="mb-8">
                <label className="text-gray-800 text-md block mb-2">Username</label>
                <div className="relative flex items-center">
                  <Field
                    name="username"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                    placeholder="Enter username"
                  />
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute right-2 text-gray-500"
                  />
                </div>
                <ErrorMessage name="username">
                  {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
                </ErrorMessage>
              </div>

              <div className="mb-8">
                <label className="text-gray-800 text-md block mb-2">Email</label>
                <div className="relative flex items-center">
                  <Field
                    name="email"
                    type="email"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                    placeholder="Enter email"
                  />
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute right-2 text-gray-500"
                  />
                </div>
                <ErrorMessage name="email">
                  {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
                </ErrorMessage>
              </div>

              <div className="mb-8">
                <label className="text-gray-800 text-md block mb-2">Password</label>
                <div className="relative flex items-center">
                  <Field
                    name="password"
                    type="password"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                    placeholder="Enter password"
                  />
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute right-2 text-gray-500"
                  />
                </div>
                
                <ErrorMessage name="password">
                  {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
                </ErrorMessage>
                <ul class="mt-2 px-4 grid sm:grid-cols-2 gap-y-1 gap-x-6 w-max list-disc">
        <li class="text-xs text-orange-500">minimum 8 characters</li>
        <li class="text-xs text-orange-500">one uppercase characters</li>
        <li class="text-xs text-orange-500">one special characters</li>
        <li class="text-xs text-orange-500">one number</li>
      </ul>
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Register
                </button>
              </div>
            </Form>
          </Formik>

          <p className="text-center mt-4">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:underline cursor-pointer ml-1"
            >
              Login
            </span>
          </p>
        </div>

        <img
          src="https://readymadeui.com/login-image.webp"
          className="w-full aspect-[12/12] object-contain"
          alt="register-image"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
