// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Formik, Form, Field, ErrorMessage } from 'formik';

// const LoginPage = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const initialValues = {
//     email: '',
//     password: '',
//   };

//   const validate = (values) => {
//     const errors = {};
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
//     const userData = { email: values.email, id: Date.now() };
//     login(userData, 'host');
//     navigate('/host/dashboard');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Host Login</h2>
        
//         <Formik
//           initialValues={initialValues}
//           validate={validate}
//           onSubmit={onSubmit}
//         >
//           <Form>
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
//               Login
//             </button>
//           </Form>
//         </Formik>

//         <p className="text-center mt-4">
//           Don't have an account? 
//           <span
//             onClick={() => navigate('/register')}
//             className="text-blue-500 cursor-pointer ml-1"
//           >
//             Register
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Custom regex for email
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z.-]+\.[A-Z]{2,}$/i;

  // Yup validation schema with custom email pattern
  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(emailRegex, 'Invalid email address') // Custom regex match
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values) => {
    const userData = { email: values.email, id: Date.now() };
    login(userData, 'host');
    navigate('/host/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Host Login</h2>
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
  );
};

export default LoginPage;
