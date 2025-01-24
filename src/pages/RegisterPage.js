// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Formik, Form, Field, ErrorMessage } from 'formik';

// const RegisterPage = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [message, setMessage] = useState({ text: '', type: '' });

//   const initialValues = {
//     username: '',
//     email: '',
//     password: '',
//   };

//   const validate = (values) => {
//     const errors = {};
//     if (!values.username) {
//       errors.username = 'Username is required';
//     } else if (values.username.length < 3) {
//       errors.username = 'Username must be at least 3 characters';
//     }

//     if (!values.email) {
//       errors.email = 'Email is required';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//       errors.email = 'Invalid email address';
//     }

//     if (!values.password) {
//       errors.password = 'Password is required';
//     } else if (values.password.length < 6) {
//       errors.password = 'Password must be at least 6 characters';
//     }

//     return errors;
//   };

//   const onSubmit = (values) => {
//     const userData = { username: values.username, email: values.email, id: Date.now(), password: values.password };
//     login(userData, 'host');
//     setMessage({ text: 'Registration successful!...', type: 'success' });
//     setTimeout(() => navigate('/host/dashboard'), 1500);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Host Registration</h2>
        
//         {message.text && (
//           <div
//             className={`p-3 rounded mb-4 text-center ${
//               message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//             }`}
//           >
//             {message.text}
//           </div>
//         )}

//         <Formik
//           initialValues={initialValues}
//           validate={validate}
//           onSubmit={onSubmit}
//         >
//           <Form>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Username</label>
//               <Field
//                 type="text"
//                 name="username"
//                 className="w-full px-3 py-2 border rounded-lg"
//               />
//               <ErrorMessage name="username">
//                 {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
//               </ErrorMessage>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Email</label>
//               <Field
//                 type="email"
//                 name="email"
//                 className="w-full px-3 py-2 border rounded-lg"
//               />
//               <ErrorMessage name="email">
//                 {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
//               </ErrorMessage>
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 mb-2">Password</label>
//               <Field
//                 type="password"
//                 name="password"
//                 className="w-full px-3 py-2 border rounded-lg"
//               />
//               <ErrorMessage name="password">
//                 {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
//               </ErrorMessage>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//             >
//               Register
//             </button>
//           </Form>
//         </Formik>

//         <p className="text-center mt-4">
//           Already have an account?{' '}
//           <span onClick={() => navigate('/login')} className="text-blue-500 cursor-pointer ml-1">
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: '', type: '' });
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z.-]+\.[A-Z]{2,}$/i;

  // Yup validation schema (matching the previous logic)
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
    .matches(emailRegex, 'Invalid email address') // Custom regex match

      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const onSubmit = (values) => {
    const userData = { username: values.username, email: values.email, id: Date.now(), password: values.password };
    login(userData, 'host');
    setMessage({ text: 'Registration successful!...', type: 'success' });
    setTimeout(() => navigate('/host/dashboard'), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Host Registration</h2>
        
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
              <label className="block text-gray-700 mb-2">Username</label>
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
              Register
            </button>
          </Form>
        </Formik>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="text-blue-500 cursor-pointer ml-1">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
