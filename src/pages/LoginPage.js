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

//   // const onSubmit = (values) => {
//   //   const storedUser = JSON.parse(localStorage.getItem('user'));

//   //   if (
//   //     storedUser &&
//   //     storedUser.email === values.email &&
//   //     storedUser.password === values.password
//   //   ) {
//   //     const userData = { email: values.email, id: storedUser.id };
//   //     login(userData, 'host');
//   //     navigate('/host/dashboard');
//   //   } else {
//   //     setMessage({ text: 'Invalid email or password', type: 'error' });
//   //   }
//   // };
//   const onSubmit = (values) => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     console.log(storedUser);
//     if (
//       storedUser &&
//       storedUser.email === values.email &&
//       storedUser.password === values.password
//     ) {
//       const userData = { email: values.email, id: storedUser.id };
//       login(userData, 'host');
//       navigate('/host/dashboard');
//     } else {
//       setMessage({ text: 'Invalid email or password', type: 'error' });
//     }
//   };
  
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-9 rounded-xl shadow-md w-96">
//         <div><Link to={'/'}><button className="text-md text-gray-700">&lt; Back</button></Link></div>
//         <h2 className="text-2xl font-bold mb-6 text-center">Host Login</h2>

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
//           validationSchema={validationSchema}
//           onSubmit={onSubmit}
//         >
//           <Form>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2"> <FontAwesomeIcon icon={faEnvelope} /> Email</label>
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
//               <label className="block text-gray-700 mb-2"><FontAwesomeIcon icon={faLock} />Password</label>
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
//           Don't have an account?{' '}
//           <span onClick={() => navigate('/register')} className="text-blue-500 cursor-pointer ml-1">
//             Register
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// const LoginPage = () => {
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: ''
//   });

//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials({
//       ...credentials,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const storedUser = JSON.parse(localStorage.getItem('userCredentials'));

//     if (!storedUser) {
//       setMessage('No user registered. Please register first.');
//       return;
//     }

//     if (credentials.email === storedUser.email && credentials.password === storedUser.password) {
//       setMessage('Login successful');
//       localStorage.setItem('isAuthenticated', true);
//     } else {
//       setMessage('Invalid credentials. Please try again.');
//     }
//   };

//   return (
//     <div class="mt-20">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={credentials.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={credentials.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         {message && <div>{message}</div>}
//         <Link to={'/host/dashboard'}><button type="submit">Login</button></Link>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('userCredentials'));

    if (!storedUser) {
      setMessage('No user registered. Please register first.');
      return;
    }

    if (credentials.email === storedUser.email && credentials.password === storedUser.password) {
      setMessage('Login successful');
      localStorage.setItem('isAuthenticated', true);
      navigate('/host/dashboard');  // Redirect to the Host Dashboard
    } else {
      setMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="mt-20">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        {message && <div>{message}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
