import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    authe_token: localStorage.getItem('token'),
    user: {}
  },
  reducers: {
    loginUser: (state, action) => {
      console.log(state, action, 'state, action')
      state.isAuthenticated = true;
      state.authe_token = action.payload.data_auth.authe_token;
      state.user = action.payload.data_auth.user
      localStorage.setItem('token', action.payload.data_auth.authe_token);
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.authe_token = null;
      state.user = {};
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;