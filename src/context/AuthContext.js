import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../authSlice.js';  

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userType = useSelector((state) => state.auth.userType);

  const loginHandler = (userData, type) => {
    console.log('Logging in user:', userData);
    dispatch(login({ user: userData, type }));
  };
  

  const logoutHandler = () => {
    dispatch(logout());
  };

  return {
    user,
    userType,
    login: loginHandler,
    logout: logoutHandler,
    isAuthenticated: !!user,
  };
};