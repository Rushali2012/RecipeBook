import React, { createContext, useState, useContext, useEffect } from 'react';
 import { Navigate, useNavigate } from 'react-router-dom';
 
 const AuthContext = createContext(null);
 
 export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [userType, setUserType] = useState(null);
   const navigate = useNavigate();
 
   useEffect(() => {
     const storedUser = localStorage.getItem('user');
     const storedUserType = localStorage.getItem('userType');
     if (storedUser && storedUserType) {
       setUser(JSON.parse(storedUser));
       setUserType(storedUserType);
     }
   }, []);
 
   const login = (userData, type) => {
     setUser(userData);
     setUserType(type);
     localStorage.setItem('user', JSON.stringify(userData));
     localStorage.setItem('userType', type);
   };
 
   const logout = () => {
     setUser(null);
     setUserType(null);
     localStorage.removeItem('user');
     localStorage.removeItem('userType');
     navigate('/'); 
   };
 
   return (
     <AuthContext.Provider value={{ user, userType, login, logout, isAuthenticated: !!user }}>
       {children}
     </AuthContext.Provider>
   );
 };
 
 export const useAuth = () => useContext(AuthContext);