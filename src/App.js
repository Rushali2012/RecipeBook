import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
  return (
    <Router>
      <AuthProvider>
        <RecipeProvider>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
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
      </AuthProvider>
    </Router>
  );
}

export default App;