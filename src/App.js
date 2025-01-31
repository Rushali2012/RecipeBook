import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';  
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
  const [isDropdownDisabled, ] = useState(false);

  return (
    <Router>
      <RecipeProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar isDropdownDisabled={isDropdownDisabled} user={user} logout={logout} />
          <Routes>
            <Route path='/home' element={<HomePage/>}/>
            <Route path="/" element={<GuestRecipePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<HostDashboard />} />
            <Route path="/recipes" element={<GuestRecipePage />} />
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