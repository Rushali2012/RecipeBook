
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
// import * as Yup from 'yup';

// const LoginPage = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [message, setMessage] = useState({ text: '', type: '' });

//   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z.-]+\.[A-Z]{2,}$/i;

//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .matches(emailRegex, 'Invalid email address')
//       .required('Email is required'),
//     password: Yup.string()
//       .min(8, 'Password must be at least 8 characters')
//       .required('Password is required'),
//   });

//   const initialValues = {
//     email: '',
//     password: '',
//   };

//   const onSubmit = (values) => {
//     const users = JSON.parse(localStorage.getItem('users')) || [];

//     const user = users.find(
//       (user) =>
//         user.email === values.email && user.password === values.password
//     );

//     if (user) {
//       const userData = { email: user.email, id: user.id };
//       login(userData, 'host');
//       navigate('/host/dashboard');
//     } else {
//       setMessage({ text: 'Invalid email or password', type: 'error' });
//     }
//   };

//   return (
//     <div className="min-h-screen flex gap-20 items-center justify-center bg-gray-100">
//             <img src="https://readymadeui.com/login-image.webp" class="w-[15cm] h-[12cm] rounded-xl" alt="Dining Experience" />
//             <div className=" grid md:grid-cols-2 items-center gap-4 max-md:gap-8 bg-white p-9 rounded-xl shadow-md w-96">
//         <div>
//           <Link to={'/'}>
//             <button className="text-md text-gray-700">&lt; Back</button>
//           </Link>
//         </div>
//         <h2 className="text-2xl font-bold mb-6 text-center">Host Login</h2>

//         {message.text && (
//           <div
//             className={`p-3 rounded mb-4 text-center ${
//               message.type === 'success'
//                 ? 'bg-green-100 text-green-700'
//                 : 'bg-red-100 text-red-700'
//             }`}
//           >
//             {message.text}
//           </div>
//         )}

//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={onSubmit}
//         >
//           <Form>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">
//                 <FontAwesomeIcon icon={faEnvelope} /> Email
//               </label>
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
//               <label className="block text-gray-700 mb-2">
//                 <FontAwesomeIcon icon={faLock} /> Password
//               </label>
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
//           New user?{' '}
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
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
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
      (user) =>
        user.email === values.email && user.password === values.password
    );

    if (user) {
      const userData = { email: user.email, id: user.id };
      login(userData, 'host');
      navigate('/host/dashboard');
    } else {
      setMessage({ text: 'Invalid email or password', type: 'error' });
    }
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
            <h3 className="text-gray-800 text-3xl font-extrabold">Login</h3>
            
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

              <div className="mt-8">
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
              </div>

              
             
              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign In
                </button>
                <p className=" text-center mt-5 text-gray-800">
              Don't have an account{' '}
              <span
                onClick={() => navigate('/register')}
                className="text-blue-600 hover:underline ml-1 cursor-pointer"
              >
                Register here
              </span>
            </p>
              </div>
            </Form>
          </Formik>
        </div>

        {/* <div className="w-full h-full flex items-center rounded-xl p-8"> */}
          <img
            src="https://readymadeui.com/login-image.webp"
            className="w-full  aspect-[12/12] object-contain"
            alt="login-image"
          />
        {/* </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
