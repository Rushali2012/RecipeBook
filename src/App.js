// import React,{useState} from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { AuthProvider } from './context/AuthContext';
// import { RecipeProvider } from './context/RecipeContext';
// import Navbar from './components/Navbar';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import HostDashboard from './pages/HostDashboard';
// import GuestRecipePage from './pages/GuestRecipePage';
// import RecipeDetail from './components/RecipeDetail';
// import RecipeForm from './components/RecipeForm';
// import { useAuth } from './context/AuthContext'; 

// function App() {
//   const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
//   return (
//     <Router>
//       <Navbar isDropdownDisabled={isDropdownDisabled} />
//       <useAuth>
//         <RecipeProvider>
//           <div className="min-h-screen bg-gray-100">
//             <Navbar />
//             <Routes>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/register" element={<RegisterPage />} />
//               <Route path="/host/dashboard" element={<HostDashboard />} />
//               <Route path="/guest/recipes" element={<GuestRecipePage />} />
//               <Route path="/recipe/:id" element={<RecipeDetail />} />
//               <Route path="/recipe/new" element={<RecipeForm />} />
//               <Route path="/recipe/edit/:id" element={<RecipeForm />} />
//             </Routes>
//           </div>
//         </RecipeProvider>
//       </useAuth>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';  // Import the useAuth hook
import { RecipeProvider } from './context/RecipeContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HostDashboard from './pages/HostDashboard';
import GuestRecipePage from './pages/GuestRecipePage';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';

function App() {
  const { user, logout } = useAuth(); 
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);

  return (
    <Router>
      <RecipeProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar isDropdownDisabled={isDropdownDisabled} user={user} logout={logout} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/host/dashboard" element={<HostDashboard />} />
            <Route path="/guest/recipes" element={<GuestRecipePage />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/recipe/new" element={<RecipeForm />} />
            <Route path="/recipe/edit/:id" element={<RecipeForm />} />
          </Routes>
        </div>
      </RecipeProvider>
    </Router>
  );
}

export default App;
