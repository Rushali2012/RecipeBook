import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userType: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.userType = action.payload.type;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('userType', action.payload.type);
    },
    logout: (state) => {
      state.user = null;
      state.userType = null;
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
